import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
  
  
export class ProductEditComponent implements OnInit {
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
    category_id: [''], // Assurez-vous que ceci est présent
    quantity: [''],
    price: [''],
    phone: [false],
    connectedWatch: [false],
    accessory: [false],
  });

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = Number(params['id']);
      this.productService.getProductById(id).subscribe((product) => {
        this.product = product;
        this.productForm.patchValue({
          ...product,
          category_id: product.category.id, // Définissez la valeur de category_id ici
        });
      });
    });

    this.categoryService.getCategory().subscribe((categories) => {
      this.categories = categories;
    });
  }

  onSubmit(): void {
    if (this.productForm.valid && this.product) {
      const updatedProduct: Product = {
        ...this.product,
        ...this.productForm.value,
      };
      this.productService.updateProduct(updatedProduct).subscribe(() => {
        console.log(updatedProduct);
        this.router.navigate(['/admin']); // redirige vers la page d'accueil ou une autre route après la mise à jour
      });
    }
  }
}