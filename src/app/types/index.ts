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