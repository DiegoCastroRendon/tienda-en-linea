import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // Asegúrate de importar CommonModule
import { CategoryService } from '../../_service/category.service';
import { Category } from '../../_model/category';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  standalone: true,  // Componente autónomo
  imports: [CommonModule]  // Importa CommonModule para poder usar *ngFor
})
//export class CategoryComponent implements OnInit {
// categories: Category[] = [];

//  constructor(private categoryService: CategoryService) {}

  // Método que llama al servicio para obtener las categorías
//  getCategories(): void {
//    this.categories = this.categoryService.getCategories();
//  }

  // Ejecuta el método getCategories cuando el componente se inicializa
//  ngOnInit(): void {
//    this.getCategories();
//  }
//}

declare var $: any;

export class CategoryComponent implements OnInit {
  categoryForm: FormGroup;

  constructor() {
    this.categoryForm = new FormGroup({
      category: new FormControl('', [Validators.required]),
      tag: new FormControl('', [Validators.required])
    });
  }

  // Método para abrir el modal 
  openModal() {
    $('#categoryModal').modal('show');
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      // Mostramos mensaje de éxito con SweetAlert
      Swal.fire('Éxito', 'Categoría añadida correctamente', 'success');
    } else {
      // Mostramos errores en los campos
      Swal.fire('Error', 'Por favor completa todos los campos', 'error');
    }
  }
}