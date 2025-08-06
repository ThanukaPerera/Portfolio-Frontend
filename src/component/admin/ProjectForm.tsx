// components/admin/ProjectForm.tsx
'use client'
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ImageUpload } from '@/component/admin/ImageUpload';

const projectSchema = z.object({
    projectTitle: z.string().min(3, "Title must be at least 3 characters"),
    projectDescription: z.string().optional(),
    projectImgLink: z.array(z.string()).default([]),
    projectVideoLink: z.array(z.string()).default([]),
    gitHubRepoLink: z.array(z.string()).default([]),
    active: z.boolean().default(false)
});

type ProjectFormValues = z.infer<typeof projectSchema>;

interface ProjectFormProps {
    initialData?: ProjectFormValues | null;
    onSubmit: (data: ProjectFormValues) => void;
    onCancel: () => void;
}

export default function ProjectForm({ initialData, onSubmit, onCancel }: ProjectFormProps) {
    const [githubLinks, setGithubLinks] = useState<string[]>(['']);

    const { register, handleSubmit, setValue, reset, watch, formState: { errors, isSubmitting } } = useForm<ProjectFormValues>({
        // @ts-expect-error - Type mismatch between zod schema and form type
        resolver: zodResolver(projectSchema),
        defaultValues: initialData || {
            projectTitle: '',
            projectDescription: '',
            projectImgLink: [],
            projectVideoLink: [],
            gitHubRepoLink: [],
            active: false
        }
    });

    useEffect(() => {
        if (initialData) {
            reset(initialData);
            setGithubLinks(initialData.gitHubRepoLink ?? ['']);
            setValue('gitHubRepoLink', initialData.gitHubRepoLink ?? []);
        }
    }, [initialData, reset, setValue]);

    const addGithubLink = () => {
        const newLinks = [...githubLinks, ''];
        setGithubLinks(newLinks);
        setValue('gitHubRepoLink', newLinks);
    };

    const removeGithubLink = (index: number) => {
        const newLinks = githubLinks.filter((_, i) => i !== index);
        setGithubLinks(newLinks);
        setValue('gitHubRepoLink', newLinks);
    };

    const updateGithubLink = (index: number, value: string) => {
        const newLinks = [...githubLinks];
        newLinks[index] = value;
        setGithubLinks(newLinks);
        setValue('gitHubRepoLink', newLinks);
    };

    const handleFormSubmit = (data: ProjectFormValues) => {
        // Filter out empty links
        const filteredVideoLinks = data.projectVideoLink?.filter(link => link.trim() !== "") || [];
        const filteredGitLinks = data.gitHubRepoLink?.filter(link => link.trim() !== "") || [];
        
        const formData = {
            ...data,
            projectVideoLink: filteredVideoLinks,
            gitHubRepoLink: filteredGitLinks
        };
        
        onSubmit(formData);
    };

    return (
        // @ts-expect-error - Form submit handler type issue
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <div className="space-y-2">
                <Label>Project Title</Label>
                <Input
                    {...register('projectTitle')}
                    placeholder="Amazing Project"
                />
                {errors.projectTitle && <p className="text-red-500 text-sm">{errors.projectTitle.message}</p>}
            </div>

            <div className="space-y-2">
                <Label>Project Description</Label>
                <textarea
                    {...register('projectDescription')}
                    className="w-full p-2 border rounded min-h-[100px]"
                    placeholder="Project details..."
                />
                {errors.projectDescription && <p className="text-red-500 text-sm">{errors.projectDescription.message}</p>}
            </div>

            {/* Image Upload Component */}
            <div className="space-y-2">
                <Label>Project Images</Label>
                <ImageUpload
                    onChange={(urls) => setValue('projectImgLink', urls)}
                    value={watch('projectImgLink') || []}
                    maxFiles={5}
                    disabled={isSubmitting}
                />
                {errors.projectImgLink && (
                    <p className="text-red-500 text-sm">{errors.projectImgLink.message}</p>
                )}
            </div>

            {/* Video Links */}
            {/* <div className="space-y-4">
                <Label>Video Links</Label>
                {videoLinks.map((link, index) => (
                    <div key={`vid-${index}`} className="flex gap-2 items-center">
                        <div className="flex-1">
                            <Input
                                value={link}
                                onChange={(e) => updateMediaLink('video', index, e.target.value)}
                                placeholder={`Video URL ${index + 1}`}
                            />
                            {errors.projectVideoLink?.[index] && (
                                <p className="text-red-500 text-sm">{errors.projectVideoLink[index]?.message}</p>
                            )}
                        </div>
                        {videoLinks.length > 1 && (
                            <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={() => removeMediaLink('video', index)}
                            >
                                Remove
                            </Button>
                        )}
                    </div>
                ))}
                <Button type="button" onClick={() => addMediaLink('video')} variant="outline">
                    Add Video URL
                </Button>
            </div> */}

            {/* GitHub Repo Links */}
            <div className="space-y-4">
                <Label>GitHub Repo Links</Label>
                {githubLinks.map((link, index) => (
                    <div key={`gh-${index}`} className="flex gap-2 items-center">
                        <div className="flex-1">
                            <Input
                                value={link}
                                onChange={(e) => updateGithubLink(index, e.target.value)}
                                placeholder={`GitHub URL ${index + 1}`}
                            />
                            {errors.gitHubRepoLink?.[index] && (
                                <p className="text-red-500 text-sm">{errors.gitHubRepoLink[index]?.message}</p>
                            )}
                        </div>
                        {githubLinks.length > 1 && (
                            <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={() => removeGithubLink(index)}
                            >
                                Remove
                            </Button>
                        )}
                    </div>
                ))}
                <Button type="button" onClick={addGithubLink} variant="outline">
                    Add GitHub URL
                </Button>
            </div>

            {/* Project Documents Upload */}
            {/* <div className="space-y-2">
                <Label>Project Documents</Label>
                <FileUpload
                    onChange={(urls) => setValue('projectDocuments', urls)}
                    value={watch('projectDocuments') || []}
                    maxFiles={3}
                    accept=".pdf,.doc,.docx"
                    disabled={isSubmitting}
                />
            </div> */}

            <div className="flex items-center space-x-2">
                <input
                    type="checkbox"
                    {...register('active')}
                    id="active-status"
                    className="h-4 w-4"
                />
                <Label htmlFor="active-status">Active Project</Label>
            </div>

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
                    {isSubmitting ? 'Processing...' : (initialData ? 'Update' : 'Create')}
                </Button>
            </div>
        </form>
    );
}