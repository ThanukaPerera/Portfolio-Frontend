export interface Project {
    _id: string;
    projectTitle: string;
    projectDescription: string;
    myContribution?: string;
    technologiesUsed: string[];
    projectImgLink: string[];
    projectVideoLink?: { [key: string]: string };
    gitHubRepoLink?: { [key: string]: string };
    otherLink?: { [key: string]: string };
    type: 'Individual' | 'Group' | 'Client' | 'Open Source' | 'Academic' | 'Other';
    status: 'Completed' | 'In Progress' | 'On Hold';
    startDate: string;
    endDate?: string;
    active: boolean;
    createdAt?: string;
    updatedAt?: string;
  }