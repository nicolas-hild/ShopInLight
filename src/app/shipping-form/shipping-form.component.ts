import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { OrderService } from '../order.service';
import { Order } from '../models/order';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.scss']
})
export class ShippingFormComponent implements OnInit {
  
  @Input('cart') cart:ShoppingCart;

  shipping = {name: "", addressLine1: "", addressLine2: "", postCode: "", city: ""};
  userId: string;
  userSubcription: Subscription;


  constructor(
    private orderService: OrderService, 
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.userSubcription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }
  
  ngOnDestroy() {
    this.userSubcription.unsubscribe();
  }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }


}
