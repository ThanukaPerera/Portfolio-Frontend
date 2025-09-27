'use client'
import { useCallback, useEffect, useState } from 'react';
import { Project } from '@/types/project';
import { toast } from 'sonner';
import Modal from '@/component/Modal';
import ProjectForm from '@/component/admin/ProjectForm';
import axios from 'axios';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
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
  const API_BASE = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`;

export default function ProjectsAdmin() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [processing, setProcessing] = useState(false);
  

    const fetchProjects = useCallback(async () => {
        try {
            const { data } = await axios.get(`${API_BASE}/admin/projects`);
            console.log(data.response);
            setProjects(data.response);
        } catch {
            toast.error('Failed to fetch projects');
        }
    },[]);

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    const handleDelete = async (id: string) => {
        setProcessing(true);
        try {
            await axios.delete(`${API_BASE}/project/${id}`);
            toast.success('Project deleted successfully');
            fetchProjects();
        } catch {
            toast.error('Failed to delete project');
        } finally {
            setProcessing(false);
        }
    };

    const handleToggleActive = async (id: string) => {
        const targetProject = projects.find(project => project._id === id);
        if (!targetProject) return;

        const originalActive = targetProject.active;
        const newActiveState = !originalActive;

        // Optimistic UI update
        setProjects(projects =>
            projects.map(project =>
                project._id === id ? { ...project, active: newActiveState } : project
            )
        );

        setProcessing(true);
        try {
            await axios.patch(`${API_BASE}/project/${id}/status`, { active: newActiveState });
            toast.success('Project status updated');
        } catch (error) {
            console.error("Error updating project status:", error);
            // Rollback on error
            setProjects(projects =>
                projects.map(project =>
                    project._id === id ? { ...project, active: originalActive } : project
                )
            );
            toast.error('Failed to update project status');
        } finally {
            setProcessing(false);
        }
    };

    const handleFormSubmit = async (projectData: Partial<Project>) => {
        setProcessing(true);
        try {
            // Clean up the data before submission - remove MongoDB fields and filter empty values
            const cleanedData = {
                projectTitle: projectData.projectTitle,
                projectDescription: projectData.projectDescription,
                myContribution: projectData.myContribution || '',
                technologiesUsed: projectData.technologiesUsed || [],
                projectImgLink: projectData.projectImgLink?.filter(link => link.trim() !== '') || [],
                // Handle both camelCase and lowercase variants for backward compatibility
                projectVideoLink: projectData.projectVideoLink || {},
                gitHubRepoLink: projectData.gitHubRepoLink || {},
                otherLink: projectData.otherLink || {},
                type: projectData.type,
                status: projectData.status,
                startDate: projectData.startDate,
                endDate: projectData.endDate,
                active: projectData.active ?? true
            };

            if (isEditing && selectedProject) {
                await axios.put(`${API_BASE}/project/${selectedProject._id}`, cleanedData);
            } else {
                await axios.post(`${API_BASE}/addProject`, cleanedData);
            }

            toast.success(`Project ${isEditing ? 'updated' : 'created'}`);
            setShowModal(false);
            fetchProjects();
        } catch (error) {
            console.error('Error:', error);
            toast.error(`Failed to ${isEditing ? 'update' : 'create'} project`);
        } finally {
            setProcessing(false);
        }
    };

    function isValidUrl(string: string) {
        try {
            new URL(string);
            return true;
        } catch {
            return false;
        }
    }

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Manage Projects</h1>
                <Button
                    onClick={() => {
                        setSelectedProject(null);
                        setIsEditing(false);
                        setShowModal(true);
                    }}
                    disabled={processing}
                >
                    Add New Project
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((project) => (
                    <Card key={project._id} className="relative">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <CardTitle>{project.projectTitle}</CardTitle>
                                <Switch
                                    checked={project.active}
                                    onCheckedChange={() => handleToggleActive(project._id)}
                                    disabled={processing}
                                />
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            {/* Project Metadata */}
                            <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-muted-foreground">Type: {project.type}</p>
                                    <p className="text-sm font-medium text-muted-foreground">Status: 
                                        <span className={`ml-1 ${
                                            project.status === 'Completed' ? 'text-green-600' :
                                            project.status === 'In Progress' ? 'text-yellow-600' : 'text-red-600'
                                        }`}>
                                            {project.status}
                                        </span>
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <p className="text-sm font-medium">Description</p>
                                <p className="text-sm text-muted-foreground">{project.projectDescription}</p>
                            </div>

                            {/* Technologies Used */}
                            {project.technologiesUsed && project.technologiesUsed.length > 0 && (
                                <div className="space-y-2">
                                    <p className="text-sm font-medium">Technologies</p>
                                    <div className="flex flex-wrap gap-1">
                                        {project.technologiesUsed.map((tech, index) => (
                                            <span
                                                key={index}
                                                className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-md"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* My Contribution */}
                            {project.myContribution && (
                                <div className="space-y-2">
                                    <p className="text-sm font-medium">My Contribution</p>
                                    <p className="text-sm text-muted-foreground">{project.myContribution}</p>
                                </div>
                            )}

                            {/* Images */}
                            {project.projectImgLink.length > 0 && (
                                <div className="space-y-2">
                                    <p className="text-sm font-medium">Images</p>
                                    <div className="grid grid-cols-2 gap-2">
                                        {project.projectImgLink.map((img, index) => {
                                            // Validate URL before rendering
                                            if (!img || !isValidUrl(img)) return null;

                                            return (
                                                <div key={index} className="relative aspect-video">
                                                    <Image
                                                        src={img}
                                                        alt={`Project image ${index + 1}`}
                                                        fill
                                                        className="object-cover rounded"
                                                        onError={(e) => {
                                                            // Handle image loading errors
                                                            (e.target as HTMLImageElement).style.display = 'none';
                                                        }}
                                                    />
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Video Links */}
                            {project.projectVideoLink && Object.keys(project.projectVideoLink).length > 0 && (
                                <div className="space-y-2">
                                    <p className="text-sm font-medium">Video Links</p>
                                    {Object.entries(project.projectVideoLink).map(([name, url]) => (
                                        isValidUrl(url) && (
                                            <Link
                                                key={name}
                                                href={url}
                                                target="_blank"
                                                className="text-sm text-primary hover:underline block"
                                            >
                                                📹 {name}
                                            </Link>
                                        )
                                    ))}
                                </div>
                            )}

                            {/* GitHub Links */}
                            {project.gitHubRepoLink && Object.keys(project.gitHubRepoLink).length > 0 && (
                                <div className="space-y-2">
                                    <p className="text-sm font-medium">GitHub Repositories</p>
                                    {Object.entries(project.gitHubRepoLink).map(([name, url]) => (
                                        isValidUrl(url) && (
                                            <Link
                                                key={name}
                                                href={url}
                                                target="_blank"
                                                className="text-sm text-primary hover:underline block"
                                            >
                                                🐙 {name}
                                            </Link>
                                        )
                                    ))}
                                </div>
                            )}

                            {/* Other Links */}
                            {project.otherLink && Object.keys(project.otherLink).length > 0 && (
                                <div className="space-y-2">
                                    <p className="text-sm font-medium">Other Links</p>
                                    {Object.entries(project.otherLink).map(([name, url]) => (
                                        isValidUrl(url) && (
                                            <Link
                                                key={name}
                                                href={url}
                                                target="_blank"
                                                className="text-sm text-primary hover:underline block"
                                            >
                                                🔗 {name}
                                            </Link>
                                        )
                                    ))}
                                </div>
                            )}
                        </CardContent>

                        <CardFooter className="flex justify-end gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    setSelectedProject(project);
                                    setIsEditing(true);
                                    setShowModal(true);
                                }}
                                disabled={processing}
                            >
                                Edit
                            </Button>

                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="destructive" size="sm" disabled={processing}>
                                        Delete
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete the project.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={() => handleDelete(project._id)}
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
                    {isEditing ? 'Edit Project' : 'Create New Project'}
                </h2>
                <ProjectForm
                    initialData={selectedProject}
                    onSubmit={handleFormSubmit}
                    onCancel={() => setShowModal(false)}
                />
            </Modal>
        </div>
    );

}