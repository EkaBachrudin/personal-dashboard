import { Component, EventEmitter, Input, Output, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface OptionMenuItem {
  id: string;
  label: string;
  iconClass: string;
  iconGradient?: {
    from: string;
    to: string;
  };
  action?: () => void;
}

@Component({
  selector: 'app-option-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './option-menu.component.html',
  styleUrl: './option-menu.component.scss'
})
export class OptionMenuComponent {
  @Input() menuItems: OptionMenuItem[] = [];
  @Input() isVisible: boolean = false;
  @Output() closeMenu = new EventEmitter<void>();

  constructor() { }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.isVisible) return;

    const target = event.target as HTMLElement;
    const menuElement = document.querySelector('.option-menu-container');

    if (menuElement && !menuElement.contains(target)) {
      this.closeMenu.emit();
    }
  }

  @HostListener('document:keydown', ['$event'])
  onDocumentKeydown(event: KeyboardEvent): void {
    if (!this.isVisible) return;

    if (event.key === 'Escape') {
      this.closeMenu.emit();
    }
  }

  onMenuItemClick(item: OptionMenuItem): void {
    if (item.action) {
      item.action();
    }
    this.closeMenu.emit();
  }

  onClose(): void {
    this.closeMenu.emit();
  }

  // Default menu items matching the Figma design
  static readonly DEFAULT_MENU_ITEMS: OptionMenuItem[] = [
    {
      id: 'manage-account',
      label: 'Manage Account',
      iconClass: 'user-icon',
      iconGradient: {
        from: '#4e96ff',
        to: '#80c9fc'
      }
    },
    {
      id: 'change-password',
      label: 'Change Password',
      iconClass: 'lock-icon',
      iconGradient: {
        from: '#f97fd9',
        to: '#ffc1e6'
      }
    },
    {
      id: 'activity-log',
      label: 'Activity Log',
      iconClass: 'activity-icon',
      iconGradient: {
        from: '#9e8fff',
        to: '#ebcbff'
      }
    },
    {
      id: 'logout',
      label: 'Log out',
      iconClass: 'logout-icon',
      iconGradient: {
        from: '#ff8f8f',
        to: '#ffc1c1'
      }
    }
  ];
}