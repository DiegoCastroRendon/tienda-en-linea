import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // Asegúrate de importar CommonModule
import { CategoryService } from '../../_service/category.service';
import { Category } from '../../_model/category';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  standalone: true,  // Componente autónomo
  imports: [
    CommonModule,
    ReactiveFormsModule  // Importa ReactiveFormsModule para usar formularios reactivos
  ]
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  categoryForm: FormGroup;
  showModal: boolean = false; // Controla la visibilidad del modal sin jQuery

  constructor(private categoryService: CategoryService) {
    this.categoryForm = new FormGroup({
      category: new FormControl('', [Validators.required]),
      tag: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.getCategories();
  }

  // Método que llama al servicio para obtener las categorías
  getCategories(): void {
    this.categories = this.categoryService.getCategories();
  }

  // Método para abrir el modal sin jQuery
  openModal() {
    this.showModal = true;
  }

  // Método para cerrar el modal
  closeModal() {
    this.showModal = false;
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      // Creamos una nueva categoría con los datos del formulario
      const newCategory: Category = {
        category_id: 0, // Puedes asignar 0 o manejar el ID según tu lógica
        category: this.categoryForm.value.category,
        tag: this.categoryForm.value.tag,
        status: true // Asigna el valor apropiado
      };
  
      // Llamamos al servicio para agregar la categoría
      this.categoryService.addCategory(newCategory);
  
      // Mostramos mensaje de éxito con SweetAlert
      Swal.fire('Éxito', 'Categoría añadida correctamente', 'success');
  
      // Reiniciamos el formulario
      this.categoryForm.reset();
  
      // Actualizamos la lista de categorías
      this.getCategories();
  
      // Cerramos el modal
      this.closeModal();
    } else {
      // Mostramos errores en los campos
      Swal.fire('Error', 'Por favor completa todos los campos', 'error');
    }
  }
  
}
