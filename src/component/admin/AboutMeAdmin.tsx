// components/AboutMeAdmin.tsx
'use client'
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ImageUpload } from '@/component/admin/ImageUpload';
import { toast } from 'sonner';
import { AboutMe } from '@/types/about';
import { Trash2, Plus } from 'lucide-react';
import Modal from '@/component/Modal';
import axios from 'axios';
import { Switch } from '@/components/ui/switch';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import Image from 'next/image';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
const API_BASE = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`;

// Validation Schema
const aboutMeSchema = z.object({
  intro1: z.string().min(10, "Intro 1 must be at least 10 characters"),
  intro2: z.string().optional(),
  lottieURL: z.string().optional(),
  skills: z.array(z.string().min(1, "Skill name is required")).min(1, "At least one skill is required"),
  skillsImgLink: z.array(z.string()).optional(),
  active: z.boolean()
});

type AboutMeFormValues = z.infer<typeof aboutMeSchema>;

export default function AboutMeAdmin() {
  // State for data fetching and modal management
  const [aboutEntries, setAboutEntries] = useState<AboutMe[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<AboutMe | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [processing, setProcessing] = useState(false);
  
  // Data fetching functions
  const fetchEntries = async () => {
    try {
      const { data } = await axios.get(`${API_BASE}/aboutMes`);
      setAboutEntries(data.response);
    } catch (error) {
      console.log(error);
      setAboutEntries([]);
      toast.error('Failed to fetch entries');
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleDelete = async (id: string) => {
    setProcessing(true);
    try {
      await axios.delete(`${API_BASE}/aboutMe/${id}`);
      toast.success('Entry deleted successfully');
      fetchEntries();
    } catch (error) {
      console.error("Delete error:", error);
      fetchEntries();
      toast.error('Failed to delete entry');
    } finally {
      setProcessing(false);
    }
  };

  const handleToggleActive = async (id: string) => {
    setProcessing(true);
    try {
      const updatedEntries = aboutEntries.map(entry => 
        entry._id === id ? { ...entry, active: !entry.active } : entry
      );
      setAboutEntries(updatedEntries);

      await axios.patch(`${API_BASE}/aboutMe/${id}/status`, {
        active: !aboutEntries.find(entry => entry._id === id)?.active
      });
      
      toast.success('Status updated');
    } catch (error) {
      console.error("Status update error:", error);
      setAboutEntries(aboutEntries); // Revert to previous state
      toast.error('Failed to update status');
      fetchEntries();
    } finally {
      setProcessing(false);
    }
  };

  // Form component
  const   AboutMeForm = ({ initialData }: { initialData?: AboutMe | null }) => {

    const { register, handleSubmit, reset, setValue, watch, formState: { errors, isSubmitting } } = useForm<AboutMeFormValues>({
      resolver: zodResolver(aboutMeSchema),
      defaultValues: {
        intro1: initialData?.intro1 || '',
        intro2: initialData?.intro2 || '',
        lottieURL: initialData?.lottieURL || '',
        skills: initialData?.skills && initialData.skills.length > 0 ? initialData.skills : [''],
        skillsImgLink: initialData?.skillsImgLink || [],
        active: initialData?.active || false
      }
    });

    const watchedSkills = watch("skills") || [''];
    const watchedSkillImages = watch("skillsImgLink") || [];

    const addSkill = () => {
      const currentSkills = watch("skills") || [];
      setValue("skills", [...currentSkills, '']);
    };

    const removeSkill = (index: number) => {
      const currentSkills = watch("skills") || [];
      if (currentSkills.length > 1) {
        setValue("skills", currentSkills.filter((_, i) => i !== index));
      }
    };

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

    const handleFormSubmit = async (data: AboutMeFormValues) => {
      setProcessing(true);
      try {
        // Clean up empty skills and corresponding images
        const cleanedSkills = data.skills.filter(skill => skill.trim() !== '');
        const cleanedImages = data.skillsImgLink?.slice(0, cleanedSkills.length) || [];
        
        const formData = {
          ...data,
          skills: cleanedSkills,
          skillsImgLink: cleanedImages
        };

        if (isEditing && selectedEntry) {
          console.log(formData)
          await axios.put(`${API_BASE}/aboutMe/${selectedEntry._id}`, formData);
        } else {
          await axios.post(`${API_BASE}/addAbout`, formData);
        }
        toast.success(`Entry ${isEditing ? 'updated' : 'created'}`);
        setShowModal(false);
        fetchEntries();
      } catch (error) {
        console.error("Form submission error:", error);
        if (axios.isAxiosError(error)) {
          toast.error(`Failed to ${isEditing ? 'update' : 'create'} entry: ${error.response?.data?.message || error.message}`);
        } else {
          toast.error(`Failed to ${isEditing ? 'update' : 'create'} entry`);
        }
      } finally {
        setProcessing(false);
      }
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
              disabled={isSubmitting}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Skill
            </Button>
          </div>

          <div className="space-y-4">
            {watchedSkills.map((skill, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-4 bg-gray-50">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-gray-700">Skill {index + 1}</h4>
                  {watchedSkills.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeSkill(index)}
                      disabled={isSubmitting}
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
                    disabled={isSubmitting}
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
            onClick={() => setShowModal(false)}
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
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage About Me</h1>
        <Button
          onClick={() => {
            setSelectedEntry(null);
            setIsEditing(false);
            setShowModal(true);
          }}
          disabled={processing}
        >
          Add New Entry
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {aboutEntries.map((entry) => (
          <Card key={entry._id} className="relative">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>About Me Entry</CardTitle>
                <Switch
                  checked={entry.active}
                  onCheckedChange={() => handleToggleActive(entry._id)}
                  disabled={processing}
                />
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="font-medium">Intro 1:</p>
                <p className="text-muted-foreground">{entry.intro1}</p>
              </div>
              
              {entry.intro2 && (
                <div className="space-y-2">
                  <p className="font-medium">Intro 2:</p>
                  <p className="text-muted-foreground">{entry.intro2}</p>
                </div>
              )}

              {entry.lottieURL && (
                <div className="space-y-2">
                  <p className="font-medium">Lottie Animation:</p>
                  <a 
                    href={entry.lottieURL} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700 text-sm break-all"
                  >
                    {entry.lottieURL}
                  </a>
                </div>
              )}

              <div className="space-y-2">
                <p className="font-medium">Skills:</p>
                <div className="grid grid-cols-2 gap-4">
                  {entry.skills.map((skill, index) => (
                    <div key={index} className="flex items-center gap-2">
                      {entry.skillsImgLink[index] && (
                        <Image
                          src={entry.skillsImgLink[index]}
                          alt={skill}
                          width={40}
                          height={40}
                          className="rounded"
                        />
                      )}
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedEntry(entry);
                  setIsEditing(true);
                  setShowModal(true);
                }}
                disabled={processing}
              >
                Edit
              </Button>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" disabled={processing}>
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the entry.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDelete(entry._id)}
                      disabled={processing}
                    >
                      {processing ? 'Deleting...' : 'Continue'}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <h2 className="text-xl font-bold mb-4">
          {isEditing ? 'Edit Entry' : 'Create New Entry'}
        </h2>
        <AboutMeForm initialData={selectedEntry} />
      </Modal>
    </div>
  );
}