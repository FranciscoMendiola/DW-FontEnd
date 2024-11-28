
import { DtoProductList } from '../_dto/dto-product-list';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../_model/product';
import { api_dwb_uri } from '../../../shared/api-dwb-uri';
import { ApiResponse } from '../../../shared/api-response';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  private source = "/product";

  constructor(
    private http: HttpClient
  ) { }

  getProducts(): Observable<any> {
    return this.http.get(api_dwb_uri + this.source);
  }

  createProduct(product: any): Observable<any> {
    return this.http.post(api_dwb_uri + this.source, product);
  }

  getProduct(gtin: string): Observable<any> {
    return this.http.get(api_dwb_uri + this.source + "/" + gtin);
  }

  updateProductStock(gtin: string, stock: number): Observable<any> {
    return this.http.put(api_dwb_uri + this.source + "/" + gtin + "/stock" + "/" + stock, null);
  }

  updateProduct(product: any, product_id: number): Observable<any> {
    return this.http.put(api_dwb_uri + this.source + "/" + product_id, product);
  }

  disableProduct(product_id: number): Observable<any> {
    return this.http.delete(api_dwb_uri + this.source + "/" + product_id);
  }

  enableProduct(product_id: number): Observable<any> {
    return this.http.put(api_dwb_uri + this.source + "/" + product_id + "/activate", null);
  }

  getActiveProducts(): Observable<any> {
    return this.http.get(api_dwb_uri + this.source + "/active");
  }

  getProductsByCategory(category_id: number): Observable<any> {
    return this.http.get(api_dwb_uri + this.source + "/category" + "/" + category_id);
  }
}