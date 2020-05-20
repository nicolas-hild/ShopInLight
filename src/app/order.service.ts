import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ShoppingCartService } from './shopping-cart.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase, private shoppingCartService: ShoppingCartService) { }

  async placeOrder(order) {
    let result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrders() {
    return this.db.list('/orders').snapshotChanges().pipe(map(orders => orders.map(this.returnOrders)));
  }

  getOrder(orderId: string) {
    return this.db.object('/orders/' + orderId).snapshotChanges().pipe(map(this.returnOrders));
  }

  getOrdersByUser(userId: string) {
    return this.db.list('/orders', ref => ref.orderByChild('userId').equalTo(userId)).snapshotChanges().pipe(map(order => order.map(this.returnOrders)));
  }

  private returnOrders = item => {
    const order = item.payload.val();
    order.id = item.key;
    return order;
  }
}
