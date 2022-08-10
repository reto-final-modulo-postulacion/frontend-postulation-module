import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Countrie } from '../interfaces/countries';
import { ServiceApiCountriesService } from '../service/treining-league-api-service/service-api-countries.service';


@Component({
  selector: 'app-resgister-form',
  templateUrl: './resgister-form.component.html',
  styleUrls: ['./resgister-form.component.css']
})
export class ResgisterFormComponent implements OnInit {

  listNameCountries: any[] = [];

  formRegisterLigue = new FormGroup({
    name: new FormControl(''),
    lastName: new FormControl(''),
  })

  constructor(
    public formBuilder: FormBuilder,
    private countriesApiService: ServiceApiCountriesService
  ) { }

  ngOnInit(): void {
    this.formRegisterLigue = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          
        ]
      ],
      lastName:[
        '',
        [
          Validators.required,
        ]
      ]
    })

    this.getAllCountriesApi();
  }
  getAllCountriesApi(){
    this.countriesApiService
    .getAllCountries()
    .subscribe((listCountries :any) => {
      this.listNameCountries = listCountries.map((auxCountries :any) => {
        console.log(auxCountries);
        
        return {
          name: auxCountries.name.common,
          code: auxCountries.cioc
        }
      });  
    })
  }
}
