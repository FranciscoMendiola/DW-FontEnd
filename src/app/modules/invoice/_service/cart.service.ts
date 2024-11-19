
import { DtoCartDetails } from '../_dto/dto-cart-details';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { api_dwb_uri } from '../../../shared/api-dwb-uri';
import { ApiResponse } from '../../../shared/api-response';

@Injectable({
  providedIn: 'root'
})

export class CartService {

  private source = "/cart";

  constructor(
    private http: HttpClient
  ) { }

  getCart(): Observable<any> {
    return this.http.get(api_dwb_uri + this.source);
  }

  addToCart(cart: any): Observable<any> {
    return this.http.post(api_dwb_uri + this.source, cart);
  }

  clearCart(): Observable<any> {
    return this.http.delete(api_dwb_uri + this.source);
  }

  removeFromCart(product_id: number): Observable<any> {
    return this.http.delete(api_dwb_uri + this.source + "/" + product_id);
  }
}