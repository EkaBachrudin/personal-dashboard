import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Project, Skill, Experience, ContactInfo } from '../types';
import { Helpers } from '../utils/helpers';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private mockProjects: Project[] = [
    {
      id: Helpers.generateId(),
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with React and Node.js',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example',
      featured: true,
      status: 'completed',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-02-01')
    },
    {
      id: Helpers.generateId(),
      title: 'Mobile Banking App',
      description: 'Cross-platform mobile banking application',
      technologies: ['React Native', 'TypeScript', 'Redux'],
      featured: false,
      status: 'in-progress',
      createdAt: new Date('2024-02-10'),
      updatedAt: new Date('2024-02-20')
    }
  ];

  private mockSkills: Skill[] = [
    { id: Helpers.generateId(), name: 'TypeScript', category: 'Programming Language', level: 5, yearsOfExperience: 3 },
    { id: Helpers.generateId(), name: 'Angular', category: 'Framework', level: 5, yearsOfExperience: 2 },
    { id: Helpers.generateId(), name: 'React', category: 'Framework', level: 4, yearsOfExperience: 2 },
    { id: Helpers.generateId(), name: 'Node.js', category: 'Runtime', level: 4, yearsOfExperience: 2 },
    { id: Helpers.generateId(), name: 'HTML/CSS', category: 'Web Technologies', level: 5, yearsOfExperience: 5 },
    { id: Helpers.generateId(), name: 'JavaScript', category: 'Programming Language', level: 5, yearsOfExperience: 5 },
    { id: Helpers.generateId(), name: 'MongoDB', category: 'Database', level: 3, yearsOfExperience: 1 },
    { id: Helpers.generateId(), name: 'Git', category: 'Tool', level: 4, yearsOfExperience: 4 }
  ];

  private mockExperience: Experience[] = [
    {
      id: Helpers.generateId(),
      company: 'Tech Company',
      position: 'Senior Frontend Developer',
      startDate: new Date('2023-01-01'),
      current: true,
      description: 'Leading frontend development for enterprise applications',
      technologies: ['Angular', 'TypeScript', 'RxJS', 'NgRx']
    },
    {
      id: Helpers.generateId(),
      company: 'StartupXYZ',
      position: 'Full Stack Developer',
      startDate: new Date('2021-06-01'),
      endDate: new Date('2022-12-31'),
      current: false,
      description: 'Developed and maintained web applications',
      technologies: ['React', 'Node.js', 'Express', 'PostgreSQL']
    }
  ];

  constructor() {}

  // Projects
  getProjects(): Observable<Project[]> {
    return of(this.mockProjects).pipe(delay(500));
  }

  getProject(id: string): Observable<Project | undefined> {
    return of(this.mockProjects.find(p => p.id === id)).pipe(delay(300));
  }

  createProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Observable<Project> {
    const newProject: Project = {
      ...project,
      id: Helpers.generateId(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.mockProjects.push(newProject);
    return of(newProject).pipe(delay(300));
  }

  updateProject(id: string, updates: Partial<Project>): Observable<Project | undefined> {
    const index = this.mockProjects.findIndex(p => p.id === id);
    if (index !== -1) {
      this.mockProjects[index] = {
        ...this.mockProjects[index],
        ...updates,
        updatedAt: new Date()
      };
      return of(this.mockProjects[index]).pipe(delay(300));
    }
    return of(undefined).pipe(delay(300));
  }

  deleteProject(id: string): Observable<boolean> {
    const index = this.mockProjects.findIndex(p => p.id === id);
    if (index !== -1) {
      this.mockProjects.splice(index, 1);
      return of(true).pipe(delay(300));
    }
    return of(false).pipe(delay(300));
  }

  // Skills
  getSkills(): Observable<Skill[]> {
    return of(this.mockSkills).pipe(delay(500));
  }

  createSkill(skill: Omit<Skill, 'id'>): Observable<Skill> {
    const newSkill: Skill = {
      ...skill,
      id: Helpers.generateId()
    };
    this.mockSkills.push(newSkill);
    return of(newSkill).pipe(delay(300));
  }

  updateSkill(id: string, updates: Partial<Skill>): Observable<Skill | undefined> {
    const index = this.mockSkills.findIndex(s => s.id === id);
    if (index !== -1) {
      this.mockSkills[index] = { ...this.mockSkills[index], ...updates };
      return of(this.mockSkills[index]).pipe(delay(300));
    }
    return of(undefined).pipe(delay(300));
  }

  deleteSkill(id: string): Observable<boolean> {
    const index = this.mockSkills.findIndex(s => s.id === id);
    if (index !== -1) {
      this.mockSkills.splice(index, 1);
      return of(true).pipe(delay(300));
    }
    return of(false).pipe(delay(300));
  }

  // Experience
  getExperience(): Observable<Experience[]> {
    return of(this.mockExperience).pipe(delay(500));
  }

  createExperience(experience: Omit<Experience, 'id'>): Observable<Experience> {
    const newExperience: Experience = {
      ...experience,
      id: Helpers.generateId()
    };
    this.mockExperience.push(newExperience);
    return of(newExperience).pipe(delay(300));
  }

  updateExperience(id: string, updates: Partial<Experience>): Observable<Experience | undefined> {
    const index = this.mockExperience.findIndex(e => e.id === id);
    if (index !== -1) {
      this.mockExperience[index] = { ...this.mockExperience[index], ...updates };
      return of(this.mockExperience[index]).pipe(delay(300));
    }
    return of(undefined).pipe(delay(300));
  }

  deleteExperience(id: string): Observable<boolean> {
    const index = this.mockExperience.findIndex(e => e.id === id);
    if (index !== -1) {
      this.mockExperience.splice(index, 1);
      return of(true).pipe(delay(300));
    }
    return of(false).pipe(delay(300));
  }
}