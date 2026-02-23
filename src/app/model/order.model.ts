export interface Order {
  id?: number;
  country: string;
  city: string;
  address: string;
  totalAmount: number;
  items: OrderItem[];
}

export interface OrderItem {
  id?: number;
  bookId: number;
  quantity: number;
  amount: number;
}
