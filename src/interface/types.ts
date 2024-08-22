export interface Customer {
  customer_id?: string;
  name: string;
  email: string;
  phone: string;
}

export interface Product {
  product_id: string;
  name: string;
  price: number;
  id?: string;
}

export interface Order {
  order_id: string;
  customer_id: string;
  date: string;
  products: string[];
}

export interface Item {
  id: string;
  product_id: string;
  name: string;
  price: number;
}
