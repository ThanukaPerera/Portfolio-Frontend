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

// Achievement type based on your schema
interface Achievement {
  _id: string;
  achievementtitle: string;
  description: string;
  date: string;
  certification?: string;
  imgLink?: string[];
  active: boolean;
}

// Validation Schema
const achievementSchema = z.object({
  achievementtitle: z.string().min(3, "Achievement title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  date: z.string().min(1, "Date is required"),
  certification: z.string().optional(),
  imgLink: z.array(z.string()).optional(),
  active: z.boolean()
});

type AchievementFormValues = z.infer<typeof achievementSchema>;

export default function AchievementsAdmin() {
  // State for data fetching and modal management
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [processing, setProcessing] = useState(false);
  
  // Data fetching functions
  const fetchAchievements = async () => {
    try {
      const { data } = await axios.get('http://localhost:8000/api/achievements');
      setAchievements(data.response);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch achievements');
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  const handleDelete = async (id: string) => {
    setProcessing(true);
    try {
      await axios.delete(`http://localhost:8000/api/achievement/${id}`);
      toast.success('Achievement deleted successfully');
      fetchAchievements();
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || 'Failed to delete achievement');
      } else {
        toast.error('Failed to delete achievement');
      }
    } finally {
      setProcessing(false);
    }
  };

  const handleToggleActive = async (id: string) => {
    setProcessing(true);
    try {
      const updatedAchievements = achievements.map(achievement => 
        achievement._id === id ? { ...achievement, active: !achievement.active } : achievement
      );
      setAchievements(updatedAchievements);

      await axios.patch(`http://localhost:8000/api/achievement/${id}/status`, {
        active: !achievements.find(achievement => achievement._id === id)?.active
      });
      
      toast.success('Status updated');
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || 'Failed to update status');
      } else {
        toast.error('Failed to update status');
      }
      fetchAchievements();
    } finally {
      setProcessing(false);
    }
  };

  // Form component
  const AchievementForm = ({ initialData }: { initialData?: Achievement | null }) => {
    const { register, handleSubmit, reset, setValue, watch, formState: { errors, isSubmitting } } = useForm<AchievementFormValues>({
      resolver: zodResolver(achievementSchema),
      defaultValues: {
        achievementtitle: initialData?.achievementtitle || '',
        description: initialData?.description || '',
        date: initialData?.date ? initialData.date.split('T')[0] : '',
        certification: initialData?.certification || '',
        imgLink: initialData?.imgLink || [],
        active: initialData?.active ?? true
      }
    });

    const watchedImages = watch("imgLink") || [];

    // Reset form when initialData changes
    useEffect(() => {
      if (initialData) {
        reset({
          achievementtitle: initialData.achievementtitle,
          description: initialData.description,
          date: initialData.date.split('T')[0], // Format date for input
          certification: initialData.certification || '',
          imgLink: initialData.imgLink || [],
          active: initialData.active
        });
      }
    }, [initialData, reset]);

    const handleImageChange = (urls: string[]) => {
      setValue('imgLink', urls);
    };

    const handleFormSubmit = async (data: AchievementFormValues) => {
      setProcessing(true);
      try {
        const formData = {
          ...data,
          date: new Date(data.date).toISOString(),
          imgLink: data.imgLink || []
        };

        if (isEditing && selectedAchievement) {
          await axios.put(`http://localhost:8000/api/achievement/${selectedAchievement._id}`, formData);
        } else {
          await axios.post('http://localhost:8000/api/addAchievement', formData);
        }
        toast.success(`Achievement ${isEditing ? 'updated' : 'created'}`);
        setShowModal(false);
        fetchAchievements();
      } catch (error) {
        console.error(error);
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.message || `Failed to ${isEditing ? 'update' : 'create'} achievement`);
        } else {
          toast.error(`Failed to ${isEditing ? 'update' : 'create'} achievement`);
        }
      } finally {
        setProcessing(false);
      }
    };

    return (
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Achievement Title */}
        <div className="space-y-2">
          <Label htmlFor="achievementtitle">Achievement Title *</Label>
          <Input
            id="achievementtitle"
            {...register('achievementtitle')}
            placeholder="Enter achievement title..."
            className="w-full"
          />
          {errors.achievementtitle && (
            <p className="text-red-500 text-sm mt-1">{errors.achievementtitle.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description">Description *</Label>
          <textarea
            id="description"
            {...register('description')}
            className="w-full p-2 border rounded min-h-[100px] resize-y"
            placeholder="Describe your achievement..."
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>

        {/* Date */}
        <div className="space-y-2">
          <Label htmlFor="date">Achievement Date *</Label>
          <Input
            id="date"
            type="date"
            {...register('date')}
            className="w-full"
          />
          {errors.date && (
            <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
          )}
        </div>

        {/* Certification */}
        <div className="space-y-2">
          <Label htmlFor="certification">Certification/Recognition (Optional)</Label>
          <Input
            id="certification"
            {...register('certification')}
            placeholder="e.g., Certificate ID, Institution name..."
            className="w-full"
          />
          {errors.certification && (
            <p className="text-red-500 text-sm mt-1">{errors.certification.message}</p>
          )}
        </div>

        {/* Images */}
        <div className="space-y-2">
          <Label>Achievement Images</Label>
          <ImageUpload
            value={watchedImages}
            onChange={handleImageChange}
            maxFiles={5}
            disabled={isSubmitting}
          />
          <p className="text-sm text-gray-500">
            Upload images related to your achievement (certificates, photos, etc.)
          </p>
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
            Display Achievement
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Achievements</h1>
        <Button
          onClick={() => {
            setSelectedAchievement(null);
            setIsEditing(false);
            setShowModal(true);
          }}
          disabled={processing}
        >
          Add New Achievement
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((achievement) => (
          <Card key={achievement._id} className="relative">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="line-clamp-2">{achievement.achievementtitle}</CardTitle>
                <Switch
                  checked={achievement.active}
                  onCheckedChange={() => handleToggleActive(achievement._id)}
                  disabled={processing}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                {formatDate(achievement.date)}
              </p>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-muted-foreground text-sm line-clamp-3">
                  {achievement.description}
                </p>
              </div>
              
              {achievement.certification && (
                <div className="space-y-2">
                  <p className="font-medium text-sm">Certification:</p>
                  <p className="text-muted-foreground text-sm">{achievement.certification}</p>
                </div>
              )}

              {achievement.imgLink && achievement.imgLink.length > 0 && (
                <div className="space-y-2">
                  <p className="font-medium text-sm">Images ({achievement.imgLink.length}):</p>
                  <div className="grid grid-cols-3 gap-2">
                    {achievement.imgLink.slice(0, 3).map((img, index) => (
                      <div key={index} className="relative w-full h-16">
                        <Image
                          src={img}
                          alt={`${achievement.achievementtitle} ${index + 1}`}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                    ))}
                    {achievement.imgLink.length > 3 && (
                      <div className="w-full h-16 bg-gray-200 rounded flex items-center justify-center">
                        <span className="text-xs text-gray-500">
                          +{achievement.imgLink.length - 3} more
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>

            <CardFooter className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedAchievement(achievement);
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
                      This action cannot be undone. This will permanently delete the achievement &ldquo;{achievement.achievementtitle}&rdquo;.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDelete(achievement._id)}
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

      {achievements.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No achievements found. Create your first achievement!</p>
        </div>
      )}

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <h2 className="text-xl font-bold mb-4">
          {isEditing ? 'Edit Achievement' : 'Create New Achievement'}
        </h2>
        <AchievementForm initialData={selectedAchievement} />
      </Modal>
    </div>
  );
}