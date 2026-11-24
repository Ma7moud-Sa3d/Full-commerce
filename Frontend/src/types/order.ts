export interface OrderItem {
  _id: string;
  productTitle: string;
  productImage: string;
  productPrice: number;
  quantity: number;
}

export interface Order {
  _id: string;
  orderItems: OrderItem[];
  totla: number; // matches the spelling in your API
  address: string;
  userId: string;
}