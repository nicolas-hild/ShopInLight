import { Component } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take, map } from 'rxjs/operators'
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {
  categories$;
  product: Product = {id: "", title: "", price: NaN, category: "", imageUrl: ""};
  id;

  constructor(
    private categoryService: CategoryService, 
    private productService: ProductService, 
    private router: Router,
    private route: ActivatedRoute) {

    this.categories$ = this.categoryService.getAll().pipe(map(products => products.map(this.returnCategories)));
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) this.productService.getProduct(this.id).valueChanges().pipe(take(1)).subscribe(p => this.product = p);
  }

  save(product) {
    if (this.id) this.productService.update(this.id, product)
    else this.productService.create(product);

    this.router.navigate(['admin/products'])
  }

  returnCategories = item => {
    const category = item.payload.val();
    category.id = item.key;
    return category;
  }

}
