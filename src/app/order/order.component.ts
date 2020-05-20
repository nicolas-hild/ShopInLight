import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { OrderService } from '../order.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  order = { datePlaced: "", items: [], shipping: {}, totalPrice: "", userid: "" };

  constructor(private route: ActivatedRoute, private orderService: OrderService, private db: AngularFireDatabase) { 
  }
  
  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.getOrder(id);
  }

  getOrder(id) {
    this.orderService.getOrder(id).pipe(take(1)).subscribe(order => this.order = order);
  }
}
