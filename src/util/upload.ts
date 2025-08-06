import axios from 'axios';
import { z } from 'zod';

// 1. Zod schema to validate the file
const fileSchema = z
  .instanceof(File)
  .refine((file) => file.size <= 20 * 1024 * 1024, {
    message: 'File must be smaller than 20MB',
  })
  .refine(
    (file) =>
      ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'].includes(file.type),
    {
      message: 'Only JPG, PNG, WEBP images or PDF files are allowed',
    }
  );



export const uploadFile = async (file: File, options?: UploadOptions): Promise<string> => {
  // 2. Validate the file
  
  const result = fileSchema.safeParse(file);
  if (!result.success) {
    throw new Error(result.error.errors[0].message);
  }

  // 3. Setup form data
  const formData = new FormData();
  formData.append('file', file);

  try {
    // 4. Send POST request with progress monitoring
    console.log('Uploading file:', file.name);
    console.log('File size:', file.size);
    console.log('File type:', file.type);
    console.log('API URL:', process.env.NEXT_PUBLIC_API_BASE_URL);
    console.log('Google Client Email:', process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL);
    console.log('Google Private Key:', process.env.NEXT_PUBLIC_GOOGLE_PRIVATE_KEY);

    if(!process.env.NEXT_PUBLIC_API_BASE_URL) {
      throw new Error('API base URL is not set');
    }
   
    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/upload`, formData, {

      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (options?.onProgress && progressEvent.total) {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          options.onProgress(percent);
        }
      },
    });
    console.log(data.fileId)
    return data.fileId;
  } catch (error) {
    throw new Error('File upload failed');
  }
};
