import { Component, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnDestroy {
  products: Product[];
  filteredProducts: Product[];
  subscription: Subscription;
  columnSort: string = "title";


  constructor(private productService: ProductService, private router: Router) {
    this.subscription = this.productService.getAll().subscribe(products => this.filteredProducts = this.products = products);
  }


  filter(query: string) {
    this.filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) : this.products;
  }

  delete(id) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer le produit ?')) return;
    
    this.productService.delete(id);
    this.router.navigate(['admin/products'])
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
