import { Injectable } from '@angular/core';
import { Category } from '../_model/category';
import { Observable } from 'rxjs';
import { api_dwb_uri } from '../../../shared/api-dwb-uri';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private source ="/category";
  constructor(private http:HttpClient) { }

  getCategories():Observable<any>{
    return this.http.get(api_dwb_uri+this.source);
  }

  getCategory(id:number):Observable<any>{
    return this.http.get(api_dwb_uri+this.source+"/"+id);
  }

  getActivateCategories():Observable<any>{
    return this.http.get(api_dwb_uri+this.source+"/active");
  }

  createCategory(category:any):Observable<any>{
    return this.http.post(api_dwb_uri+this.source,category);
  }

  updateCategory(category:any,id:number):Observable<any>{
    return this.http.put(api_dwb_uri+this.source+"/"+id,category);
  }

  deleteCategory(id:number):Observable<any>{
    return this.http.delete(api_dwb_uri+this.source+"/"+id);
  }

  activateCategory(id:number):Observable<any>{
    return this.http.put(api_dwb_uri+this.source+"/"+id+"/activate",null);
  }
}
