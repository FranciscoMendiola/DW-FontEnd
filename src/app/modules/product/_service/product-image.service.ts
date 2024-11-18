
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

  uploadProductImage(product_image: ProductImage): Observable<any> {
    return this.http.post(api_dwb_uri + this.source, product_image);
  }

  getProductImages(product_id: number): Observable<any> {
    return this.http.get(api_dwb_uri + this.source + "/" + product_id);
  }

  deleteProductImage(product_image_id: number): Observable<any> {
    return this.http.delete(api_dwb_uri + this.source + "/" + product_image_id);
  }
}