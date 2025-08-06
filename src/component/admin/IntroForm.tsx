// Updated IntroForm.tsx
'use client'
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { ImageUpload } from '@/component/admin/ImageUpload'; // Import the new component
import { FileUpload } from '@/component/admin/FileUpload';

// Validation Schema
const introSchema = z.object({
  welcomeText: z.string().min(2, "Welcome text must be at least 2 characters"),
  fname: z.string().min(2, "First name must be at least 2 characters"),
  lname: z.string().min(2, "Last name must be at least 2 characters"),
  title: z.string().optional(),
  tagline: z.string().min(10, "Tagline must be at least 10 characters"),
  imgLink: z.string().default(''),
  resumeLink: z.string().default(''),
  motto:z.string().default("What’s steady isn't slow."),
  active: z.boolean().default(false)
});

type IntroFormValues = z.infer<typeof introSchema>;

interface IntroFormProps {
  initialData?: IntroFormValues | null;
  onSubmit: (data: IntroFormValues) => void;
  onCancel: () => void;
}

export default function IntroForm({ initialData, onSubmit, onCancel }: IntroFormProps) {
  const { register, handleSubmit, reset, setValue, watch, formState: { errors, isSubmitting } } = useForm<IntroFormValues>({
    // @ts-expect-error - Type mismatch between zod schema and form type
    resolver: zodResolver(introSchema),
    defaultValues: initialData || {
      welcomeText: '',
      fname: '',
      lname: '',
      title: '',
      tagline: '',
      imgLink: '',
      resumeLink: '',
      motto:'',
      active: false
    }
  });

  // Reset form when initialData changes
  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  return (
    // @ts-expect-error - Form submit handler type issue
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Welcome Text */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Welcome Text *</label>
          <input
            {...register('welcomeText')}
            className="w-full p-2 border rounded"
            placeholder="Welcome message"
          />
          {errors.welcomeText && (
            <p className="text-red-500 text-sm mt-1">{errors.welcomeText.message}</p>
          )}
        </div>

        {/* First Name */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">First Name *</label>
          <input
            {...register('fname')}
            className="w-full p-2 border rounded"
            placeholder="John"
          />
          {errors.fname && (
            <p className="text-red-500 text-sm mt-1">{errors.fname.message}</p>
          )}
        </div>

        {/* Last Name */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Last Name *</label>
          <input
            {...register('lname')}
            className="w-full p-2 border rounded"
            placeholder="Doe"
          />
          {errors.lname && (
            <p className="text-red-500 text-sm mt-1">{errors.lname.message}</p>
          )}
        </div>

        {/* Title */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Title</label>
          <input
            {...register('title')}
            className="w-full p-2 border rounded"
            placeholder="Software Engineer"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Tagline */}
        <div className="col-span-full space-y-2">
          <label className="block text-sm font-medium">Tagline *</label>
          <textarea
            {...register('tagline')}
            className="w-full p-2 border rounded"
            rows={3}
            placeholder="A passionate developer..."
          />
          {errors.tagline && (
            <p className="text-red-500 text-sm mt-1">{errors.tagline.message}</p>
          )}
        </div>

        {/* Motto */}
        <div className="col-span-full space-y-2">
          <label className="block text-sm font-medium">Motto *</label>
          <textarea
            {...register('motto')}
            className="w-full p-2 border rounded"
            rows={3}
            placeholder="Your motto...."
          />
          {errors.motto && (
            <p className="text-red-500 text-sm mt-1">{errors.motto.message}</p>
          )}
        </div>

        {/* Profile Image - Using ImageUpload component */}
        <div className="col-span-full space-y-2">
          <label className="block text-sm font-medium">Profile Image</label>
          <ImageUpload
            value={watch('imgLink') ? [watch('imgLink')] : []}
            onChange={(urls) => setValue('imgLink', urls[0] || '')}
            maxFiles={1}
            disabled={isSubmitting}
          />
          {errors.imgLink && (
            <p className="text-red-500 text-sm mt-1">{errors.imgLink.message}</p>
          )}
        </div>

        {/* Resume Upload - Fixed: removed duplicate div */}
        <div className="col-span-full space-y-2">
          <label className="block text-sm font-medium">Resume (PDF)</label>
          <FileUpload
            value={watch('resumeLink') ? [watch('resumeLink')] : []}
            onChange={(urls) => setValue('resumeLink', urls[0] || '')}
            maxFiles={1}
            accept="application/pdf"
            disabled={isSubmitting}
          />
          {errors.resumeLink && (
            <p className="text-red-500 text-sm mt-1">{errors.resumeLink.message}</p>
          )}
        </div>

        {/* Active Status */}
        <div className="space-y-2 flex items-center">
          <input
            type="checkbox"
            {...register('active')}
            className="mr-2 h-4 w-4"
            id="active-status"
          />
          <label htmlFor="active-status" className="text-sm font-medium">
            Active Profile
          </label>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-2 mt-6">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="default"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : (initialData ? 'Update' : 'Create')}
        </Button>
      </div>
    </form>
  );
}