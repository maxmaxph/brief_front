import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  url: string = 'http://localhost:3000/api/products';

  constructor(private http: HttpClient) {}

  private getHttpOptions() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  getProduct() {
    return this.http.get<Product[]>(this.url);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.url}/${id}`);
  }

  createProduct(newProduct: Product): Observable<Product> {
    return this.http.post<Product>(this.url, newProduct, this.getHttpOptions());
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(
      `${this.url}/${id}`,
      this.getHttpOptions()
    );
  }

  updateProduct(updatedProduct: Product): Observable<Product> {
    return this.http.patch<Product>(
      `${this.url}/${updatedProduct.id}`,
      updatedProduct,
      this.getHttpOptions()
    );
  }
}
