import {  HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Countrie } from '../../interfaces/countries';

@Injectable({
  providedIn: 'root'
})
export class ServiceApiCountriesService {

  private countriesApiList: string = 'https://restcountries.com/v3.1/all';

  httOptions = {
    headers: new HttpHeaders({"Content-Type": "application/json" })
  }
  constructor(
    private http: HttpClient,
  ) { }

  getAllCountries(): Observable<Countrie[]> {
    return this.http
      .get<Countrie[]>(this.countriesApiList)
  }

  subregions(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.countriesApiList}/subregion/{subregion}`)
  }
  
}
