import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Product } from './models/product';
import { take, map } from 'rxjs/operators'
import { ShoppingCart } from './models/shopping-cart';
import { Observable } from 'rxjs';
import { ShoppingCartItem } from './models/shopping-cart-item';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/'+ cartId +'/items').remove();
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object("/shopping-carts/" + cartId)
      .valueChanges().pipe(map((cart: any) => new ShoppingCart((cart) ? cart.items : {})));
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;
    
    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private getItem(cartId: string, productId: string): AngularFireObject<any> {
    return this.db.object("/shopping-carts/" + cartId + '/items/' + productId);
  }

  addToCart(product: Product) {
    this.updateItemQuantity(product, 1)
  }

  removeFromCart(product: Product) {
    this.updateItemQuantity(product, -1)
  }

  private async updateItemQuantity(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$: AngularFireObject<any> = this.getItem(cartId, product.id)
    item$.valueChanges().pipe(take(1)).subscribe(item => {
      let quantity = (item?.quantity || 0) + change;

      if (quantity === 0) item$.remove();
      else item$.update({ product: product, quantity:  quantity });
    });
  }
}
