import { Component, inject, Inject } from '@angular/core';
import { HeroeServiceService } from '../../services/heroe-service.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-heroe-list',
  imports: [FormsModule],
  templateUrl: './heroe-list.component.html',
  styleUrl: './heroe-list.component.css'
})
export class HeroeListComponent {
  listadoHeroes: any[] = [];
  nombreHeroe: string = '';
  poderHeroe: string = '';
  universoHeroe: string = '';
  debilidadHeroe: string = '';

  // Inyección del servicio en el constructor
  constructor(private heroeService: HeroeServiceService) {
    this.CargarHeroes(); // Cargar los héroes al inicializar el componente
  }

  // Método para cargar los héroes
  CargarHeroes() {
    this.heroeService.getAllHeroes().subscribe(
      (data) => {
        this.listadoHeroes = data; // Asignamos los héroes
        console.info('Héroes cargados:', data);
        console.log('Héroes en la variable heroes:', this.listadoHeroes);  // Verifica la variable
      },
      (error) => {
        console.error("Error al cargar los héroes", error);
        this.listadoHeroes = []; // Limpiar en caso de error
      }
    );
  }

  // Método para eliminar un héroe
  EliminarHeroe(id: number) {
    this.heroeService.deleteHeroe(id).subscribe(
      () => {
        this.CargarHeroes(); // Recargar la lista de héroes después de eliminar
      },
      (error) => {
        console.error("Error al eliminar el héroe", error);
      }
    );
  }

  // Método para crear un nuevo héroe
  CrearHeroe() {
    if (this.nombreHeroe === '' || this.poderHeroe === '' || this.universoHeroe === '' || this.debilidadHeroe === '') {
      alert("Por favor, ingrese todos los campos.");
      return;
    }

    const heroe = {
      id: 0,
      nombre: this.nombreHeroe,
      poder: this.poderHeroe,
      universo: this.universoHeroe,
      debilidad: this.debilidadHeroe,
      urlImagen: 'https://www.google.com/images/imagenesHeroes' // Asegúrate de que esta URL sea válida
    };

    // Llamamos al servicio para crear el héroe
    this.heroeService.postHeroe(heroe).subscribe(
      (data) => {
        console.info("Héroe creado:", data);
        alert("Héroe creado exitosamente");
        this.CargarHeroes(); // Recargar los héroes
      },
      (error) => {
        console.error("Error al crear el héroe", error);
        alert("Hubo un error al crear el héroe. Intente nuevamente.");
      }
    );
  }


  // Método para actualizar un héroe
  ActualizarHeroe(id: number) {
    if (this.nombreHeroe === '' || this.poderHeroe === '' || this.universoHeroe === '' || this.debilidadHeroe === '') {
      alert("Por favor, ingrese todos los campos.");
      return;
    }

    const heroeActualizado = {
      id: id,  // El id se pasa como parámetro para identificar al héroe a actualizar
      nombre: this.nombreHeroe,
      poder: this.poderHeroe,
      universo: this.universoHeroe,
      debilidad: this.debilidadHeroe,
      urlImagen: 'https://www.google.com/images/imagenesHeroes' // Asegúrate de que esta URL sea válida
    };

    // Llamamos al servicio para actualizar el héroe
    this.heroeService.putHeroe(id, heroeActualizado).subscribe(
      (data) => {
        console.info("Héroe actualizado:", data);
        alert("Héroe actualizado exitosamente");
        this.CargarHeroes(); // Recargar los héroes después de la actualización
      },
      (error) => {
        console.error("Error al actualizar el héroe", error);
        alert("Hubo un error al actualizar el héroe. Intente nuevamente.");
      }
    );
  }



}
