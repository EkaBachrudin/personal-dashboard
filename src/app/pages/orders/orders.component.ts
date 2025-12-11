import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ORDER_DATA, TABLE_HEADERS } from './order.data';
import { OrderDataTable } from '../../types';
import { DatePickerComponent } from '../../shared/lib/date-picker';
import { CardComponent } from '../../shared/lib/card';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePickerComponent, CardComponent],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orderData: OrderDataTable[] = ORDER_DATA;
  tableHeaders = TABLE_HEADERS;
  initialDate: Date = new Date();
  appliedDates: Date[] = [];

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
}