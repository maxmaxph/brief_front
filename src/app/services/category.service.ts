import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from '../models/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  url: string = 'http://localhost:3000/api/categories';

  constructor(private http: HttpClient) {}

  private getHttpOptions() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  getCategory() {
    return this.http.get<Category[]>(this.url, this.getHttpOptions());
  }

  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.url}/${id}`, this.getHttpOptions());
  }

  createCategory(newCategory: Category): Observable<Category> {
    return this.http.post<Category>(
      this.url,
      newCategory,
      this.getHttpOptions()
    );
  }

  deleteCategory(id: number): Observable<Category> {
    return this.http.delete<Category>(
      `${this.url}/${id}`,
      this.getHttpOptions()
    );
  }


}
