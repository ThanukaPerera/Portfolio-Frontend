import ProjectDetail from '../../../component/ProjectDetail';
import axios from 'axios';
import { notFound } from 'next/navigation';

interface ProjectPageProps {
  params: Promise<{
    id: string;
  }>;
}

const API_BASE = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`;

async function getProject(id: string) {
  try {
    const res = await axios.get(`${API_BASE}/project/${id}`, {
      headers: { "Cache-Control": "no-store" },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = await getProject(id);
  
  if (!project) {
    notFound();
  }

  const projectData = project.response || project;
  
  return (
    <ProjectDetail project={projectData} />
  );
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = await getProject(id);
  
  if (!project) {
    return {
      title: 'Project Not Found | Portfolio',
      description: 'The requested project could not be found.',
    };
  }
  
  const projectData = project.response || project;
  
  return {
    title: `${projectData.projectTitle} | Portfolio`,
    description: projectData.projectDescription || 'Detailed view of project with technologies, links, and comprehensive information.',
  };
}