
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Region } from '../_model/region';
import { api_dwb_uri } from '../../../shared/api-dwb-uri';
import { ApiResponse } from '../../../shared/api-response';

@Injectable({
  providedIn: 'root'
})

export class RegionService {

  private source = "/region";

  constructor(
    private http: HttpClient
  ) { }

  getRegions(): Observable<HttpResponse<Region[]>> {
    return this.http.get<Region[]>(api_dwb_uri + this.source, { observe: 'response' });
  }

  createRegion(region: any): Observable<HttpResponse<ApiResponse>> {
    return this.http.post<ApiResponse>(api_dwb_uri + this.source, region, { observe: 'response' });
  }

  getRegion(region_id: number): Observable<HttpResponse<Region>> {
    return this.http.get<Region>(api_dwb_uri + this.source + "/" + region_id, { observe: 'response' });
  }

  updateRegion(region: any, region_id: number): Observable<HttpResponse<ApiResponse>> {
    return this.http.put<ApiResponse>(api_dwb_uri + this.source + "/" + region_id, region, { observe: 'response' });
  }

  disableRegion(region_id: number): Observable<HttpResponse<ApiResponse>> {
    return this.http.delete<ApiResponse>(api_dwb_uri + this.source + "/" + region_id, { observe: 'response' });
  }

  enableRegion(region_id: number): Observable<HttpResponse<ApiResponse>> {
    return this.http.put<ApiResponse>(api_dwb_uri + this.source + "/" + region_id + "/activate", null, { observe: 'response' });
  }

  getActiveRegions(): Observable<HttpResponse<Region[]>> {
    return this.http.get<Region[]>(api_dwb_uri + this.source + "/active", { observe: 'response' });
  }
}