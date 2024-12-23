import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Heroe } from '../data/heroe-entity';
import { Heroes } from '../data/heroe-entity';

@Injectable({
  providedIn: 'root'
})
export class HeroeServiceService {

  urlApi = "http://localhost:8080/api/v1/heroes"

  constructor(private httpCliente: HttpClient) { }

  // Metodos Http
  // GET
  getAllHeroes(): Observable<Heroes> {
    return this.httpCliente.get<Heroes>(this.urlApi);
  }
  //GET ID
  getHeroe(id: number): Observable<Heroe> {
    return this.httpCliente.get<Heroe>(this.urlApi + "/" + id)
  }
  //POST
  postHeroe(heroe: any): Observable<Heroe> {
    return this.httpCliente.post<Heroe>(this.urlApi, heroe)
  }
  //PUT
  putHeroe(id: number, heroe: Heroe): Observable<Heroe> {
    return this.httpCliente.put<Heroe>(this.urlApi + "/" + id, heroe)
  }
  //DELETE
  deleteHeroe(id: number): Observable<Heroe> {
    return this.httpCliente.delete<Heroe>(this.urlApi + "/" + id)
  }
}
