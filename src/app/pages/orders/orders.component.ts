import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ORDER_DATA, TABLE_HEADERS } from './order.data';
import { OrderDataTable } from '../../types';
import { FloatingDropdownComponent } from '../../shared/lib/floating-dropdown';
import { DatePickerComponent } from "../../shared/lib/date-picker";

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, FloatingDropdownComponent, DatePickerComponent],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orderData: OrderDataTable[] = ORDER_DATA;
  originalOrderData: OrderDataTable[] = ORDER_DATA; // Keep original data for filtering
  tableHeaders = TABLE_HEADERS;
  initialDate: Date = new Date();
  appliedDates: Date[] = [];
  showDateFilterDropdown = false;
  showOrderTypeFilterDropdown = false;
  showOrderStatusFilterDropdown = false;
  @ViewChild('dateFilterTrigger') dateFilterTrigger!: ElementRef;
  @ViewChild('orderTypeTrigger') orderTypeTrigger!: ElementRef;
  @ViewChild('orderStatusTrigger') orderStatusTrigger!: ElementRef;

  // Order Status Filter Properties
  availableOrderStatuses: string[] = ['Complete', 'Processing', 'Rejected', 'On Hold', 'In Transit'];
  selectedOrderStatuses: string[] = [];
  appliedOrderStatuses: string[] = [];

  ngOnInit() {
    // Initialize component with order data
  }

  onDateSelected(dates: Date[]): void {
    console.log('Selected dates:', dates);
  }

  onApplyDates(dates: Date[]): void {
    console.log('Applied dates:', dates);
    this.appliedDates = dates;
    // You can implement further logic here
  }

  get formattedAppliedDates(): string {
    if (this.appliedDates.length === 0) return '';

    const sortedDates = this.appliedDates.sort((a, b) => a.getTime() - b.getTime());
    return sortedDates.map(date =>
      date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    ).join(', ');
  }

  onDateFilterClick() {
    this.showDateFilterDropdown = true;
  }

  onDateFilterClose() {
    this.showDateFilterDropdown = false;
  }

  get dateFilterElement() {
    return this.dateFilterTrigger?.nativeElement;
  }

  onOrderTypeFilterClick() {
    this.showOrderTypeFilterDropdown = true;
  }

  onOrderTypeFilterClose() {
    this.showOrderTypeFilterDropdown = false;
  }

  get orderTypeFilterElement() {
    return this.orderTypeTrigger?.nativeElement;
  }

  onOrderStatusFilterClick() {
    this.showOrderStatusFilterDropdown = true;
  }

  onOrderStatusFilterClose() {
    this.showOrderStatusFilterDropdown = false;
  }

  get orderStatusFilterElement() {
    return this.orderStatusTrigger?.nativeElement;
  }

  // Order Status Filter Methods
  toggleOrderStatus(status: string): void {
    const index = this.selectedOrderStatuses.indexOf(status);
    if (index > -1) {
      // Remove status if already selected
      this.selectedOrderStatuses.splice(index, 1);
    } else {
      // Add status if not selected
      this.selectedOrderStatuses.push(status);
    }
  }

  applyOrderStatusFilter(): void {
    this.appliedOrderStatuses = [...this.selectedOrderStatuses];
    this.filterOrderData();
    this.onOrderTypeFilterClose(); // Close dropdown after applying
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

    // Apply date filter if dates are selected (you can extend this later)
    if (this.appliedDates.length > 0) {
      filteredData = filteredData.filter(order => {
        const orderDate = new Date(order.date);
        return this.appliedDates.some(selectedDate => {
          const selected = new Date(selectedDate);
          return orderDate.toDateString() === selected.toDateString();
        });
      });
    }

    this.orderData = filteredData;
  }

  // Method to reset all filters
  resetFilters(): void {
    this.appliedOrderStatuses = [];
    this.selectedOrderStatuses = [];
    this.appliedDates = [];
    this.orderData = [...this.originalOrderData];
  }
}