// components/FileUpload.tsx
'use client'

import { useState, useEffect, useCallback } from 'react';
import { FileIcon, X } from 'lucide-react';
import { uploadFile } from '@/util/upload';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface FileUploadProps {
  onChange: (urls: string[]) => void;
  value: string[];
  maxFiles?: number;
  accept?: string;
  label?: string;
  disabled?: boolean;
}

export function FileUpload({
  onChange,
  value = [],
  maxFiles = 1,
  accept = '*/*',
  label,
  disabled
}: FileUploadProps) {
  const [previews, setPreviews] = useState<{
    url: string;
    file: File;
    type: string;
    name: string;
  }[]>([]);
  const [progress, setProgress] = useState<{ [key: string]: number }>({});
  const [uploading, setUploading] = useState(false);

  // Initialize previews when value changes
  useEffect(() => {
    // Clear existing previews when value changes
    setPreviews(prevPreviews => {
      prevPreviews.forEach(preview => URL.revokeObjectURL(preview.url));
      return [];
    });
  }, [value]);

  // Cleanup preview URLs
  useEffect(() => {
    return () => {
      previews.forEach(preview => URL.revokeObjectURL(preview.url));
    };
  }, [previews]);

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled || uploading) return;
      
      const files = Array.from(e.target.files || []);
      if (!files.length) return;

      // Check file limit
      if (value.length + files.length > maxFiles) {
        toast.error(`Maximum ${maxFiles} file(s) allowed`);
        return;
      }

      // Generate previews
      const newPreviews = files.map(file => ({
        file,
        url: file.type.startsWith('image/') 
          ? URL.createObjectURL(file) 
          : '',
        type: file.type,
        name: file.name
      }));

      setPreviews(newPreviews);
      setUploading(true);
      
      try {
        const newUrls: string[] = [];
        
        for (const preview of newPreviews) {
          try {
            const fileId = await uploadFile(preview.file, {
              onProgress: (p: number) => {
                setProgress(prev => ({
                  ...prev,
                  [preview.name]: p
                }));
              }
            });
            
            const url = `https://drive.google.com/uc?id=${fileId}`;
            newUrls.push(url);
          } catch (error) {
            console.error('Upload failed:', error);
            toast.error(`Failed to upload ${preview.name}`);
          } finally {
            setProgress(prev => {
              const newProgress = { ...prev };
              delete newProgress[preview.name];
              return newProgress;
            });
          }
        }
        
        onChange([...value, ...newUrls]);
      } finally {
        setUploading(false);
        setPreviews([]);
      }
    },
    [disabled, uploading, value, maxFiles, onChange]
  );

  const removeFile = useCallback((index: number) => {
    const newUrls = [...value];
    newUrls.splice(index, 1);
    onChange(newUrls);
  }, [value, onChange]);

  const totalFiles = value.length + previews.length;
  const isFull = totalFiles >= maxFiles;

  return (
    <div className="space-y-3">
      {label && <label className="block text-sm font-medium">{label}</label>}
      
      <div className="flex flex-wrap gap-3">
        {/* Existing files */}
        {value.map((url, index) => {
          const isImage = url.match(/\.(jpeg|jpg|gif|png|webp)$/i);
          
          return (
            <div key={url} className="relative group">
              {isImage ? (
                <div className="relative w-24 h-24 border rounded-md overflow-hidden">
                  <Image
                    src={url}
                    alt={`Preview ${index}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center w-24 h-24 border rounded-md bg-gray-50">
                  <FileIcon className="w-8 h-8 text-gray-500" />
                  <span className="text-xs mt-1 text-center truncate w-20">
                    {url.split('/').pop()?.slice(0, 20)}
                  </span>
                </div>
              )}
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeFile(index)}
                disabled={disabled || uploading}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          );
        })}

        {/* Uploading previews */}
        {previews.map((preview, index) => {
          const isImage = preview.type.startsWith('image/');
          const currentProgress = progress[preview.name] || 0;
          
          return (
            <div key={preview.name + index} className="relative w-24 h-24 border rounded-md overflow-hidden">
              {isImage ? (
                <Image
                  src={preview.url}
                  alt={`Uploading ${preview.name}`}
                  fill
                  className="object-cover opacity-70"
                />
              ) : (
                <div className="flex flex-col items-center justify-center w-full h-full bg-gray-50">
                  <FileIcon className="w-8 h-8 text-gray-500" />
                  <span className="text-xs mt-1 text-center truncate w-20">
                    {preview.name.slice(0, 20)}
                  </span>
                </div>
              )}
              
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white p-1">
                <span className="text-xs mb-1">
                  {currentProgress}%
                </span>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-blue-500 h-1.5 rounded-full" 
                    style={{ width: `${currentProgress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Add button */}
        {!isFull && (
          <label className="flex flex-col items-center justify-center w-24 h-24 border-2 border-dashed rounded-md cursor-pointer hover:border-primary transition-colors">
            <input
              type="file"
              accept={accept}
              multiple={maxFiles > 1}
              onChange={handleFileChange}
              className="hidden"
              disabled={disabled || uploading}
            />
            <div className="text-2xl">+</div>
            <div className="text-xs mt-1 text-center px-1">Upload File</div>
          </label>
        )}
      </div>

      {uploading && <p className="text-sm text-muted-foreground">Uploading files...</p>}
      <p className="text-sm text-muted-foreground">
        {totalFiles} of {maxFiles} files uploaded
      </p>
    </div>
  );
}