// components/ImageUpload.tsx
'use client'

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { uploadFile } from '@/util/upload';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

interface ImageUploadProps {
  onChange: (urls: string[]) => void;
  value: string[];
  maxFiles?: number;
  label?: string;
  disabled?: boolean;
}

export function ImageUpload({
  onChange,
  value = [],
  maxFiles = 1,
  label,
  disabled
}: ImageUploadProps) {
  const [previews, setPreviews] = useState<{ url: string; file: File }[]>([]);
  const [uploading, setUploading] = useState(false);

  // Initialize previews when value changes
  useEffect(() => {
    setPreviews(value.map(url => ({ url, file: new File([], '') })));
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
        url: URL.createObjectURL(file)
      }));

      setPreviews(prev => [...prev, ...newPreviews]);
      setUploading(true);

      try {
        // Upload files in parallel
        const uploadPromises = newPreviews.map(async (preview) => {
          try {
            const fileId = await uploadFile(preview.file);
            return `https://drive.google.com/uc?id=${fileId}`;
          } catch (error) {
            console.error('Upload failed:', error);
            toast.error(`Failed to upload ${preview.file.name}`);
            return null;
          }
        });

        const uploadedUrls = (await Promise.all(uploadPromises)).filter(Boolean) as string[];
        onChange([...value, ...uploadedUrls]);
      } finally {
        setUploading(false);
      }
    },
    [disabled, uploading, value, maxFiles, onChange]
  );

  const removeImage = useCallback((index: number) => {
    const newUrls = [...value];
    newUrls.splice(index, 1);
    onChange(newUrls);

    setPreviews(prev => {
      const newPreviews = [...prev];
      URL.revokeObjectURL(newPreviews[index].url);
      newPreviews.splice(index, 1);
      return newPreviews;
    });
  }, [value, onChange]);

  return (
    <div className="space-y-3">
      {label && <label className="block text-sm font-medium">{label}</label>}
      
      <div className="flex flex-wrap gap-3">
        {/* Existing images */}
        {value.map((url, index) => (
          <div key={url} className="relative group">
            <div className="relative w-24 h-24 border rounded-md overflow-hidden">
              <Image
                src={url}
                alt={`Preview ${index}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => removeImage(index)}
              disabled={disabled || uploading}
            >
              ✕
            </Button>
          </div>
        ))}

        {/* Uploading previews */}
        {previews.slice(value.length).map((preview, index) => (
          <div key={preview.url} className="relative w-24 h-24 border rounded-md overflow-hidden">
            <Image
              src={preview.url}
              alt={`Uploading ${index}`}
              fill
              className="object-cover opacity-70"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {uploading && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              </div>
            )}
          </div>
        ))}

        {/* Add button */}
        {value.length < maxFiles && (
          <label className="flex flex-col items-center justify-center w-24 h-24 border-2 border-dashed rounded-md cursor-pointer hover:border-primary transition-colors">
            <input
              type="file"
              accept="image/*"
              multiple={maxFiles > 1}
              onChange={handleFileChange}
              className="hidden"
              disabled={disabled || uploading}
            />
            <div className="text-2xl">+</div>
            <div className="text-xs mt-1 text-center px-1">Upload Image</div>
          </label>
        )}
      </div>

      {uploading && <p className="text-sm text-muted-foreground">Uploading images...</p>}
      <p className="text-sm text-muted-foreground">
        {value.length} of {maxFiles} images uploaded
      </p>
    </div>
  );
}