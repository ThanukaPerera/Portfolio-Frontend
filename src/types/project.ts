export interface Project {
    _id: string;
    projectTitle: string;
    projectDescription: string;
    projectImgLink: string[];
    projectVideoLink: string[];
    gitHubRepoLink?: string[];
    active: boolean;
    createdAt?: string;
    updatedAt?: string;
  }