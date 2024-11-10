
import { DtoCartDetails } from '../_dto/dto-cart-details';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
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

  getCart(): Observable<HttpResponse<DtoCartDetails[]>> {
    return this.http.get<DtoCartDetails[]>(api_dwb_uri + this.source, { observe: 'response' });
  }

  addToCart(cart: any): Observable<HttpResponse<ApiResponse>> {
    return this.http.post<ApiResponse>(api_dwb_uri + this.source, cart, { observe: 'response' });
  }

  deleteCart(): Observable<HttpResponse<ApiResponse>> {
    return this.http.delete<ApiResponse>(api_dwb_uri + this.source, { observe: 'response' });
  }

  removeFromCart(product_id: number): Observable<HttpResponse<ApiResponse>> {
    return this.http.delete<ApiResponse>(api_dwb_uri + this.source + "/" + product_id, { observe: 'response' });
  }

  getCartItemCount(): Observable<number> {
    return this.http.get<DtoCartDetails[]>(api_dwb_uri + this.source, { observe: 'response' }).pipe(
      map(response => {
        if (response.body) {
          return response.body.reduce((total, item) => total + item.quantity, 0);
        }
        return 0;
      })
    );
  }
}