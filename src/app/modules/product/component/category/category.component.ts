import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryService } from '../../_service/category.service';
import { Category } from '../../_model/category';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  categoryForm: FormGroup;
  selectedCategory: Category | null = null;
  showModal: boolean = false;

  constructor(private categoryService: CategoryService) {
    this.categoryForm = new FormGroup({
      category: new FormControl('', [Validators.required]),
      tag: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.getCategories();
  }

  // Método que llama al servicio para obtener las categorías de la API
  getCategories(): void {
    this.categoryService.getCategories().subscribe(
      (categories: Category[]) => {
        this.categories = categories;
      },
      (error) => {
        Swal.fire('Error', 'No se pudieron cargar las categorías', 'error');
      }
    );
  }

  // Método para crear una nueva categoría usando la API
  onSubmit(): void {
    if (this.categoryForm.valid) {
      const newCategory: Category = {
        category_id: this.selectedCategory ? this.selectedCategory.category_id : 0, // Si hay una categoría seleccionada, es una actualización
        category: this.categoryForm.value.category,
        tag: this.categoryForm.value.tag,
        status: true
      };

      if (this.selectedCategory) {
        // Actualizar categoría existente
        this.categoryService.updateCategory(newCategory.category_id, newCategory).subscribe(
          (response: Category) => {
            Swal.fire('Éxito', 'Categoría actualizada correctamente', 'success');
            this.getCategories();
            this.closeModal();
          },
          (error) => {
            Swal.fire('Error', 'No se pudo actualizar la categoría', 'error');
          }
        );
      } else {
        // Crear nueva categoría
        this.categoryService.createCategory(newCategory).subscribe(
          (response: Category) => {
            Swal.fire('Éxito', 'Categoría añadida correctamente', 'success');
            this.getCategories();
            this.closeModal();
          },
          (error) => {
            Swal.fire('Error', 'No se pudo crear la categoría', 'error');
          }
        );
      }
    }
  }

  // Método para abrir el modal con una categoría seleccionada para actualizar
  openModalForUpdate(category: Category): void {
    this.selectedCategory = category;
    this.categoryForm.setValue({
      category: category.category,
      tag: category.tag
    });
    this.showModal = true;
  }

  // Método para desactivar una categoría
  deleteCategory(categoryId: number): void {
    this.categoryService.deleteCategory(categoryId).subscribe(
      () => {
        Swal.fire('Éxito', 'Categoría desactivada correctamente', 'success');
        this.getCategories();
      },
      (error) => {
        Swal.fire('Error', 'No se pudo desactivar la categoría', 'error');
      }
    );
  }

  // Método para activar una categoría
  activateCategory(categoryId: number): void {
    this.categoryService.activateCategory(categoryId).subscribe(
      (response: Category) => {
        Swal.fire('Éxito', 'Categoría activada correctamente', 'success');
        this.getCategories();
      },
      (error) => {
        Swal.fire('Error', 'No se pudo activar la categoría', 'error');
      }
    );
  }

  // Método para abrir el modal para agregar una nueva categoría
  openModal(): void {
    this.selectedCategory = null; // Reiniciar la categoría seleccionada
    this.categoryForm.reset();
    this.showModal = true;
  }

  // Método para cerrar el modal
  closeModal(): void {
    this.showModal = false;
    this.categoryForm.reset();
    this.selectedCategory = null;
  }
}
