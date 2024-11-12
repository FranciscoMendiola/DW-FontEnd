
import { DtoInvoiceList } from '../_dto/dto-invoice-list';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Invoice } from '../_model/invoice';
import { Observable } from 'rxjs';
import { api_dwb_uri } from '../../../shared/api-dwb-uri';
import { ApiResponse } from '../../../shared/api-response';

@Injectable({
  providedIn: 'root'
})

export class InvoiceService {

  private source = "/invoice";

  constructor(
    private http: HttpClient
  ) { }

  getInvoices(): Observable<HttpResponse<DtoInvoiceList[]>> {
    return this.http.get<DtoInvoiceList[]>(api_dwb_uri + this.source, { observe: 'response' });
  }

  generateInvoice(rfc: string): Observable<HttpResponse<ApiResponse>> {
    return this.http.post<ApiResponse>(api_dwb_uri + this.source, rfc, { observe: 'response' });
  }

  getInvoice(id: number): Observable<HttpResponse<Invoice>> {
    return this.http.get<Invoice>(api_dwb_uri + this.source + "/" + id, { observe: 'response' });
  }
}