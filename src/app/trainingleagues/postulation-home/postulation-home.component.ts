import { Component, OnInit } from '@angular/core';
import { ServiceApiCountriesService } from '../service/service-api-countries/service-api-countries.service';

@Component({
  selector: 'app-postulation-home',
  templateUrl: './postulation-home.component.html',
  styleUrls: ['./postulation-home.component.css']
})
export class PostulationHomeComponent implements OnInit {
  token: any;
  constructor(
    private countriesApiService: ServiceApiCountriesService
  ) {
    this.countriesApiService
      .getToken()
      .subscribe(resul => {
        if (resul) {
          this.token = resul.auth_token;
          localStorage.setItem("token", JSON.stringify(this.token));
          JSON.parse(localStorage.getItem("token")!);
        } else {
          localStorage.setItem("token", "null");
          JSON.parse(localStorage.getItem("token")!);
        }
      })
  }

  ngOnInit(): void { }
}
