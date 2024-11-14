
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

  getCustomers(): Observable<HttpResponse<DtoCustomerList[]>> {
    return this.http.get<DtoCustomerList[]>(api_dwb_uri + this.source, { observe: 'response' });
  }

  createCustomer(customer: any): Observable<HttpResponse<ApiResponse>> {
    return this.http.post<ApiResponse>(api_dwb_uri + this.source, customer, { observe: 'response' });
  }

  deleteAccount(): Observable<HttpResponse<ApiResponse>> {
    return this.http.delete<ApiResponse>(api_dwb_uri + this.source, { observe: 'response' });
  }

  updateCustomer(customer: any, customer_id: number): Observable<HttpResponse<ApiResponse>> {
    return this.http.put<ApiResponse>(api_dwb_uri + this.source + "/" + customer_id, customer, { observe: 'response' });
  }

  disableCustomer(customer_id: number): Observable<HttpResponse<ApiResponse>> {
    return this.http.delete<ApiResponse>(api_dwb_uri + this.source + "/" + customer_id, { observe: 'response' });
  }

  enableCustomer(customer_id: number): Observable<HttpResponse<ApiResponse>> {
    return this.http.put<ApiResponse>(api_dwb_uri + this.source + "/" + customer_id + "/activate", null, { observe: 'response' });
  }

  getCustomer(rfc: string): Observable<HttpResponse<Customer>> {
    return this.http.get<Customer>(api_dwb_uri + this.source + "/" + rfc, { observe: 'response' });
  }

  getCustomerDetail(): Observable<HttpResponse<Customer>> {
    return this.http.get<Customer>(api_dwb_uri + this.source + "/detail", { observe: 'response' });
  }
}