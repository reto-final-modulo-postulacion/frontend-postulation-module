import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Countrie } from '../../interfaces/countries';

@Injectable({
  providedIn: 'root'
})
export class ServiceApiCountriesService {

  private tokenApi: string = 'https://www.universal-tutorial.com/api/getaccesstoken';
  private countriesApiList: string = 'https://www.universal-tutorial.com/api/countries/';

  httOptions = {
    headers: new HttpHeaders({
      "Accept": "application/json",
      "api-token": "s4x3x8k2meNj_R7cW-2N1CDUd0hQQOPLPqADeNv0ziazB_0knyCtxlpv3hjOYraSz9w",
      "user-email": "hernanvelasquez025@gmail.com"
    })
  }

  constructor(
    private http: HttpClient,
  ) { }

  getAllCountries(token: string): Observable<any[]> {
    return this.http
      .get<any[]>(this.countriesApiList, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json"
        }
      })
  }

  getToken(): Observable<any> {
    return this.http.get<any>(this.tokenApi, this.httOptions)
  }

}
