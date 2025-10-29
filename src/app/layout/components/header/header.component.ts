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
  isLanguageMenuVisible = false;
  isNotificationMenuVisible = false;
  menuItems: OptionMenuItem[] = OptionMenuComponent.DEFAULT_MENU_ITEMS.map(item => ({
    ...item,
    action: () => this.handleMenuAction(item.id)
  }));

  // Language menu state
  languageMenuItems: OptionMenuItem[] = OptionMenuComponent.LANGUAGE_MENU_ITEMS.map(item => ({
    ...item,
    action: () => this.handleLanguageAction(item.id)
  }));

  // Notification menu state
  notificationMenuItems: OptionMenuItem[] = OptionMenuComponent.NOTIFICATION_MENU_ITEMS.map(item => ({
    ...item,
    action: () => this.handleNotificationAction(item.id)
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
    this.toggleNotificationMenu();
    // Optional: Clear notification count when clicked
    // this.notificationCount = 0;
  }

  toggleNotificationMenu(): void {
    this.isNotificationMenuVisible = !this.isNotificationMenuVisible;
    // Close the other menus if open
    if (this.isNotificationMenuVisible) {
      this.isOptionMenuVisible = false;
      this.isLanguageMenuVisible = false;
    }
  }

  closeNotificationMenu(): void {
    this.isNotificationMenuVisible = false;
  }

  onLanguageClick(): void {
    this.languageClick.emit();
    this.toggleLanguageMenu();
  }

  toggleLanguageMenu(): void {
    this.isLanguageMenuVisible = !this.isLanguageMenuVisible;
    // Close the other menus if open
    if (this.isLanguageMenuVisible) {
      this.isOptionMenuVisible = false;
      this.isNotificationMenuVisible = false;
    }
  }

  closeLanguageMenu(): void {
    this.isLanguageMenuVisible = false;
  }

  onMoreOptionsClick(): void {
    this.moreOptionsClick.emit();
    this.toggleOptionMenu();
  }

  toggleOptionMenu(): void {
    this.isOptionMenuVisible = !this.isOptionMenuVisible;
    // Close the other menus if open
    if (this.isOptionMenuVisible) {
      this.isLanguageMenuVisible = false;
      this.isNotificationMenuVisible = false;
    }
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

  handleLanguageAction(languageId: string): void {
    // Update selected language
    const selectedLanguage = this.languageMenuItems.find(item => item.id === languageId);
    if (selectedLanguage) {
      // Update selected state for all items
      this.languageMenuItems = this.languageMenuItems.map(item => ({
        ...item,
        isSelected: item.id === languageId
      }));

      // Update the displayed language
      const languageNames: { [key: string]: string } = {
        'english': 'English',
        'french': 'French',
        'spanish': 'Spanish'
      };
      this.selectedLanguage = languageNames[languageId] || languageId;

      console.log(`Language changed to: ${this.selectedLanguage}`);
      // TODO: Implement language change functionality
    }
    this.closeLanguageMenu();
  }

  handleNotificationAction(notificationId: string): void {
    console.log(`Notification clicked: ${notificationId}`);
    // TODO: Implement notification click functionality
    switch (notificationId) {
      case 'settings':
        console.log('Settings notification clicked');
        // TODO: Navigate to settings or open settings modal
        break;
      case 'event-update':
        console.log('Event Update notification clicked');
        // TODO: Navigate to event or show event details
        break;
      case 'profile':
        console.log('Profile notification clicked');
        // TODO: Navigate to profile or open profile modal
        break;
      case 'application-error':
        console.log('Application Error notification clicked');
        // TODO: Navigate to error logs or show error details
        break;
      default:
        console.log(`Unknown notification: ${notificationId}`);
    }
    this.closeNotificationMenu();
  }

  onSeeAllNotifications(): void {
    console.log('See all notifications clicked');
    // TODO: Navigate to notifications page or open notifications modal
    this.closeNotificationMenu();
  }
}