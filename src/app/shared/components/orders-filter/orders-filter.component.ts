import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FloatingDropdownComponent } from '../../../shared/lib/floating-dropdown';
import { DatePickerComponent } from "../../../shared/lib/date-picker";

@Component({
  selector: 'app-orders-filter',
  standalone: true,
  imports: [CommonModule, FloatingDropdownComponent, DatePickerComponent],
  templateUrl: './orders-filter.component.html',
  styleUrls: ['./orders-filter.component.scss']
})
export class OrdersFilterComponent implements OnInit {
  @Input() initialDate: Date = new Date();
  @Input() availableOrderStatuses: string[] = ['Complete', 'Processing', 'Rejected', 'On Hold', 'In Transit'];
  @Input() availableOrderTypes: string[] = ['Purchase', 'Rental'];
  @Input() appliedDates: Date[] = [];
  @Input() appliedOrderStatuses: string[] = [];
  @Input() appliedOrderTypes: string[] = [];

  @Output() filterChanged = new EventEmitter<{
    dates: Date[];
    orderStatuses: string[];
    orderTypes: string[];
  }>();

  showDateFilterDropdown = false;
  showOrderTypeFilterDropdown = false;
  showOrderStatusFilterDropdown = false;

  @ViewChild('dateFilterTrigger') dateFilterTrigger!: ElementRef;
  @ViewChild('orderTypeTrigger') orderTypeTrigger!: ElementRef;
  @ViewChild('orderStatusTrigger') orderStatusTrigger!: ElementRef;

  selectedOrderStatuses: string[] = [];
  selectedOrderTypes: string[] = [];
  selectedDates: Date[] = [];

  ngOnInit() {
    // Initialize selected values with applied values
    this.selectedOrderStatuses = [...this.appliedOrderStatuses];
    this.selectedOrderTypes = [...this.appliedOrderTypes];
    this.selectedDates = [...this.appliedDates];
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

  onDateSelected(dates: Date[]): void {
    console.log('Selected dates:', dates);
  }

  onApplyDates(dates: Date[]): void {
    console.log('Applied dates:', dates);
    this.selectedDates = dates;
    this.emitFilterChange();
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

  toggleOrderStatus(status: string): void {
    const index = this.selectedOrderStatuses.indexOf(status);
    if (index > -1) {
      this.selectedOrderStatuses.splice(index, 1);
    } else {
      this.selectedOrderStatuses.push(status);
    }
  }

  applyOrderStatusFilter(): void {
    this.emitFilterChange();
    this.onOrderStatusFilterClose();
  }

  toggleOrderType(type: string): void {
    const index = this.selectedOrderTypes.indexOf(type);
    if (index > -1) {
      this.selectedOrderTypes.splice(index, 1);
    } else {
      this.selectedOrderTypes.push(type);
    }
  }

  applyOrderTypeFilter(): void {
    this.emitFilterChange();
    this.onOrderTypeFilterClose();
  }

  resetFilters(): void {
    this.selectedOrderStatuses = [];
    this.selectedOrderTypes = [];
    this.selectedDates = [];
    this.emitFilterChange();
  }

  private emitFilterChange(): void {
    this.filterChanged.emit({
      dates: [...this.selectedDates],
      orderStatuses: [...this.selectedOrderStatuses],
      orderTypes: [...this.selectedOrderTypes]
    });
  }
}