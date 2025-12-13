import { Component, EventEmitter, Output, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FloatingDropdownComponent } from '../../../shared/lib/floating-dropdown/floating-dropdown.component';

export interface OptionMenuItem {
  id: string;
  label: string;
  type: 'icon' | 'flag' | 'text' | 'notification';
  iconClass?: string;
  iconGradient?: {
    from: string;
    to: string;
  };
  flagUrl?: string;
  isSelected?: boolean;
  description?: string;
  iconColor?: string;
  action?: () => void;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, FloatingDropdownComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements AfterViewInit {
  @ViewChild('moreOptionsButton', { static: false }) moreOptionsButton!: ElementRef;
  @ViewChild('notificationButton', { static: false }) notificationButton!: ElementRef;
  @ViewChild('languageButton', { static: false }) languageButton!: ElementRef;

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

  // Dropdown visibility state
  isNotificationDropdownVisible = false;
  isLanguageDropdownVisible = false;
  isProfileDropdownVisible = false;

  // Default menu items matching the Figma design
  readonly DEFAULT_MENU_ITEMS: OptionMenuItem[] = [
    {
      id: 'manage-account',
      label: 'Manage Account',
      type: 'icon',
      iconClass: 'user-icon',
      iconGradient: {
        from: '#4e96ff',
        to: '#80c9fc'
      }
    },
    {
      id: 'change-password',
      label: 'Change Password',
      type: 'icon',
      iconClass: 'lock-icon',
      iconGradient: {
        from: '#f97fd9',
        to: '#ffc1e6'
      }
    },
    {
      id: 'activity-log',
      label: 'Activity Log',
      type: 'icon',
      iconClass: 'activity-icon',
      iconGradient: {
        from: '#9e8fff',
        to: '#ebcbff'
      }
    },
    {
      id: 'logout',
      label: 'Log out',
      type: 'icon',
      iconClass: 'logout-icon',
      iconGradient: {
        from: '#ff8f8f',
        to: '#ffc1c1'
      }
    }
  ];

  // Language menu items matching the Figma design
  readonly LANGUAGE_MENU_ITEMS: OptionMenuItem[] = [
    {
      id: 'english',
      label: 'English',
      type: 'flag',
      flagUrl: '/assets/flags/en.svg',
      isSelected: true
    },
    {
      id: 'french',
      label: 'French',
      type: 'flag',
      flagUrl: '/assets/flags/fr.svg',
      isSelected: false
    },
    {
      id: 'spanish',
      label: 'Spanish',
      type: 'flag',
      flagUrl: '/assets/flags/es.svg',
      isSelected: false
    }
  ];

  // Notification menu items matching the Figma design
  readonly NOTIFICATION_MENU_ITEMS: OptionMenuItem[] = [
    {
      id: 'settings',
      label: 'Settings',
      type: 'notification',
      description: 'Update Dashboard',
      iconClass: 'settings-icon',
      iconColor: '#FF6B6B'
    },
    {
      id: 'event-update',
      label: 'Event Update',
      type: 'notification',
      description: 'An event date update again',
      iconClass: 'event-icon',
      iconColor: '#4ECDC4'
    },
    {
      id: 'profile',
      label: 'Profile',
      type: 'notification',
      description: 'Update your profile',
      iconClass: 'profile-icon',
      iconColor: '#45B7D1'
    },
    {
      id: 'application-error',
      label: 'Application Error',
      type: 'notification',
      description: 'Check Your running application',
      iconClass: 'error-icon',
      iconColor: '#FFA07A'
    }
  ];

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
    this.toggleNotificationDropdown();
    // Optional: Clear notification count when clicked
    // this.notificationCount = 0;
  }

  toggleNotificationDropdown(): void {
    this.isNotificationDropdownVisible = !this.isNotificationDropdownVisible;
    // Close the other dropdowns if open
    if (this.isNotificationDropdownVisible) {
      this.isProfileDropdownVisible = false;
      this.isLanguageDropdownVisible = false;
    }
  }

  closeNotificationDropdown(): void {
    this.isNotificationDropdownVisible = false;
  }

  onLanguageClick(): void {
    this.languageClick.emit();
    this.toggleLanguageDropdown();
  }

  toggleLanguageDropdown(): void {
    this.isLanguageDropdownVisible = !this.isLanguageDropdownVisible;
    // Close the other dropdowns if open
    if (this.isLanguageDropdownVisible) {
      this.isProfileDropdownVisible = false;
      this.isNotificationDropdownVisible = false;
    }
  }

  closeLanguageDropdown(): void {
    this.isLanguageDropdownVisible = false;
  }

  onMoreOptionsClick(): void {
    this.moreOptionsClick.emit();
    this.toggleProfileDropdown();
  }

  toggleProfileDropdown(): void {
    this.isProfileDropdownVisible = !this.isProfileDropdownVisible;
    // Close the other dropdowns if open
    if (this.isProfileDropdownVisible) {
      this.isLanguageDropdownVisible = false;
      this.isNotificationDropdownVisible = false;
    }
  }

  closeProfileDropdown(): void {
    this.isProfileDropdownVisible = false;
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
    this.closeProfileDropdown();
  }

  handleLanguageAction(languageId: string): void {
    // Update selected language
    const languageNames: { [key: string]: string } = {
      'english': 'English',
      'french': 'French',
      'spanish': 'Spanish'
    };
    this.selectedLanguage = languageNames[languageId] || languageId;

    console.log(`Language changed to: ${this.selectedLanguage}`);
    // TODO: Implement language change functionality
    this.closeLanguageDropdown();
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
    this.closeNotificationDropdown();
  }

  onSeeAllNotifications(): void {
    console.log('See all notifications clicked');
    // TODO: Navigate to notifications page or open notifications modal
    this.closeNotificationDropdown();
  }

  // Getter methods to provide trigger elements for floating dropdowns
  getNotificationTriggerElement(): HTMLElement | undefined {
    return this.notificationButton?.nativeElement as HTMLElement;
  }

  getLanguageTriggerElement(): HTMLElement | undefined {
    return this.languageButton?.nativeElement as HTMLElement;
  }

  getProfileTriggerElement(): HTMLElement | undefined {
    return this.moreOptionsButton?.nativeElement as HTMLElement;
  }
}