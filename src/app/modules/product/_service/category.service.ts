
import { Category } from '../_model/category';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api_dwb_uri } from '../../../shared/api-dwb-uri';
import { ApiResponse } from '../../../shared/api-response';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  private source = "/category";

  constructor(
    private http: HttpClient
  ) { }

  getCategories(): Observable<any> {
    return this.http.get(api_dwb_uri + this.source);
  }

  createCategory(category: any): Observable<any> {
    return this.http.post(api_dwb_uri + this.source, category);
  }

  getCategory(category_id: number): Observable<any> {
    return this.http.get<Category>(api_dwb_uri + this.source + "/" + category_id);
  }

  updateCategory(category: any, category_id: number): Observable<any> {
    return this.http.put(api_dwb_uri + this.source + "/" + category_id, category);
  }

  getActiveCategories(): Observable<any> {
    return this.http.get(api_dwb_uri + this.source + "/active");
  }

  disableCategory(category_id: number): Observable<any> {
    return this.http.delete(api_dwb_uri + this.source + "/" + category_id);
  }

  enableCategory(category_id: number): Observable<any> {
    return this.http.put(api_dwb_uri + this.source + "/" + category_id + "/activate", null);
  }
}