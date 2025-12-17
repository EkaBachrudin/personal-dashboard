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
      icon: '/assets/sidebar-icons/dashboard.svg',
      route: '/dashboard'
    },
    {
      title: 'Products',
      icon: '/assets/sidebar-icons/products.svg',
      route: '/products'
    },
    {
      title: 'Favorites',
      icon: '/assets/sidebar-icons/favorites.svg',
      route: '/favorites'
    },
    {
      title: 'Inbox',
      icon: '/assets/sidebar-icons/inbox.svg',
      route: '/inbox'
    },
    {
      title: 'Order Lists',
      icon: '/assets/sidebar-icons/order-list.svg',
      route: '/orders'
    },
    {
      title: 'Product Stock',
      icon: '/assets/sidebar-icons/product-stock.svg',
      route: '/product-stock'
    }
  ];

  pageMenuItems: MenuItem[] = [
    {
      title: 'Calendar',
      icon: '/assets/sidebar-icons/calender.svg',
      route: '/calendar'
    },
    {
      title: 'To-Do',
      icon: '/assets/sidebar-icons/to-do.svg',
      route: '/todo'
    },
    {
      title: 'Contact',
      icon: '/assets/sidebar-icons/contact.svg',
      route: '/contact'
    },
    {
      title: 'Invoice',
      icon: '/assets/sidebar-icons/invoice.svg',
      route: '/invoice'
    },
    {
      title: 'UI Elements',
      icon: '/assets/sidebar-icons/ui-element.svg',
      route: '/ui-elements'
    },
    {
      title: 'Team',
      icon: '/assets/sidebar-icons/team.svg',
      route: '/team'
    },
    {
      title: 'Table',
      icon: '/assets/sidebar-icons/tables.svg',
      route: '/table'
    }
  ];

  bottomMenuItems: MenuItem[] = [
    {
      title: 'Settings',
      icon: '/assets/sidebar-icons/settings.svg',
      route: '/settings'
    },
    {
      title: 'Logout',
      icon: '/assets/sidebar-icons/logout.svg',
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
    this.router.navigate([route]).catch(error => {
      console.warn('Navigation to route failed:', route, error);
    }).finally(() => {
      if (this.isMobile()) {
        this.toggleSidebar.emit();
      }
    });
  }

  isMenuItemActive(item: MenuItem): boolean {
    return this.currentRoute === item.route;
  }

  isMobile(): boolean {
    return typeof window !== 'undefined' && window.innerWidth < 768;
  }
}