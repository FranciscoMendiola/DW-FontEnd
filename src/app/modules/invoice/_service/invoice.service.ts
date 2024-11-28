
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

  getInvoice(id: number): Observable<any> {
    return this.http.get(api_dwb_uri + this.source + "/" + id);
  }

  getInvoices(): Observable<any> {
    return this.http.get(api_dwb_uri + this.source);
  }

  generateInvoice(rfc: string): Observable<any> {
    return this.http.post(api_dwb_uri + this.source, rfc);
  }
}