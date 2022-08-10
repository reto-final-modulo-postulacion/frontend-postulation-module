import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { PostulantApiService } from '../service/postulant-api/postulant-api.service';
import { Countrie } from '../interfaces/countries';
import { ServiceApiCountriesService } from '../service/service-api-countries/service-api-countries.service';
import { Postulant } from '../interfaces/postulant';

@Component({
  selector: 'app-resgister-form',
  templateUrl: './resgister-form.component.html',
  styleUrls: ['./resgister-form.component.css']
})
export class ResgisterFormComponent implements OnInit {
  postulant: Postulant={
  		"id": "",
		"fullName": {
			name: "",
			lastname: ""
		},
		"documentUser": {
			type: "",
			value: ""
		},
		"dateOfBirth": "",
		"nationality": "",
		"urlPhoto": "",
		"phone": {
			"phoneCode": "",
			"phoneNumber": ""
		},
		"email": "",
		"companyName": "",
		"workExperience": "",
		"currentOccupation": "",
		"educationalLevel": "",
		"country": "",
		"department": "",
		"municipality": "",
		"address": "",
		"englishLevel": "",
		"isStudying": "",
		"aboutYou": "",
		"urlCV": "",
		"linkedin": "",
		"sessionOn": true,
		"challenge": {
			"idChallenge": "",
			"registrationDate": "",
			"initialDate": "",
			"finalDate": "",
			"language": ""
		},
		"idTraining": ""
  }
  listNameCountries: any[] = [];
  listNameStates: any[] = [];
  listNameCities: any[] = [];

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
    this.obtenerPaises();
    this.getPostulantById();
    this.getAllStatesOfCountry();
    this.getAllCitiesOfCountry();
  }

  getPostulantById() {
    var userId = JSON.parse(localStorage.getItem("user") || "").uid!;

    this.postulantApiService.getPostulantById(userId).subscribe(
      (user) => this.postulant = user
    );

    // if (userId !== userId) {
    // 	this.player.playerId = userId;
    // 	this.player.email = userEmail;
    //
    // 	this.playerAPIService.addPlayer(this.player).subscribe();
    // }
  }

  async obtenerPaises() {
    let token = await JSON.parse(localStorage.getItem("token")!);
    this.countriesApiService
      .getAllCountries(token)
      .subscribe((listCountries: any) => {
        this.listNameCountries = listCountries.map((auxCountries: any) => {
          return {
            name: auxCountries.country_name
          }
        });
      });
  }

  getAllStatesOfCountry(){
  let token = JSON.parse(localStorage.getItem("token")!);
    this.countriesApiService
      .getAllStatesOfCountry(token,"Colombia")
      .subscribe((listStates: any) => {
        this.listNameStates = listStates.map((auxStates: any) => {
          return {
            name: auxStates.state_name
          }
        });
      });
  }

  getAllCitiesOfCountry(){
  let token = JSON.parse(localStorage.getItem("token")!);
    this.countriesApiService
      .getAllCitiesOfState(token,"Antioquia")
      .subscribe((listCities: any) => {
        this.listNameCities = listCities.map((auxCities: any) => {
          return {
            name: auxCities.city_name
          }
        });
          console.log(listCities);
      });
  }


}
