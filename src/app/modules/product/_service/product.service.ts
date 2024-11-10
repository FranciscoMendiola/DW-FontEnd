
import { DtoProductList } from '../_dto/dto-product-list';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../_model/product/product';
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

  createProduct(product: any): Observable<HttpResponse<ApiResponse>> {
    return this.http.post<ApiResponse>(api_dwb_uri + this.source, product, { observe: 'response' });
  }

  getProduct(gtin: string): Observable<HttpResponse<Product>> {
    return this.http.get<Product>(api_dwb_uri + this.source + "/" + gtin, { observe: 'response' });
  }

  updateProductStock(gtin: string, stock: number): Observable<HttpResponse<ApiResponse>> {
    return this.http.put<ApiResponse>(api_dwb_uri + this.source + "/" + gtin + "/stock"+ "/" + stock, null, { observe: 'response' });
  }

  updateProduct(product: any, product_id: number): Observable<HttpResponse<ApiResponse>> {
    return this.http.put<ApiResponse>(api_dwb_uri + this.source + "/" + product_id, product, { observe: 'response' });
  }

  disableProduct(product_id: number): Observable<HttpResponse<ApiResponse>> {
    return this.http.delete<ApiResponse>(api_dwb_uri + this.source + "/" + product_id, { observe: 'response' });
  }

  enableProduct(product_id: number): Observable<HttpResponse<ApiResponse>> {
    return this.http.put<ApiResponse>(api_dwb_uri + this.source + "/" + product_id + "/activate", null, { observe: 'response' });
  }

  getActiveProducts(): Observable<HttpResponse<DtoProductList[]>> {
    return this.http.get<DtoProductList[]>(api_dwb_uri + this.source + "/active", { observe: 'response' });
  }

  getProductsByCategory(category_id: number): Observable<HttpResponse<DtoProductList[]>> {
    return this.http.get<DtoProductList[]>(api_dwb_uri + this.source + "/category" + "/" + category_id, { observe: 'response' });
  }
}