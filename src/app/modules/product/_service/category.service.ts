// _service/category.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Importar HttpClient para hacer las solicitudes HTTP
import { Observable } from 'rxjs';
import { Category } from '../_model/category';
import { api_dwb_uri } from '../../../shared/api-dwb-uri';

@Injectable({
  providedIn: 'root'
})

export class CategoryService{
  private source = "/category";

  constructor(private http: HttpClient) { }

  // Método para obtener todas las categorías
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.source}/getCategories`);
  }

  // Método para obtener una categoría por ID
  getCategory(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.source}/${id}`);
  }

  // Método para obtener las categorías activas
  getActiveCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.source}/active`);
  }

  // Método para crear una nueva categoría
  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.source}`, category);
  }

  // Método para actualizar una categoría existente
  updateCategory(id: number, category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.source}/${id}`, category);
  }

  // Método para eliminar (desactivar) una categoría
  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.source}/${id}`);
  }

  // Método para activar una categoría
  activateCategory(id: number): Observable<Category> {
    return this.http.put<Category>(`${this.source}/${id}/activate`, null);
  }
}
