import { Component, EventEmitter, Output, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OptionMenuComponent, OptionMenuItem } from '../option-menu/option-menu.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, OptionMenuComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements AfterViewInit {
  @ViewChild('moreOptionsButton', { static: false }) moreOptionsButton!: ElementRef;
  @ViewChild(OptionMenuComponent) optionMenu!: OptionMenuComponent;

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

  // Option menu state
  isOptionMenuVisible = false;
  menuItems: OptionMenuItem[] = OptionMenuComponent.DEFAULT_MENU_ITEMS.map(item => ({
    ...item,
    action: () => this.handleMenuAction(item.id)
  }));

  constructor() { }

  ngAfterViewInit() {
    // Component is ready
  }

  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }

  onSearchChange(): void {
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
    this.toggleOptionMenu();
  }

  toggleOptionMenu(): void {
    // Simple toggle - let CSS handle the positioning
    this.isOptionMenuVisible = !this.isOptionMenuVisible;
  }

  closeOptionMenu(): void {
    this.isOptionMenuVisible = false;
  }

  handleMenuAction(actionId: string): void {
    switch (actionId) {
      case 'manage-account':
        console.log('Manage Account clicked');
        // TODO: Navigate to account management or open modal
        break;
      case 'change-password':
        console.log('Change Password clicked');
        // TODO: Open password change modal
        break;
      case 'activity-log':
        console.log('Activity Log clicked');
        // TODO: Navigate to activity log page
        break;
      case 'logout':
        console.log('Logout clicked');
        // TODO: Implement logout functionality
        break;
      default:
        console.log(`Unknown action: ${actionId}`);
    }
  }
}