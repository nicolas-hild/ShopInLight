import { Component, Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input('product') product: Product;
  @Input('shoppingCart') shoppingCart: ShoppingCart;
  @Input('showActions') showActions = true;

  constructor(private cartService: ShoppingCartService) { }


  addToCart() {
    this.cartService.addToCart(this.product);
  }

}
