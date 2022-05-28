import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../service/api.service';
import { CartService } from './../../service/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public allProducts: any;
  public filterProducts: any;
  public isLoading: boolean = true;
  public searchKey: string = '';
  constructor(private api: ApiService, private cartService: CartService) {}

  ngOnInit(): void {
    this.api.getProducts().subscribe((res) => {
      this.isLoading = false;
      this.allProducts = res;
      this.filterProducts = res;
      this.allProducts.forEach((item: any) => {
        if (
          item.category === "men's clothing" ||
          item.category === "women's clothing"
        ) {
          item.category = 'fashion';
        }
        Object.assign(item, { quantity: 1, total: item.price });
      });
    });
    this.cartService.search.subscribe((val: any) => {
      this.searchKey = val;
    });
  }
  addToCart(item: any) {
    this.cartService.addToCart(item);
  }
  categoryProducts(category: string) {
    this.filterProducts = this.allProducts.filter((item: any) => {
      if (item.category == category || category == '') {
        return item;
      }
    });
  }
}
