import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDataTable } from '../../../../types';

interface TableHeaders {
  id: string;
  name: string;
  address: string;
  date: string;
  type: string;
  status: string;
}

@Component({
  selector: 'app-orders-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders-table.component.html',
  styleUrl: './orders-table.component.scss'
})
export class OrdersTableComponent {
  @Input() data: OrderDataTable[] = [];
  @Input() tableHeaders: TableHeaders = {
    id: '',
    name: '',
    address: '',
    date: '',
    type: '',
    status: ''
  };

  getStatusClass(status: string): string {
    return 'status-' + status.toLowerCase().replace(' ', '-');
  }
}