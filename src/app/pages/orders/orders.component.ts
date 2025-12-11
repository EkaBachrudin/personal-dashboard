import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ORDER_DATA, TABLE_HEADERS } from './order.data';
import { OrderDataTable } from '../../types';
import { FloatingDropdownComponent } from '../../shared/lib/floating-dropdown';
import { DatePickerComponent } from "../../shared/lib/date-picker";
import { CardComponent } from "../../shared/lib/card";

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, FloatingDropdownComponent, DatePickerComponent, CardComponent],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orderData: OrderDataTable[] = ORDER_DATA;
  tableHeaders = TABLE_HEADERS;
  initialDate: Date = new Date();
  appliedDates: Date[] = [];
  showDateFilterDropdown = false;
  @ViewChild('dateFilterTrigger') dateFilterTrigger!: ElementRef;

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
}