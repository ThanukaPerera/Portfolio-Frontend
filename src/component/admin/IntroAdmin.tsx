'use client'
import { useEffect, useState } from 'react';
import { Intro } from '@/types/intro';
import { toast } from 'sonner';
import Modal from '@/component/Modal';
import IntroForm from '@/component/admin/IntroForm';
import axios from 'axios';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
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

export default function IntrosAdmin() {
  const [intros, setIntros] = useState<Intro[]>([]);
  const [selectedIntro, setSelectedIntro] = useState<Intro | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [processing, setProcessing] = useState(false);



  const fetchIntros = async () => {
    try {
      const { data } = await axios.get('http://localhost:8000/api/admin/intros');
      setIntros(data.response);
    } catch {
      toast.error('Failed to fetch intros');
    }
  };

  useEffect(() => {
    fetchIntros();
  }, []);

  const handleDelete = async (id: string) => {
    setProcessing(true);
    try {
      await axios.delete(`http://localhost:8000/api/intro/${id}`);
      toast.success('Intro deleted successfully');
      fetchIntros();
    } catch {
      toast.error('Failed to delete intro');
    } finally {
      setProcessing(false);
    }
  };

  const handleToggleActive = async (id: string) => {
    const targetIntro = intros.find(intro => intro._id === id);
    if (!targetIntro) return;

    const originalActive = targetIntro.active;
    const newActiveState = !originalActive;

    // Optimistic UI update
    setIntros(intros =>
      intros.map(intro =>
        intro._id === id ? { ...intro, active: newActiveState } : intro
      )
    );

    setProcessing(true);
    try {
      await axios.patch(`http://localhost:8000/api/intro/${id}/status`, {
        active: newActiveState,
      });
      toast.success('Intro status updated');
    } catch (error) {
      console.error("Error updating intro status:", error); // Add this for debugging
      // Rollback on error
      setIntros(intros =>
        intros.map(intro =>
          intro._id === id ? { ...intro, active: originalActive } : intro
        )
      );
      toast.error('Failed to update intro status');
    } finally {
      setProcessing(false);
    }
  };

  const handleFormSubmit = async (introData: Partial<Intro>) => {
    setProcessing(true);
    try {
      const cleanedData = Object.fromEntries(
        Object.entries(introData).filter(([, v]) => v !== undefined)
      );

      if (isEditing && selectedIntro) {
        await axios.put(`http://localhost:8000/api/intro/${selectedIntro._id}`, cleanedData);
      } else {
        await axios.post('http://localhost:8000/api/addIntro', cleanedData);
      }

      toast.success(`Intro ${isEditing ? 'updated' : 'created'} successfully`);
      setShowModal(false);
      fetchIntros();
    } catch (error) {
      console.error('Operation error:', error);
      toast.error(`Failed to ${isEditing ? 'update' : 'create'} intro`);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Intros</h1>
        <Button
          onClick={() => {
            setSelectedIntro(null);
            setIsEditing(false);
            setShowModal(true);
          }}
          disabled={processing}
        >
          Add New Intro
        </Button>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {intros.map((intro) => (
          <Card key={intro._id} className="relative">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{intro.fname} {intro.lname}</CardTitle>
                  <CardDescription>{intro.title}</CardDescription>
                </div>
                <Switch
                  checked={intro.active}
                  onCheckedChange={() => handleToggleActive(intro._id)}
                  className="ml-2"
                  disabled={processing}
                />
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* {intro.imgLink && (
                <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100">
                  <Image
                    src={intro.imgLink}
                    alt="Profile"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                  />
                </div>
              )} */}

              {intro.imgLink && (
                <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100">
                  <Image
                    src={intro.imgLink}
                    alt="Profile"
                    fill
                    className="object-cover"
                  />
                </div>
              )}


              <div className="space-y-2">
                <p className="text-sm font-medium">Welcome Message</p>
                <p className="text-sm text-muted-foreground">{intro.welcomeText}</p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Tagline</p>
                <p className="text-sm text-muted-foreground">{intro.tagline}</p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Motto</p>
                <p className="text-sm text-muted-foreground">{intro.motto}</p>
              </div>

              {/* {intro.resumeLink && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Resume</p>
                  <Link
                    href={intro.resumeLink}
                    target="_blank"
                    className="text-sm text-primary hover:underline"
                  >
                    View Resume
                  </Link>
                </div>
              )} */}
              {intro.resumeLink && (
                <Link
                  href={intro.resumeLink}
                  target="_blank"
                  className="text-sm text-primary hover:underline"
                >
                  Download Resume
                </Link>
              )}
            </CardContent>

            <CardFooter className="flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedIntro(intro);
                  setIsEditing(true);
                  setShowModal(true);
                }}
                disabled={processing}
              >
                Edit
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    size="sm"
                    disabled={processing}
                  >
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the intro.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDelete(intro._id)}
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
          {isEditing ? 'Edit Intro' : 'Create New Intro'}
        </h2>
        <IntroForm
          initialData={selectedIntro ? {
            ...selectedIntro,
            imgLink: selectedIntro.imgLink || '',
            resumeLink: selectedIntro.resumeLink || '',
            motto: selectedIntro.motto || "What's steady isn't slow."
          } : null}
          onSubmit={handleFormSubmit}
          onCancel={() => setShowModal(false)}
        />
      </Modal>
    </div>
  );
}