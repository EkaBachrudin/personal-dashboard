// Common types used across the application
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

export interface DealDetail {
  id: string;
  productName: string;
  location: string;
  date: string;
  time: string;
  pieces: number;
  amount: number;
  status: 'delivered' | 'pending' | 'rejected';
}

export type DealStatus = DealDetail['status'];

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: Date;
  deliveryDate?: Date;
  shippingAddress: Address;
  billingAddress: Address;
  notes?: string;
}

export interface OrderItem {
  id: string;
  productName: string;
  sku: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export type OrderStatus = Order['status'];

export interface OrderDataTable {
  id: string;
  name: string;
  address: string;
  date: string;
  type: 'Purchase' | 'Rental';
  status: 'Complete' | 'Processing' | 'Rejected' | 'On Hold' | 'In Transit';
}

export interface ColorOption {
  hex: string;
  name: string;
}

export interface ProductStockItem {
  id: string;
  image: string;
  productName: string;
  category: string;
  price: number;
  piece: number;
  availableColors: ColorOption[];
}