import { OrderDataTable } from '../../types';

export const ORDER_DATA: OrderDataTable[] = [
  {
    id: '00',
    name: 'John Doe',
    address: '123 Main St, New York, NY 10001',
    date: '2024-01-15',
    type: 'Purchase',
    status: 'Complete'
  },
  {
    id: '00',
    name: 'Jane Smith',
    address: '456 Oak Ave, Los Angeles, CA 90001',
    date: '2024-01-16',
    type: 'Rental',
    status: 'Processing'
  },
  {
    id: '00',
    name: 'Mike Johnson',
    address: '789 Pine Rd, Chicago, IL 60601',
    date: '2024-01-17',
    type: 'Purchase',
    status: 'Rejected'
  },
  {
    id: '00',
    name: 'Sarah Williams',
    address: '321 Elm St, Houston, TX 77001',
    date: '2024-01-18',
    type: 'Rental',
    status: 'On Hold'
  },
  {
    id: '00',
    name: 'David Brown',
    address: '654 Cedar Ln, Phoenix, AZ 85001',
    date: '2024-01-19',
    type: 'Purchase',
    status: 'In Transit'
  },
  {
    id: '00',
    name: 'Emily Davis',
    address: '987 Birch Way, Philadelphia, PA 19101',
    date: '2024-01-20',
    type: 'Rental',
    status: 'Complete'
  },
  {
    id: '00',
    name: 'Robert Wilson',
    address: '147 Maple Dr, San Antonio, TX 78201',
    date: '2024-01-21',
    type: 'Purchase',
    status: 'Processing'
  },
  {
    id: '00',
    name: 'Lisa Anderson',
    address: '258 Spruce Ct, San Diego, CA 92101',
    date: '2024-01-22',
    type: 'Rental',
    status: 'In Transit'
  }
];

export const TABLE_HEADERS = {
  id: 'ID',
  name: 'Name',
  address: 'Address',
  date: 'Date',
  type: 'Type',
  status: 'Status'
} as const;