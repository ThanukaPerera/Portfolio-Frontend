export interface AboutMe {
    _id: string;
    intro1: string;
    intro2?: string;
    lottieURL: string;
    skills: string[];
    skillsImgLink: string[];
    active: boolean;
    createdAt?: string;
    updatedAt?: string;
  }