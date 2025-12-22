import { Component, OnInit } from '@angular/core';

import { ORDER_DATA, TABLE_HEADERS } from './order.data';
import { OrderDataTable } from '../../types';
import { PaginationComponent } from '../../shared/lib/pagination';
import { OrdersTableComponent } from '../../shared/components/tables/orders-table/orders-table.component';
import { OrdersFilterComponent } from '../../shared/components/orders-filter/orders-filter.component';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [PaginationComponent, OrdersTableComponent, OrdersFilterComponent],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orderData: OrderDataTable[] = ORDER_DATA;
  originalOrderData: OrderDataTable[] = ORDER_DATA; // Keep original data for filtering
  filteredOrderData: OrderDataTable[] = ORDER_DATA; // Data after filtering, before pagination
  tableHeaders = TABLE_HEADERS;
  initialDate: Date = new Date();

  // Pagination properties
  currentPage: number = 1;
  itemsPerPage: number = 9;

  // Order Status Filter Properties
  availableOrderStatuses: string[] = ['Complete', 'Processing', 'Rejected', 'On Hold', 'In Transit'];
  appliedOrderStatuses: string[] = [];

  // Order Type Filter Properties
  availableOrderTypes: string[] = ['Purchase', 'Rental'];
  appliedOrderTypes: string[] = [];

  // Date Filter Properties
  appliedDates: Date[] = [];

  ngOnInit() {
    // Initialize component with order data
    this.updatePaginatedData();
  }

  get totalItems(): number {
    return this.filteredOrderData.length;
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  onPageChanged(page: number): void {
    this.currentPage = page;
    this.updatePaginatedData();
  }

  private updatePaginatedData(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.orderData = this.filteredOrderData.slice(startIndex, endIndex);
  }

  // Filter change handler from orders-filter component
  onFilterChanged(filterData: {
    dates: Date[];
    orderStatuses: string[];
    orderTypes: string[];
  }): void {
    // Update applied filter values
    this.appliedDates = filterData.dates;
    this.appliedOrderStatuses = filterData.orderStatuses;
    this.appliedOrderTypes = filterData.orderTypes;

    // Filter the order data
    this.filterOrderData();
  }

  filterOrderData(): void {
    // Start with original data
    let filteredData = [...this.originalOrderData];

    // Apply order status filter if statuses are selected
    if (this.appliedOrderStatuses.length > 0) {
      filteredData = filteredData.filter(order =>
        this.appliedOrderStatuses.includes(order.status)
      );
    }

    // Apply order type filter if types are selected
    if (this.appliedOrderTypes.length > 0) {
      filteredData = filteredData.filter(order =>
        this.appliedOrderTypes.includes(order.type)
      );
    }

    // Apply date filter if dates are selected
    if (this.appliedDates.length > 0) {
      filteredData = filteredData.filter(order => {
        const orderDate = new Date(order.date);
        return this.appliedDates.some(selectedDate => {
          const selected = new Date(selectedDate);
          return orderDate.toDateString() === selected.toDateString();
        });
      });
    }

    // Update filtered data and reset to first page
    this.filteredOrderData = filteredData;
    this.currentPage = 1;
    this.updatePaginatedData();
  }
}