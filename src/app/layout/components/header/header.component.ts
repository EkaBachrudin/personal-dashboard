import { Component, model, viewChild, effect, computed, output, ElementRef } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { FloatingDropdownComponent } from '../../../shared/lib/floating-dropdown/floating-dropdown.component';
import { DEFAULT_MENU_ITEMS, LANGUAGE_MENU_ITEMS, NOTIFICATION_MENU_ITEMS, OptionMenuItem } from './header.data';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, FloatingDropdownComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  // Using viewChild for accessing template elements
  readonly moreOptionsButton = viewChild<ElementRef>('moreOptionsButton');
  readonly notificationButton = viewChild<ElementRef>('notificationButton');
  readonly languageButton = viewChild<ElementRef>('languageButton');

  // Using output() instead of EventEmitter
  readonly toggleSidebar = output<void>();
  readonly search = output<string>();
  readonly notificationsClick = output<void>();
  readonly languageClick = output<void>();
  readonly moreOptionsClick = output<void>();

  // User data as signals using model() for potential external binding
  readonly userName = model('Moni Roy');
  readonly userRole = model('Admin');
  readonly userAvatar = model('https://picsum.photos/seed/moni-roy-avatar/100/100.jpg');
  readonly notificationCount = model(6);
  readonly selectedLanguage = model('English');
  readonly searchQuery = model('');

  // Dropdown visibility state as signals
  readonly isNotificationDropdownVisible = model(false);
  readonly isLanguageDropdownVisible = model(false);
  readonly isProfileDropdownVisible = model(false);

  // Default menu items matching the Figma design
  readonly DEFAULT_MENU_ITEMS: OptionMenuItem[] = DEFAULT_MENU_ITEMS;

  // Language menu items matching the Figma design
  readonly LANGUAGE_MENU_ITEMS: OptionMenuItem[] = LANGUAGE_MENU_ITEMS;

  // Notification menu items matching the Figma design
  readonly NOTIFICATION_MENU_ITEMS: OptionMenuItem[] = NOTIFICATION_MENU_ITEMS;

  constructor() {
    // Effect to emit search when query changes
    effect(() => {
      const query = this.searchQuery();
      this.search.emit(query);
    });

    // Effect to handle dropdown mutual exclusivity
    effect(() => {
      if (this.isNotificationDropdownVisible()) {
        this.isProfileDropdownVisible.set(false);
        this.isLanguageDropdownVisible.set(false);
      }
    });

    effect(() => {
      if (this.isLanguageDropdownVisible()) {
        this.isProfileDropdownVisible.set(false);
        this.isNotificationDropdownVisible.set(false);
      }
    });

    effect(() => {
      if (this.isProfileDropdownVisible()) {
        this.isLanguageDropdownVisible.set(false);
        this.isNotificationDropdownVisible.set(false);
      }
    });
  }

  // Computed signal for language items with selection state
  readonly languageMenuItems = computed(() => {
    return this.LANGUAGE_MENU_ITEMS.map(item => ({
      ...item,
      isSelected: item.label === this.selectedLanguage()
    }));
  });

  // Computed signal for user initials
  readonly userInitials = computed(() => {
    const name = this.userName();
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  });

  // Computed signal for notification badge visibility
  readonly hasNotifications = computed(() => {
    return this.notificationCount() > 0;
  });

  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }

  onNotificationsClick(): void {
    this.notificationsClick.emit();
    this.toggleNotificationDropdown();
    // Optional: Clear notification count when clicked
    // this.notificationCount.set(0);
  }

  toggleNotificationDropdown(): void {
    this.isNotificationDropdownVisible.set(!this.isNotificationDropdownVisible());
  }

  closeNotificationDropdown(): void {
    this.isNotificationDropdownVisible.set(false);
  }

  onLanguageClick(): void {
    this.languageClick.emit();
    this.toggleLanguageDropdown();
  }

  toggleLanguageDropdown(): void {
    this.isLanguageDropdownVisible.set(!this.isLanguageDropdownVisible());
  }

  closeLanguageDropdown(): void {
    this.isLanguageDropdownVisible.set(false);
  }

  onMoreOptionsClick(): void {
    this.moreOptionsClick.emit();
    this.toggleProfileDropdown();
  }

  toggleProfileDropdown(): void {
    this.isProfileDropdownVisible.set(!this.isProfileDropdownVisible());
  }

  closeProfileDropdown(): void {
    this.isProfileDropdownVisible.set(false);
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
    const newLanguage = languageNames[languageId] || languageId;
    this.selectedLanguage.set(newLanguage);

    console.log(`Language changed to: ${newLanguage}`);
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

  // Computed properties to provide trigger elements for floating dropdowns
  readonly notificationTriggerElement = computed(() => {
    return this.notificationButton()?.nativeElement as HTMLElement | undefined;
  });

  readonly languageTriggerElement = computed(() => {
    return this.languageButton()?.nativeElement as HTMLElement | undefined;
  });

  readonly profileTriggerElement = computed(() => {
    return this.moreOptionsButton()?.nativeElement as HTMLElement | undefined;
  });
}