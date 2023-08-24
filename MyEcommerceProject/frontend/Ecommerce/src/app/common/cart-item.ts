import { Flower } from './flower';

export class CartItem {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;

  constructor(flower: Flower) {
    this.id = flower.id;
    this.name = flower.name;
    this.imageUrl = flower.imageUrl;
    this.price = flower.price;
    this.quantity = 1;
  }
}
