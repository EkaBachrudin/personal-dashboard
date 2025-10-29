import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Output() toggleSidebar = new EventEmitter<void>();
  @Output() search = new EventEmitter<string>();
  @Output() notificationsClick = new EventEmitter<void>();
  @Output() languageClick = new EventEmitter<void>();
  @Output() moreOptionsClick = new EventEmitter<void>();

  // User data matching the Figma design
  userName = 'Moni Roy';
  userRole = 'Admin';
  userAvatar = 'https://picsum.photos/seed/moni-roy-avatar/100/100.jpg';
  notificationCount = 6;
  selectedLanguage = 'English';
  searchQuery = '';

  constructor() { }

  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }

  onSearchChange(event: any): void {
    this.search.emit(this.searchQuery);
  }

  onNotificationsClick(): void {
    this.notificationsClick.emit();
    // Optional: Clear notification count when clicked
    // this.notificationCount = 0;
  }

  onLanguageClick(): void {
    this.languageClick.emit();
  }

  onMoreOptionsClick(): void {
    this.moreOptionsClick.emit();
  }
}