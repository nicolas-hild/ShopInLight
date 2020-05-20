import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from '../order.service';
import { AuthService } from '../auth.service';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnDestroy {
  orders;
  subscription: Subscription;

  constructor(private orderService: OrderService, private authService: AuthService) { 
    this.subscription = authService.user$.pipe(switchMap(u => this.orderService.getOrdersByUser(u.uid))).subscribe(orders => this.orders = orders);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
