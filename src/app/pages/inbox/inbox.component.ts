import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface EmailMessage {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  time: string;
  isStarred: boolean;
  isRead: boolean;
  label: string;
  isChecked: boolean;
}

export interface EmailFolder {
  name: string;
  count: number;
  icon: string;
  isActive: boolean;
}

export interface EmailLabel {
  name: string;
  color: string;
}

@Component({
  selector: 'app-inbox',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inbox.component.html',
  styleUrl: './inbox.component.scss'
})
export class InboxComponent implements OnInit {

  // Email folders data
  folders: EmailFolder[] = [
    { name: 'Inbox', count: 1253, icon: 'inbox', isActive: true },
    { name: 'Starred', count: 245, icon: 'star', isActive: false },
    { name: 'Sent', count: 24532, icon: 'send', isActive: false },
    { name: 'Draft', count: 9, icon: 'draft', isActive: false },
    { name: 'Spam', count: 14, icon: 'spam', isActive: false },
    { name: 'Important', count: 18, icon: 'important', isActive: false },
    { name: 'Bin', count: 9, icon: 'bin', isActive: false }
  ];

  // Email labels data
  labels: EmailLabel[] = [
    { name: 'Primary', color: 'green' },
    { name: 'Social', color: 'blue' },
    { name: 'Work', color: 'orange' },
    { name: 'Friends', color: 'purple' }
  ];

  // Email messages data
  messages: EmailMessage[] = [
    {
      id: '1',
      sender: 'Jullu Jalal',
      subject: 'Our Bachelor of Commerce program is ACBSP-accredited.',
      preview: 'Our Bachelor of Commerce program is ACBSP-accredited.',
      time: '8:38 AM',
      isStarred: false,
      isRead: false,
      label: 'Primary',
      isChecked: false
    },
    {
      id: '2',
      sender: 'Minerva Barnett',
      subject: 'Get Best Advertiser In Your Side Pocket',
      preview: 'Get Best Advertiser In Your Side Pocket',
      time: '8:13 AM',
      isStarred: false,
      isRead: false,
      label: 'Work',
      isChecked: false
    },
    {
      id: '3',
      sender: 'Peter Lewis',
      subject: 'Vacation Home Rental Success',
      preview: 'Vacation Home Rental Success',
      time: '7:52 PM',
      isStarred: true,
      isRead: false,
      label: 'Friends',
      isChecked: false
    },
    {
      id: '4',
      sender: 'Anthony Briggs',
      subject: 'Free Classifieds Using Them To Promote Your Stuff Online',
      preview: 'Free Classifieds Using Them To Promote Your Stuff Online',
      time: '7:52 PM',
      isStarred: false,
      isRead: false,
      label: '',
      isChecked: false
    },
    {
      id: '5',
      sender: 'Clifford Morgan',
      subject: 'Enhance Your Brand Potential With Giant Advertising Blimps',
      preview: 'Enhance Your Brand Potential With Giant Advertising Blimps',
      time: '4:13 PM',
      isStarred: true,
      isRead: false,
      label: 'Social',
      isChecked: false
    }
  ];

  searchTerm: string = '';

  constructor() { }

  ngOnInit(): void {
    // Initialize component
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
}