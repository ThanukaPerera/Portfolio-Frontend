'use client'
import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ImageUpload } from '@/component/admin/ImageUpload';
import { Trash2, Plus } from 'lucide-react';
import { AboutMe } from '@/types/about';

// Validation Schema
const aboutMeSchema = z.object({
  intro1: z.string().min(10, "Intro 1 must be at least 10 characters"),
  intro2: z.string().optional(),
  lottieURL: z.string().url("Invalid Lottie URL").optional().or(z.literal("")),
  skills: z.array(z.string().min(1, "Skill name is required")).min(1, "At least one skill is required"),
  skillsImgLink: z.array(z.string()).optional(),
  active: z.boolean().default(false)
});

type AboutMeFormValues = z.infer<typeof aboutMeSchema>;

interface AboutMeFormProps {
  initialData?: AboutMe | null;
  onSubmit: (data: AboutMeFormValues) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export default function AboutMeForm({ 
  initialData, 
  onSubmit, 
  onCancel, 
  isSubmitting = false 
}: AboutMeFormProps) {
  const [uploading, setUploading] = useState(false);

  const { 
    register, 
    handleSubmit, 
    reset, 
    setValue, 
    watch, 
    control, 
    formState: { errors } 
  } = useForm<AboutMeFormValues>({
    resolver: zodResolver(aboutMeSchema),
    defaultValues: initialData || {
      intro1: '',
      intro2: '',
      lottieURL: '',
      skills: [''],
      skillsImgLink: [],
      active: false
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills"
  });

  // Watch skills to manage skill images
  const watchedSkills = watch("skills");
  const watchedSkillImages = watch("skillsImgLink") || [];

  // Reset form when initialData changes
  useEffect(() => {
    if (initialData) {
      reset({
        intro1: initialData.intro1,
        intro2: initialData.intro2 || '',
        lottieURL: initialData.lottieURL || '',
        skills: initialData.skills.length > 0 ? initialData.skills : [''],
        skillsImgLink: initialData.skillsImgLink || [],
        active: initialData.active
      });
    }
  }, [initialData, reset]);

  const handleSkillImageChange = (skillIndex: number, urls: string[]) => {
    const currentImages = [...watchedSkillImages];
    // Ensure the array is long enough
    while (currentImages.length <= skillIndex) {
      currentImages.push('');
    }
    currentImages[skillIndex] = urls[0] || '';
    setValue('skillsImgLink', currentImages);
  };

  const addSkill = () => {
    append('');
  };

  const removeSkill = (index: number) => {
    if (fields.length > 1) {
      remove(index);
      // Also remove corresponding image
      const currentImages = [...watchedSkillImages];
      currentImages.splice(index, 1);
      setValue('skillsImgLink', currentImages);
    }
  };

  const handleFormSubmit = async (data: AboutMeFormValues) => {
    // Clean up empty skills and corresponding images
    const cleanedSkills = data.skills.filter(skill => skill.trim() !== '');
    const cleanedImages = data.skillsImgLink?.slice(0, cleanedSkills.length) || [];
    
    const formData = {
      ...data,
      skills: cleanedSkills,
      skillsImgLink: cleanedImages,
      lottieURL: data.lottieURL || undefined // Convert empty string to undefined
    };

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Intro 1 */}
      <div className="space-y-2">
        <Label htmlFor="intro1">Intro 1 *</Label>
        <textarea
          id="intro1"
          {...register('intro1')}
          className="w-full p-2 border rounded min-h-[100px] resize-y"
          placeholder="Write your first introduction paragraph..."
        />
        {errors.intro1 && (
          <p className="text-red-500 text-sm mt-1">{errors.intro1.message}</p>
        )}
      </div>

      {/* Intro 2 */}
      <div className="space-y-2">
        <Label htmlFor="intro2">Intro 2 (Optional)</Label>
        <textarea
          id="intro2"
          {...register('intro2')}
          className="w-full p-2 border rounded min-h-[100px] resize-y"
          placeholder="Write your second introduction paragraph (optional)..."
        />
        {errors.intro2 && (
          <p className="text-red-500 text-sm mt-1">{errors.intro2.message}</p>
        )}
      </div>

      {/* Lottie URL */}
      <div className="space-y-2">
        <Label htmlFor="lottieURL">Lottie Animation URL (Optional)</Label>
        <Input
          id="lottieURL"
          {...register('lottieURL')}
          placeholder="https://assets5.lottiefiles.com/packages/lf20_fcfjwiyb.json"
          className="w-full"
        />
        {errors.lottieURL && (
          <p className="text-red-500 text-sm mt-1">{errors.lottieURL.message}</p>
        )}
        <p className="text-sm text-gray-500">
          Enter a valid Lottie animation URL (e.g., from LottieFiles)
        </p>
      </div>

      {/* Skills Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label className="text-base font-medium">Skills *</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addSkill}
            disabled={uploading || isSubmitting}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Skill
          </Button>
        </div>

        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="border rounded-lg p-4 space-y-4 bg-gray-50">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-gray-700">Skill {index + 1}</h4>
                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => removeSkill(index)}
                    disabled={uploading || isSubmitting}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>

              {/* Skill Name */}
              <div className="space-y-2">
                <Label htmlFor={`skill-${index}`}>Skill Name</Label>
                <Input
                  id={`skill-${index}`}
                  {...register(`skills.${index}` as const)}
                  placeholder="e.g., React, Node.js, Python..."
                  className="w-full"
                />
                {errors.skills?.[index] && (
                  <p className="text-red-500 text-sm mt-1">{errors.skills[index]?.message}</p>
                )}
              </div>

              {/* Skill Image */}
              <div className="space-y-2">
                <Label>Skill Icon/Image</Label>
                <ImageUpload
                  value={watchedSkillImages[index] ? [watchedSkillImages[index]] : []}
                  onChange={(urls) => handleSkillImageChange(index, urls)}
                  maxFiles={1}
                  disabled={uploading || isSubmitting}
                />
                <p className="text-sm text-gray-500">
                  Upload an icon or image representing this skill
                </p>
              </div>
            </div>
          ))}
        </div>

        {errors.skills && (
          <p className="text-red-500 text-sm mt-1">{errors.skills.message}</p>
        )}
      </div>

      {/* Active Status */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          {...register('active')}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          id="active-status"
        />
        <Label htmlFor="active-status" className="text-sm font-medium text-gray-700">
          Active Profile
        </Label>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-2 mt-6 pt-4 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting || uploading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="default"
          disabled={isSubmitting || uploading}
        >
          {isSubmitting || uploading ? 'Saving...' : (initialData ? 'Update' : 'Create')}
        </Button>
      </div>
    </form>
  );
}