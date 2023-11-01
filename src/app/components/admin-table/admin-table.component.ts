import { Component, Input, LOCALE_ID, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin-table',
  templateUrl: './admin-table.component.html',
  styleUrls: ['./admin-table.component.css'],
  providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
})
export class AdminTableComponent implements OnInit {
  @Input()
  products: Product[] = [];
  categories: Category[] = [];
  isModalVisible: boolean = false;
  deletedEntityType: string = '';

  constructor(private productService: ProductService, private categoryService: CategoryService, private router: Router) {}

  ngOnInit(): void {
    this.productService
      .getProduct()
      .subscribe((products) => (this.products = products));
    
    this.categoryService.getCategory().subscribe((categories) => (this.categories = categories));
          }
  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(() => {

      this.deletedEntityType = 'product';
      this.isModalVisible = true; //Afffiche la modal
      this.products = this.products.filter((product) => product.id !== id);
    });
  }
 
  showModal() {
    this.isModalVisible = true;
  }


  closeModal() {
    this.isModalVisible = false;
  }

  //méthode pour naviguer vers le store edit
  navigateToEdit(productID: number) {
    this.router.navigate(['/edit', productID]);
  }
}
