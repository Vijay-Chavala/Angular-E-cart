import { Component, OnInit } from '@angular/core';
import { CartService } from './../../service/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public cartItems: any;
  public searchTerm: string = '';
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getProduct().subscribe((res) => (this.cartItems = res));
  }
  search(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.cartService.search.next(this.searchTerm);
  }
}
