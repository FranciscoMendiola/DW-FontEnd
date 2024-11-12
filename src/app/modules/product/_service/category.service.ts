
import { Category } from '../_model/category/category';
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

  getCategories(): Observable<HttpResponse<Category[]>> {
    return this.http.get<Category[]>(api_dwb_uri + this.source, { observe: 'response' });
  }

  createCategory(category: any): Observable<HttpResponse<ApiResponse>> {
    return this.http.post<ApiResponse>(api_dwb_uri + this.source, category, { observe: 'response' });
  }

  getCategory(category_id: number): Observable<HttpResponse<Category>> {
    return this.http.get<Category>(api_dwb_uri + this.source + "/" + category_id, { observe: 'response' });
  }

  updateCategory(category: any, category_id: number): Observable<HttpResponse<ApiResponse>> {
    return this.http.put<ApiResponse>(api_dwb_uri + this.source + "/" + category_id, category, { observe: 'response' });
  }

  getActiveCategories(): Observable<HttpResponse<Category[]>> {
    return this.http.get<Category[]>(api_dwb_uri + this.source + "/active", { observe: 'response' });
  }

  disableCategory(category_id: number): Observable<HttpResponse<ApiResponse>> {
    return this.http.delete<ApiResponse>(api_dwb_uri + this.source + "/" + category_id, { observe: 'response' });
  }

  enableCategory(category_id: number): Observable<HttpResponse<ApiResponse>> {
    return this.http.put<ApiResponse>(api_dwb_uri + this.source + "/" + category_id + "/activate", null, { observe: 'response' });
  }
}