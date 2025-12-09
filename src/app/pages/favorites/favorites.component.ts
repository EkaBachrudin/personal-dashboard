import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../../shared/lib/card';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../products/product-card/product-card.component';
import { productList } from '../products/products.data';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CardComponent, CommonModule, ProductCardComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent implements OnInit {
  favoriteItems: any[] = [];

  ngOnInit(): void {
    // Load favorite items - this could be from a service or local storage
    this.loadFavorites();
  }

  products = productList;

  private loadFavorites(): void {
    // Mock favorite items data
    this.favoriteItems = [
      {
        id: 1,
        title: 'Apple Watch Series 8',
        description: 'Advanced health features and powerful fitness tracking',
        price: '$399',
        image: '/assets/products/watch-image.png',
        category: 'Electronics',
        dateAdded: '2024-01-15'
      },
      {
        id: 2,
        title: 'Premium Headphones',
        description: 'Noise-cancelling wireless headphones with premium sound',
        price: '$249',
        image: '/assets/products/watch-image2.png',
        category: 'Audio',
        dateAdded: '2024-01-12'
      },
      {
        id: 3,
        title: 'Smart Home Hub',
        description: 'Control all your smart devices from one central hub',
        price: '$179',
        image: '/assets/products/watch-image.png',
        category: 'Smart Home',
        dateAdded: '2024-01-10'
      }
    ];
  }

  removeFromFavorites(item: any): void {
    this.favoriteItems = this.favoriteItems.filter(fav => fav.id !== item.id);
    // Here you would also update your storage or service
  }

  clearAllFavorites(): void {
    this.favoriteItems = [];
    // Here you would also clear your storage or service
  }

  getUniqueCategories(): string[] {
    const categories = this.favoriteItems.map(item => item.category);
    return [...new Set(categories)];
  }

  getTotalValue(): number {
    return this.favoriteItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace('$', ''));
      return total + price;
    }, 0);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  }

  handleImageError(event: any): void {
    event.target.src = '/assets/images/placeholder.png'; // Fallback image
  }
}