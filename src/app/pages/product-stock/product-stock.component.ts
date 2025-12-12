import { Component } from '@angular/core';
import { PaginationComponent } from '../../shared/lib/pagination/pagination.component';
import { allStockData } from './product-stok.data';
import { ProductStockItem } from '../../types';

@Component({
  selector: 'app-product-stock',
  standalone: true,
  imports: [PaginationComponent],
  templateUrl: './product-stock.component.html',
  styleUrl: './product-stock.component.scss'
})
export class ProductStockComponent {
  // Sample data with more items for pagination demonstration
 
  allStockData = allStockData;
  // Pagination properties
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = this.allStockData.length;

  constructor() { }

  // Computed property for paginated data
  get paginatedData(): ProductStockItem[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.allStockData.slice(startIndex, endIndex);
  }

  // Pagination event handler
  onPageChanged(page: number): void {
    this.currentPage = page;
  }

  editProduct(item: ProductStockItem): void {
    console.log('Edit product:', item);
    // TODO: Implement edit functionality
  }

  deleteProduct(id: string): void {
    console.log('Delete product:', id);
    // TODO: Implement delete functionality
  }
}