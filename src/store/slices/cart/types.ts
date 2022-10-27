export type CartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
};

export interface ICart {
  totalPrice: number;
  items: CartItem[];
  count: number;
}
