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

export const DEFAULT_MENU_ITEMS: OptionMenuItem[] = [
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
 export const LANGUAGE_MENU_ITEMS: OptionMenuItem[] = [
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
 export const NOTIFICATION_MENU_ITEMS: OptionMenuItem[] = [
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