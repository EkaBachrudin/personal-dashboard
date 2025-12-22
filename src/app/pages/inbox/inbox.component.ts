import { Component, OnInit, computed, ElementRef, Renderer2, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmailFolder, EmailLabel, EmailMessage, folders, labels, messages } from './inbox.data';
import { BreakPointService } from '../../shared/services/breakpoint.service';

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

  // Filtered messages based on active folder and search
  filteredMessages: EmailMessage[] = [];

  searchTerm: string = '';

  // Track active folder
  activeFolder: EmailFolder | null = null;

  // Computed signal based on screen detection service
  
  isNavShow = computed(() => this.breakPointService.isBreakpoint());

  constructor(
    private breakPointService: BreakPointService,
    private el: ElementRef,
    private renderer: Renderer2,
    private destroyRef: DestroyRef
  ) {
    this.breakPointService.setup = 1280;
  }

  ngOnInit(): void {
    // Initialize component
    // Set Inbox as active by default
    this.selectFolder(this.folders[0]);

    // Setup click outside listener
    this.setupClickOutsideListener();
  }

  // Select folder
  selectFolder(folder: EmailFolder): void {
    // Reset all folders to inactive
    this.folders.forEach(f => f.isActive = false);
    // Set selected folder as active
    folder.isActive = true;
    this.activeFolder = folder;
    console.log('Selected folder:', folder.name);
    // Filter messages based on selected folder
    this.filterMessages();
  }

  // Filter messages based on active folder and search term
  filterMessages(): void {
    let filtered = [...this.messages];

    // Filter by folder
    if (this.activeFolder) {
      switch (this.activeFolder.name) {
        case 'Inbox':
          // Show inbox messages (explicit folder or messages without folder)
          filtered = filtered.filter(msg => msg.folder === 'inbox' || !msg.folder);
          break;
        case 'Starred':
          filtered = filtered.filter(msg => msg.isStarred);
          break;
        case 'Sent':
          filtered = filtered.filter(msg => msg.folder === 'sent');
          break;
        case 'Draft':
          filtered = filtered.filter(msg => msg.folder === 'draft');
          break;
        case 'Spam':
          // Simulate spam messages based on sender patterns
          filtered = filtered.filter(msg =>
            msg.sender.includes('Best') ||
            msg.sender.includes('Free') ||
            msg.sender.includes('Classifieds')
          );
          break;
        case 'Important':
          // Show starred messages and messages with 'Work' label
          filtered = filtered.filter(msg => msg.isStarred || msg.label === 'Work');
          break;
        case 'Bin':
          // Simulate deleted messages
          filtered = []; // Empty for now
          break;
      }
    }

    // Apply search filter if search term exists
    if (this.searchTerm) {
      filtered = filtered.filter(msg =>
        msg.sender.toLowerCase().includes(this.searchTerm) ||
        msg.subject.toLowerCase().includes(this.searchTerm) ||
        msg.preview.toLowerCase().includes(this.searchTerm)
      );
    }

    this.filteredMessages = filtered;
  }

  // Compose new email
  onCompose(): void {
    console.log('Compose new email');
  }

  // Search emails
  onSearch(event: any): void {
    this.searchTerm = event.target.value.toLowerCase();
    console.log('Searching for:', this.searchTerm);
    // Filter messages based on search term and active folder
    this.filterMessages();
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

  // Select/unselect all messages (works with filtered messages)
  toggleSelectAll(): void {
    const allSelected = this.filteredMessages.every(m => m.isChecked);
    this.filteredMessages.forEach(m => m.isChecked = !allSelected);
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

  // Truncate text to specified length with ellipsis
  truncateText(text: string, maxLength: number = 20): string {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + '...';
  }

  toggleShow() {
    // Use the screen detection service to toggle navbar visibility
    // Manual toggle only works when screen is above 1280px
    this.breakPointService.toggle();
  }

  // Setup click outside listener to close navigation when clicking outside
  private setupClickOutsideListener(): void {
    this.renderer.listen('document', 'click', (event: Event) => {
      const target = event.target as HTMLElement;
      const navigationElement = this.el.nativeElement.querySelector('.inbox-navigation');

      // Check if navigation is visible and click is outside navigation
      if (this.isNavShow() && navigationElement && !navigationElement.contains(target)) {
        // Close navigation when clicking outside in mobile view
        this.breakPointService.isBreakpoint.set(false);
      }
    });
  }
}