import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { Subscription } from 'rxjs';
import { OrderService } from '../order.service';
import { AuthService } from '../auth.service';
import { Order } from '../models/order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  shipping = {name: "", addressLine1: "", addressLine2: "", postCode: "", city: ""};
  cart: ShoppingCart;
  userId: string;
  cartSubcription: Subscription;
  userSubcription: Subscription;

  constructor(
    private shoppingCartService: ShoppingCartService, 
    private orderService: OrderService, 
    private authService: AuthService,
    private router: Router) { }

  async ngOnInit() {
    let cart$ = await this.shoppingCartService.getCart();
    this.cartSubcription = cart$.subscribe(cart => this.cart = cart);

    this.userSubcription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }

  ngOnDestroy() {
    this.cartSubcription.unsubscribe();
    this.userSubcription.unsubscribe();
  }

}
