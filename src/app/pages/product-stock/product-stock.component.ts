import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from '../../shared/lib/pagination/pagination.component';
import { ProductStockTableComponent } from '../../shared/components/tables/product-stock-table/product-stock-table.component';
import { allStockData } from './product-stok.data';
import { ProductStockItem } from '../../types';

@Component({
  selector: 'app-product-stock',
  standalone: true,
  imports: [CommonModule, FormsModule, PaginationComponent, ProductStockTableComponent],
  templateUrl: './product-stock.component.html',
  styleUrl: './product-stock.component.scss'
})
export class ProductStockComponent {
  // Sample data with more items for pagination demonstration
  allStockData = allStockData;
  filteredData = allStockData;

  // Search properties
  searchTerm: string = '';

  // Pagination properties
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor() { }

  // Computed property for total filtered items
  get totalItems(): number {
    return this.filteredData.length;
  }

  // Computed property for paginated data
  get paginatedData(): ProductStockItem[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredData.slice(startIndex, endIndex);
  }

  // Search functionality
  onSearchChange(): void {
    this.filterProducts();
    this.resetPagination();
  }

  private filterProducts(): void {
    if (!this.searchTerm.trim()) {
      this.filteredData = [...this.allStockData];
      return;
    }

    const searchTermLower = this.searchTerm.toLowerCase().trim();

    this.filteredData = this.allStockData.filter(item =>
      item.productName.toLowerCase().includes(searchTermLower) ||
      item.category.toLowerCase().includes(searchTermLower) ||
      item.price.toString().includes(searchTermLower) ||
      item.piece.toString().includes(searchTermLower)
    );
  }

  private resetPagination(): void {
    this.currentPage = 1;
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