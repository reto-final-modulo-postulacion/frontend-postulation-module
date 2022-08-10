import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { PostulantApiService } from '../service/postulant-api/postulant-api.service';
import { Countrie } from '../interfaces/countries';
import { ServiceApiCountriesService } from '../service/service-api-countries/service-api-countries.service';

@Component({
  selector: 'app-resgister-form',
  templateUrl: './resgister-form.component.html',
  styleUrls: ['./resgister-form.component.css']
})
export class ResgisterFormComponent implements OnInit {
  postulant: any;

  listNameCountries: any[] = [];

  formRegisterLigue = new FormGroup({
    name: new FormControl(''),
    lastName: new FormControl(''),
  })

  constructor(
    public formBuilder: FormBuilder,
    private postulantApiService: PostulantApiService,
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

    this.getPostulantById();

    this.getAllCountriesApi();
  }

  getPostulantById(){
    var userId = JSON.parse(localStorage.getItem("user") || "").uid!;

    this.postulantApiService.getPostulantById(userId).subscribe(
			(user) => {
			  this.postulant = user;
			}
    );

		// if (userId !== userId) {
		// 	this.player.playerId = userId;
		// 	this.player.email = userEmail;
  //
		// 	this.playerAPIService.addPlayer(this.player).subscribe();
		// }
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
