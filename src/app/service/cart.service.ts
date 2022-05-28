import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartItemList: any = [];
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>('');

  constructor() {}
  getProduct() {
    return this.productList.asObservable();
  }
  setProduct(product: any) {
    this.cartItemList.push(...product);
    this.productList.next(product);
  }
  addToCart(product: any) {
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
  }
  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartItemList.map((item: any) => {
      grandTotal += item.total;
    });
    return grandTotal;
  }
  removeFromCart(product: any) {
    this.cartItemList.filter((item: any, index: number) => {
      if (product.id === item.id) {
        this.cartItemList.splice(index, 1);
      }
    });
  }
  emptyCart() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
  }
}
