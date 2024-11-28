
import { Customer } from '../_model/customer';
import { DtoCustomerList } from '../_dto/dto-customer-list';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api_dwb_uri } from '../../../shared/api-dwb-uri';
import { ApiResponse } from '../../../shared/api-response';

@Injectable({
  providedIn: 'root'
})

export class CustomerService {

  private source = "/customer";

  constructor(
    private http: HttpClient
  ) { }

  getCustomers(): Observable<any> {
    return this.http.get(api_dwb_uri + this.source);
  }

  createCustomer(customer: any): Observable<any> {
    return this.http.post(api_dwb_uri + this.source, customer);
  }

  deleteAccount(): Observable<any> {
    return this.http.delete(api_dwb_uri + this.source);
  }

  updateCustomer(customer: any, customer_id: number): Observable<any> {
    return this.http.put(api_dwb_uri + this.source + "/" + customer_id, customer);
  }

  disableCustomer(customer_id: number): Observable<any> {
    return this.http.delete(api_dwb_uri + this.source + "/" + customer_id);
  }

  enableCustomer(customer_id: number): Observable<any> {
    return this.http.put(api_dwb_uri + this.source + "/" + customer_id + "/activate", null);
  }

  getCustomer(rfc: string): Observable<any> {
    return this.http.get(api_dwb_uri + this.source + "/" + rfc);
  }

  getCustomerDetail(): Observable<any> {
    return this.http.get(api_dwb_uri + this.source + "/detail");
  }
}