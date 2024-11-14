
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

  getRegions(): Observable<any> {
    return this.http.get<Region[]>(api_dwb_uri + this.source);
  }

  createRegion(region: any): Observable<any> {
    return this.http.post(api_dwb_uri + this.source, region);
  }

  getRegion(region_id: number): Observable<any> {
    return this.http.get(api_dwb_uri + this.source + "/" + region_id);
  }

  updateRegion(region: any, region_id: number): Observable<any> {
    return this.http.put(api_dwb_uri + this.source + "/" + region_id, region);
  }

  disableRegion(region_id: number): Observable<any> {
    return this.http.delete(api_dwb_uri + this.source + "/" + region_id);
  }

  enableRegion(region_id: number): Observable<any> {
    return this.http.put(api_dwb_uri + this.source + "/" + region_id + "/activate", null);
  }

  getActiveRegions(): Observable<any> {
    return this.http.get(api_dwb_uri + this.source + "/active");
  }
}