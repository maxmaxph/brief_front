import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  @Input()
  products: Product[] = [];
  categories: Category[] = [];
  isModalVisible: boolean = false;
  deletedEntityType: string = '';

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.productService
      .getProduct()
      .subscribe((products) => (this.products = products));

    this.categoryService
      .getCategory()
      .subscribe((categories) => (this.categories = categories));
  }
}
