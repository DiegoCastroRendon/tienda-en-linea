import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api_dwb_uri } from '../../../shared/api-dwb-uri';
import { Subject } from 'rxjs';
import { DtoCartDetails } from '../_dto/dto-cart-details';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  private source = "http://localhost:8080/cart";

  constructor(
    private http: HttpClient
  ) { }

  totalCart = new Subject<number>();
  productoEliminado = new Subject<number>();

  addToCart(cart: any): Observable<any> {
    return this.http.post(api_dwb_uri + this.source, cart);
  }

  getCart(): Observable<any>{
    return this.http.get(api_dwb_uri + this.source);
  }

  /* REQUERIMIENTO 4. Implementar servicio Cart - función clearCart() */
  clearCart(rfc: string) {
    return this.http.get<DtoCartDetails[]>(`${this.source}/${rfc}`);
  }

  /* REQUERIMIENTO 4. Implementar servicio Cart - función removeFromCart() */
  removeFromCart(id: number) {
    return this.http.delete(this.source + "/" + id);
  }
}
