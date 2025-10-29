import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

// Utility functions
export class Helpers {
  static formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  }

  static generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  static slugify(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  static truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  }

  static getInitials(name: string): string {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .substr(0, 2);
  }

  // Simulate API delay
  static simulateApiCall<T>(data: T, delayMs: number = 1000): Observable<T> {
    return of(data).pipe(
      delay(delayMs),
      map(response => response)
    );
  }

  // Validate email
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Get status color class
  static getStatusColor(status: string): string {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'planning':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  // Capitalize first letter
  static capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}