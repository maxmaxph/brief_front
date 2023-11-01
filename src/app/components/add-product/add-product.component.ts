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
    category_id: [''], // Assurez-vous que ceci est présent
    quantity: [''],
    price: [''],
    phone: [false],
    connectedWatch: [false],
    accessory: [false],
  });

  ngOnInit(): void {
    // Récupération des catégories
    this.categoryService.getCategory().subscribe((categories) => {
      this.categories = categories;
    });
  }

  onSubmit() {
    // Envoi du formulaire de création

    const newProduct: Product = this.productForm.value; // On récupère les données du formulaire
    newProduct.category_id = Number(newProduct.category_id); // On convertit l'id de la catégorie en nombre
    console.log(newProduct);

    this.productService.createProduct(newProduct).subscribe(() => {
      console.log('mise à jour effectuée');
      const submissionModalElement = document.getElementById(
        'submissionModal'
      ) as HTMLElement;
      const submissionModal = new Modal(submissionModalElement);
      submissionModal.show();
      this.productForm.reset(); // Reset le formulaire si nécessaire
    });
  }
}
