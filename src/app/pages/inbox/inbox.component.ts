import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmailFolder, EmailLabel, EmailMessage, folders, labels, messages } from './inbox.data';

@Component({
  selector: 'app-inbox',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inbox.component.html',
  styleUrl: './inbox.component.scss'
})
export class InboxComponent implements OnInit {

  // Email folders data
  folders: EmailFolder[] = folders;

  // Email labels data
  labels: EmailLabel[] = labels;

  // Email messages data
  messages: EmailMessage[] = messages;

  searchTerm: string = '';

  constructor() { }

  ngOnInit(): void {
    // Initialize component
    // Set Inbox as active by default
    this.selectFolder(this.folders[0]);
  }

  // Select folder
  selectFolder(folder: EmailFolder): void {
    // Reset all folders to inactive
    this.folders.forEach(f => f.isActive = false);
    // Set selected folder as active
    folder.isActive = true;
    console.log('Selected folder:', folder.name);
    // TODO: Filter messages based on selected folder
  }

  // Compose new email
  onCompose(): void {
    console.log('Compose new email');
    // TODO: Open compose modal or navigate to compose view
  }

  // Search emails
  onSearch(event: any): void {
    this.searchTerm = event.target.value.toLowerCase();
    console.log('Searching for:', this.searchTerm);
    // TODO: Filter messages based on search term
  }

  // Toggle star on message
  toggleStar(messageId: string): void {
    const message = this.messages.find(m => m.id === messageId);
    if (message) {
      message.isStarred = !message.isStarred;
    }
  }

  // Toggle message selection
  toggleMessageSelection(messageId: string): void {
    const message = this.messages.find(m => m.id === messageId);
    if (message) {
      message.isChecked = !message.isChecked;
    }
  }

  // Select/unselect all messages
  toggleSelectAll(): void {
    const allSelected = this.messages.every(m => m.isChecked);
    this.messages.forEach(m => m.isChecked = !allSelected);
  }

  // Get label color classes
  getLabelColorClasses(label: string): string {
    const labelMap: { [key: string]: string } = {
      'Primary': 'bg-green-500 bg-opacity-20 text-green-600',
      'Social': 'bg-blue-500 bg-opacity-20 text-blue-600',
      'Work': 'bg-orange-500 bg-opacity-20 text-orange-600',
      'Friends': 'bg-purple-500 bg-opacity-20 text-purple-600'
    };
    return labelMap[label] || '';
  }

  // Get label border color classes
  getLabelBorderColorClasses(label: string): string {
    const labelMap: { [key: string]: string } = {
      'Primary': 'border-green-500',
      'Social': 'border-blue-500',
      'Work': 'border-orange-500',
      'Friends': 'border-purple-500'
    };
    return labelMap[label] || '';
  }

  // Get label color value for inline styles
  getLabelColorValue(label: string): string {
    const labelMap: { [key: string]: string } = {
      'Primary': '#10b981', // green-500
      'Social': '#3b82f6',  // blue-500
      'Work': '#f97316',    // orange-500
      'Friends': '#a855f7'  // purple-500
    };
    return labelMap[label] || '#6b7280'; // gray-500 as default
  }
}