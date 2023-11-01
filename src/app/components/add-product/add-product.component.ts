import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Modal } from 'bootstrap';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  product: Product | null = null;
  categories: Category[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  productForm: FormGroup = this.fb.group({
    name: [''],
    category_id: [''], 
    quantity: [''],
    price: [''],
    phone: [false],
    connectedWatch: [false],
    accessory: [false],
  });

  ngOnInit(): void {
   
    this.categoryService.getCategory().subscribe((categories) => {
      this.categories = categories;
    });
  }

  onSubmit() {
    

    const newProduct: Product = this.productForm.value; 
    newProduct.category_id = Number(newProduct.category_id); 
  

    this.productService.createProduct(newProduct).subscribe(() => {
    
      const submissionModalElement = document.getElementById(
        'submissionModal'
      ) as HTMLElement;
      const submissionModal = new Modal(submissionModalElement);
      submissionModal.show();
      this.productForm.reset();
    });
  }
}
