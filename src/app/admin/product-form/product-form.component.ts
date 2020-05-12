import { Component } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators'

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {
  categories$;
  product = {};
  id;

  constructor(
    private categoryService: CategoryService, 
    private productService: ProductService, 
    private router: Router,
    private route: ActivatedRoute) {

    this.categories$ = this.categoryService.getCategories();
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) this.productService.getProduct(this.id).valueChanges().pipe(take(1)).subscribe(p => this.product = p);
  }

  save(product) {
    if (this.id) this.productService.update(this.id, product)
    else this.productService.create(product);

    this.router.navigate(['admin/products'])
  }

  delete() {
    if (!confirm('Êtes-vous sûr de vouloir supprimer le produit ?')) return;
    
    this.productService.delete(this.id);
    this.router.navigate(['admin/products'])

  }

}
