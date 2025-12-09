import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { filter } from 'rxjs/operators';
import { Event, NavigationEnd } from '@angular/router';

export interface MenuItem {
  title: string;
  icon: string;
  route: string;
  active?: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input() isOpen = true;
  @Output() toggleSidebar = new EventEmitter<void>();

  mainMenuItems: MenuItem[] = [
    {
      title: 'Dashboard',
      icon: '',
      route: '/dashboard'
    },
    {
      title: 'Products',
      icon: '',
      route: '/products'
    },
    {
      title: 'Favorites',
      icon: '',
      route: '/favorites'
    },
    {
      title: 'Inbox',
      icon: '',
      route: '/inbox'
    },
    {
      title: 'Order Lists',
      icon: '',
      route: '/orders'
    },
    {
      title: 'Product Stock',
      icon: '',
      route: '/stock'
    }
  ];

  pageMenuItems: MenuItem[] = [
    {
      title: 'Calendar',
      icon: '',
      route: '/calendar'
    },
    {
      title: 'To-Do',
      icon: '',
      route: '/todo'
    },
    {
      title: 'Contact',
      icon: '',
      route: '/contact'
    },
    {
      title: 'Invoice',
      icon: '',
      route: '/invoice'
    },
    {
      title: 'UI Elements',
      icon: '',
      route: '/ui-elements'
    },
    {
      title: 'Team',
      icon: '',
      route: '/team'
    },
    {
      title: 'Table',
      icon: '',
      route: '/table'
    }
  ];

  bottomMenuItems: MenuItem[] = [
    {
      title: 'Settings',
      icon: '',
      route: '/settings'
    },
    {
      title: 'Logout',
      icon: '',
      route: '/logout'
    }
  ];

  currentRoute: string = '';

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event: NavigationEnd) => event.urlAfterRedirects)
    ).subscribe(url => {
      this.currentRoute = url;
    });
  }

  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }

  navigateToRoute(route: string): void {
    this.router.navigate([route]);
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 768) {
      this.toggleSidebar.emit();
    }
  }

  isMenuItemActive(item: MenuItem): boolean {
    return this.currentRoute === item.route;
  }

  isMobile(): boolean {
    return typeof window !== 'undefined' && window.innerWidth < 768;
  }
}