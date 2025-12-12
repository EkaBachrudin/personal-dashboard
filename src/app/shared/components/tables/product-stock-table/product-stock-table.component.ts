import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductStockItem } from '../../../../types';

@Component({
  selector: 'app-product-stock-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-stock-table.component.html',
  styleUrl: './product-stock-table.component.scss'
})
export class ProductStockTableComponent {
  @Input() data: ProductStockItem[] = [];
  @Output() editProduct = new EventEmitter<ProductStockItem>();
  @Output() deleteProduct = new EventEmitter<string>();

  onEditProduct(item: ProductStockItem): void {
    this.editProduct.emit(item);
  }

  onDeleteProduct(id: string): void {
    this.deleteProduct.emit(id);
  }
}