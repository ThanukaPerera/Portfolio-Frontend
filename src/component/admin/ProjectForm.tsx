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
    projectDescription: z.string().min(1, "Description is required"),
    myContribution: z.string().optional(),
    technologiesUsed: z.array(z.string()).min(1, "At least one technology is required"),
    projectImgLink: z.array(z.string()).default([]),
    projectVideoLink: z.record(z.string(), z.string()).default({}),
    gitHubRepoLink: z.record(z.string(), z.string()).default({}),
    otherLink: z.record(z.string(), z.string()).default({}),
    type: z.enum(['Individual', 'Group', 'Client', 'Open Source', 'Academic', 'Other']),
    status: z.enum(['Completed', 'In Progress', 'On Hold']),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().optional(),
    active: z.boolean().default(true)
});

type ProjectFormValues = z.infer<typeof projectSchema>;

interface LinkEntry {
    name: string;
    url: string;
}

interface ProjectFormProps {
    initialData?: Partial<ProjectFormValues> | null;
    onSubmit: (data: ProjectFormValues) => void;
    onCancel: () => void;
}

export default function ProjectForm({ initialData, onSubmit, onCancel }: ProjectFormProps) {
    const [technologies, setTechnologies] = useState<string[]>(['']);
    const [videoLinks, setVideoLinks] = useState<LinkEntry[]>([{ name: '', url: '' }]);
    const [githubLinks, setGithubLinks] = useState<LinkEntry[]>([{ name: '', url: '' }]);
    const [otherLinks, setOtherLinks] = useState<LinkEntry[]>([{ name: '', url: '' }]);

    const { register, handleSubmit, setValue, reset, watch, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            projectTitle: '',
            projectDescription: '',
            myContribution: '',
            technologiesUsed: [],
            projectImgLink: [],
            projectVideoLink: {},
            gitHubRepoLink: {},
            otherLink: {},
            type: 'Individual' as const,
            status: 'In Progress' as const,
            startDate: '',
            endDate: '',
            active: true
        }
    });

    useEffect(() => {
        if (initialData) {
            // Convert dates to YYYY-MM format for month input
            const formData = {
                ...initialData,
                technologiesUsed: initialData.technologiesUsed || [],
                projectVideoLink: initialData.projectVideoLink || {},
                gitHubRepoLink: initialData.gitHubRepoLink || {},
                otherLink: initialData.otherLink || {},
                startDate: initialData.startDate ? new Date(initialData.startDate).toISOString().slice(0, 7) : '',
                endDate: initialData.endDate ? new Date(initialData.endDate).toISOString().slice(0, 7) : ''
            };
            
            reset(formData);
            
            // Set up the link arrays for editing
            setTechnologies(initialData.technologiesUsed || ['']);
            
            const videoEntries = Object.entries(initialData.projectVideoLink || {}).map(([name, url]) => ({ name, url: String(url) }));
            setVideoLinks(videoEntries.length ? videoEntries : [{ name: '', url: '' }]);
            
            const githubEntries = Object.entries(initialData.gitHubRepoLink || {}).map(([name, url]) => ({ name, url: String(url) }));
            setGithubLinks(githubEntries.length ? githubEntries : [{ name: '', url: '' }]);
            
            const otherEntries = Object.entries(initialData.otherLink || {}).map(([name, url]) => ({ name, url: String(url) }));
            setOtherLinks(otherEntries.length ? otherEntries : [{ name: '', url: '' }]);
        }
    }, [initialData, reset]);

    // Technology management
    const addTechnology = () => setTechnologies([...technologies, '']);
    const removeTechnology = (index: number) => {
        const newTechs = technologies.filter((_, i) => i !== index);
        setTechnologies(newTechs);
        setValue('technologiesUsed', newTechs.filter(tech => tech.trim()));
    };
    const updateTechnology = (index: number, value: string) => {
        const newTechs = [...technologies];
        newTechs[index] = value;
        setTechnologies(newTechs);
        setValue('technologiesUsed', newTechs.filter(tech => tech.trim()));
    };

    // Link management helpers
    const createLinkManager = (
        links: LinkEntry[],
        setLinks: (links: LinkEntry[]) => void,
        fieldName: keyof ProjectFormValues
    ) => ({
        add: () => setLinks([...links, { name: '', url: '' }]),
        remove: (index: number) => {
            const newLinks = links.filter((_, i) => i !== index);
            setLinks(newLinks);
            const linkObject = newLinks.reduce((acc, link) => {
                if (link.name.trim() && link.url.trim()) {
                    acc[link.name.trim()] = link.url.trim();
                }
                return acc;
            }, {} as Record<string, string>);
            setValue(fieldName as keyof ProjectFormValues, linkObject);
        },
        update: (index: number, field: keyof LinkEntry, value: string) => {
            const newLinks = [...links];
            newLinks[index] = { ...newLinks[index], [field]: value };
            setLinks(newLinks);
            const linkObject = newLinks.reduce((acc, link) => {
                if (link.name.trim() && link.url.trim()) {
                    acc[link.name.trim()] = link.url.trim();
                }
                return acc;
            }, {} as Record<string, string>);
            setValue(fieldName as keyof ProjectFormValues, linkObject);
        }
    });

    const videoManager = createLinkManager(videoLinks, setVideoLinks, 'projectVideoLink');
    const githubManager = createLinkManager(githubLinks, setGithubLinks, 'gitHubRepoLink');
    const otherManager = createLinkManager(otherLinks, setOtherLinks, 'otherLink');

    const handleFormSubmit = (data: ProjectFormValues) => {
        // Validate that startDate is provided
        if (!data.startDate || data.startDate.trim() === '') {
            alert('Start date is required');
            return;
        }

        // Prepare submission data with properly converted dates
        const submissionData = {
            projectTitle: data.projectTitle,
            projectDescription: data.projectDescription,
            myContribution: data.myContribution || '',
            technologiesUsed: data.technologiesUsed,
            projectImgLink: data.projectImgLink,
            projectVideoLink: data.projectVideoLink,
            gitHubRepoLink: data.gitHubRepoLink,
            otherLink: data.otherLink,
            type: data.type,
            status: data.status,
            startDate: new Date(data.startDate + '-01').toISOString(),
            endDate: data.endDate && data.endDate.trim() !== '' ? new Date(data.endDate + '-01').toISOString() : undefined,
            active: data.active
        };
        
        onSubmit(submissionData);
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
                <h3 className="text-lg font-medium">Basic Information</h3>
                
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
                        className="w-full p-3 border rounded-lg min-h-[120px] resize-none"
                        placeholder="Detailed description of the project..."
                    />
                    {errors.projectDescription && <p className="text-red-500 text-sm">{errors.projectDescription.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Project Type</Label>
                        <select
                            {...register('type')}
                            className="w-full p-2 border rounded-lg"
                        >
                            <option value="Individual">Individual</option>
                            <option value="Group">Group</option>
                            <option value="Client">Client</option>
                            <option value="Open Source">Open Source</option>
                            <option value="Academic">Academic</option>
                            <option value="Other">Other</option>
                        </select>
                        {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label>Project Status</Label>
                        <select
                            {...register('status')}
                            className="w-full p-2 border rounded-lg"
                        >
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                            <option value="On Hold">On Hold</option>
                        </select>
                        {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
                    </div>
                </div>

                {/* Project Dates */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Start Date *</Label>
                        <input
                            type="month"
                            {...register('startDate')}
                            className="w-full p-2 border rounded-lg"
                            required
                        />
                        {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label>End Date (Optional)</Label>
                        <input
                            type="month"
                            {...register('endDate')}
                            className="w-full p-2 border rounded-lg"
                        />
                        {errors.endDate && <p className="text-red-500 text-sm">{errors.endDate.message}</p>}
                    </div>
                </div>

                <div className="space-y-2">
                    <Label>My Contribution (Optional)</Label>
                    <textarea
                        {...register('myContribution')}
                        className="w-full p-3 border rounded-lg min-h-[80px] resize-none"
                        placeholder="Describe your specific contribution to this project..."
                    />
                    {errors.myContribution && <p className="text-red-500 text-sm">{errors.myContribution.message}</p>}
                </div>
            </div>

            {/* Technologies Used */}
            <div className="space-y-4">
                <h3 className="text-lg font-medium">Technologies Used</h3>
                {technologies.map((tech, index) => (
                    <div key={`tech-${index}`} className="flex gap-2 items-center">
                        <Input
                            value={tech}
                            onChange={(e) => updateTechnology(index, e.target.value)}
                            placeholder="Technology name (e.g., React, Node.js)"
                        />
                        {technologies.length > 1 && (
                            <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={() => removeTechnology(index)}
                            >
                                Remove
                            </Button>
                        )}
                    </div>
                ))}
                <Button type="button" onClick={addTechnology} variant="outline">
                    Add Technology
                </Button>
                {errors.technologiesUsed && <p className="text-red-500 text-sm">{errors.technologiesUsed.message}</p>}
            </div>

            {/* Images */}
            <div className="space-y-4">
                <h3 className="text-lg font-medium">Project Images</h3>
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
            <div className="space-y-4">
                <h3 className="text-lg font-medium">Project Videos</h3>
                {videoLinks.map((link, index) => (
                    <div key={`video-${index}`} className="grid grid-cols-2 gap-2">
                        <Input
                            value={link.name}
                            onChange={(e) => videoManager.update(index, 'name', e.target.value)}
                            placeholder="Video name (e.g., Demo, Tutorial)"
                        />
                        <div className="flex gap-2">
                            <Input
                                value={link.url}
                                onChange={(e) => videoManager.update(index, 'url', e.target.value)}
                                placeholder="YouTube URL"
                            />
                            {videoLinks.length > 1 && (
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => videoManager.remove(index)}
                                >
                                    Remove
                                </Button>
                            )}
                        </div>
                    </div>
                ))}
                <Button type="button" onClick={videoManager.add} variant="outline">
                    Add Video Link
                </Button>
            </div>

            {/* GitHub Links */}
            <div className="space-y-4">
                <h3 className="text-lg font-medium">GitHub Repository Links</h3>
                {githubLinks.map((link, index) => (
                    <div key={`github-${index}`} className="grid grid-cols-2 gap-2">
                        <Input
                            value={link.name}
                            onChange={(e) => githubManager.update(index, 'name', e.target.value)}
                            placeholder="Repository name (e.g., Frontend, Backend)"
                        />
                        <div className="flex gap-2">
                            <Input
                                value={link.url}
                                onChange={(e) => githubManager.update(index, 'url', e.target.value)}
                                placeholder="GitHub repository URL"
                            />
                            {githubLinks.length > 1 && (
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => githubManager.remove(index)}
                                >
                                    Remove
                                </Button>
                            )}
                        </div>
                    </div>
                ))}
                <Button type="button" onClick={githubManager.add} variant="outline">
                    Add GitHub Repository
                </Button>
            </div>

            {/* Other Links */}
            <div className="space-y-4">
                <h3 className="text-lg font-medium">Other Links</h3>
                {otherLinks.map((link, index) => (
                    <div key={`other-${index}`} className="grid grid-cols-2 gap-2">
                        <Input
                            value={link.name}
                            onChange={(e) => otherManager.update(index, 'name', e.target.value)}
                            placeholder="Link name (e.g., Live Demo, Documentation)"
                        />
                        <div className="flex gap-2">
                            <Input
                                value={link.url}
                                onChange={(e) => otherManager.update(index, 'url', e.target.value)}
                                placeholder="URL"
                            />
                            {otherLinks.length > 1 && (
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => otherManager.remove(index)}
                                >
                                    Remove
                                </Button>
                            )}
                        </div>
                    </div>
                ))}
                <Button type="button" onClick={otherManager.add} variant="outline">
                    Add Other Link
                </Button>
            </div>

            {/* Active Status */}
            <div className="flex items-center space-x-2">
                <input
                    type="checkbox"
                    {...register('active')}
                    id="active-status"
                    className="h-4 w-4"
                />
                <Label htmlFor="active-status">Active Project</Label>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-2 pt-4 border-t">
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
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Processing...' : (initialData ? 'Update Project' : 'Create Project')}
                </Button>
            </div>
        </form>
    );
}