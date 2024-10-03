// _service/category.service.ts

import { Injectable } from '@angular/core';
import { Category } from '../_model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categories: Category[] = [];

  constructor() { }

  getCategories(): Category[] {
    return this.categories;
  }

  addCategory(category: Category): void {
    // Asignar un ID único si es necesario
    category.category_id = this.categories.length + 1;
    this.categories.push(category);
  }
}
