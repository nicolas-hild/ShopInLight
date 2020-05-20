import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/order.service';
import { AuthService } from 'src/app/auth.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnDestroy {
  orders;
  orderSubscription: Subscription;
  userSubscription: Subscription;

  constructor(private orderService: OrderService, private authService: AuthService) { 
    this.orderSubscription = this.orderService.getOrders().subscribe(orders => this.orders = orders);
  }

  ngOnDestroy() {
    this.orderSubscription.unsubscribe();
  }

}
