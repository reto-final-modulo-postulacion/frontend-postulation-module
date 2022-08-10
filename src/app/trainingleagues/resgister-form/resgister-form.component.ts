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
  dateEnty: string = "";
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
  
    this.obtenerPaises();
    this.getPostulantById();
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



  obtenerPaises() {
    let token = JSON.parse(localStorage.getItem("token")!);
    this.countriesApiService
      .getAllCountries(token)
      .subscribe((listCountries: any) => {      
        this.listNameCountries = listCountries.map((auxCountries: any) => {
          return {
            name: auxCountries.country_name,
          }
        });
      });      
      console.log(this.listNameCountries)
  }
}
