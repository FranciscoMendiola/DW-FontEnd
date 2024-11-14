
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductImage } from '../_model/product-image';
import { api_dwb_uri } from '../../../shared/api-dwb-uri';
import { ApiResponse } from '../../../shared/api-response';

@Injectable({
  providedIn: 'root'
})

export class ProductImageService {

  private source = "/product-image";

  constructor(
    private http: HttpClient
  ) { }

  uploadProductImage(product_image: ProductImage): Observable<HttpResponse<ApiResponse>> {
    return this.http.post<ApiResponse>(api_dwb_uri + this.source, product_image, { observe: 'response' });
  }

  getProductImages(product_id: number): Observable<HttpResponse<ProductImage[]>> {
    return this.http.get<ProductImage[]>(api_dwb_uri + this.source + "/" + product_id, { observe: 'response' });
  }

  deleteProductImage(product_image_id: number): Observable<HttpResponse<ApiResponse>> {
    return this.http.delete<ApiResponse>(api_dwb_uri + this.source + "/" + product_image_id, { observe: 'response' });
  }
}