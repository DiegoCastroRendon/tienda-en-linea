import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // Asegúrate de importar CommonModule
import { CategoryService } from '../../_service/category.service';
import { Category } from '../../_model/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  standalone: true,  // Componente autónomo
  imports: [CommonModule]  // Importa CommonModule para poder usar *ngFor
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];

  constructor(private categoryService: CategoryService) {}

  // Método que llama al servicio para obtener las categorías
  getCategories(): void {
    this.categories = this.categoryService.getCategories();
  }

  // Ejecuta el método getCategories cuando el componente se inicializa
  ngOnInit(): void {
    this.getCategories();
  }
}
