// Common types used across the application
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  featured: boolean;
  status: 'completed' | 'in-progress' | 'planning';
  createdAt: Date;
  updatedAt: Date;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: number; // 1-5
  yearsOfExperience?: number;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  description: string;
  technologies: string[];
}

export interface ContactInfo {
  email: string;
  phone?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
}