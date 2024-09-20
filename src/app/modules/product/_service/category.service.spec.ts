import { Injectable } from '@angular/core';
import { Category } from '../_model/category';  // Importa la clase Category

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }

  // Función que retorna un arreglo de objetos Category
  getCategories(): Category[] {
    // Declarar un arreglo de objetos 'Category'
    const categories: Category[] = [
      new Category(1, 'Electrónica', 'tech', true),
      new Category(2, 'Ropa', 'fashion', true),
      new Category(3, 'Alimentos', 'food', false)
    ];

    // Retornar el arreglo
    return categories;
  }
}
