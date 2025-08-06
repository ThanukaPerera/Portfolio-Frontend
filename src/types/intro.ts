export interface Intro {
    _id: string;
    welcomeText: string;
    fname: string;
    lname: string;
    title?: string;
    tagline: string;
    imgLink?: string;
    resumeLink?: string;
    active: boolean;
    createdAt?: string;
    updatedAt?: string;
    motto?:string;
  }