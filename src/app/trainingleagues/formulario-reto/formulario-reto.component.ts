import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import 'moment/locale/ja';
import { Postulant } from '../interfaces/postulant';
import { Challenge} from '../interfaces/challenge';
import { ChallengeApiService } from '../service/challenge-api-service/challenge-api.service';
import { Router } from '@angular/router';
import { PostulantApiService } from '../service/postulant-api/postulant-api.service';

@Component({
  selector: 'app-formulario-reto',
  templateUrl: './formulario-reto.component.html',
  styleUrls: ['./formulario-reto.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'ja-JP'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],

})
export class FormularioRetoComponent implements OnInit {

  listChallenge: Challenge[]=[];

  challenge: Challenge={
    "id": "",
	  "name": "",
	  "description": "",
	  "urlDocument": "",
	  "closingDate": "",
	  "languages": ""
  }

  postulant: Postulant = {
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
  closingDate: any;
  dateDay: any;
  descriptionChallenge: any;
  nameChanllenge: any;
  languaje: any;

  formLenguaje = new FormGroup({
    lenguajeUtiliza: new FormControl(''),
  })

  constructor(
    private formBuilder: FormBuilder,
    private challengeApiService: ChallengeApiService,
    private router: Router,
    private postulantApiService: PostulantApiService
  ) {

     this.postulant = JSON.parse(localStorage.getItem("postulant")!);
     const currentYear = new Date().getFullYear();
     const currentMonth = new Date().getMonth();
     const currentDate = new Date().getDate();

     this.dateDay = new Date(currentYear, currentMonth, currentDate);
     this.closingDate = new Date(currentYear, currentMonth, currentDate + 14);
  }

  ngOnInit(): void {
    this.getChallenges()
    this.startFormReactive();
  }


  getChallenges(){
    this.challengeApiService.getChallengeAll().subscribe( (challenges: Challenge[]) =>{
        this.listChallenge = challenges;
        console.log("challenges=", this.listChallenge)
    })
  }

  startFormReactive(){
    this.formLenguaje.valueChanges.subscribe((value: any) =>{

      const listChallenges = this.listChallenge.filter( (lenguajes) =>
        {
          return lenguajes.languages.includes(value.lenguajeUtiliza);
        }
      )

      let randomNumber = Math.floor(Math.random()* listChallenges.length);

      this.challenge = listChallenges[randomNumber];
      if(this.challenge != undefined  ){
        this.nameChanllenge = this.challenge.name;
        this.descriptionChallenge = this.challenge.description;
      }else{
        this.nameChanllenge = "";
        this.descriptionChallenge = "";
      }
      this.languaje = value.lenguajeUtiliza;
    }
    );
  }

  cofirmChallenge(): void {

    this.updatePostulant();
    this.router.navigate(["list/detailed-challenge-information"]);
  }

  updatePostulant() {
    let userId = JSON.parse(localStorage.getItem("user")!).uid!;
    let user = JSON.parse(localStorage.getItem("postulant")!);
    // let user = customerData;
    this.postulant={
    "id": "",
    "fullName": {
      name: user.fullName.name,
      lastname: user.fullName.lastname
    },
    "documentUser": {
      type: user.documentUser.type,
      value: user.documentUser.value
    },
    "dateOfBirth": user.dateOfBirth,
    "nationality": user.nationality,
    "urlPhoto": user.urlPhoto,
    "phone": {
      "phoneCode": user.phone.phoneCode,
      "phoneNumber": user.phone.phoneNumber
    },
    "email": user.email,
    "companyName": user.companyName,
    "workExperience": user.workExperience,
    "currentOccupation": user.currentOccupation,
    "educationalLevel": user.educationalLevel,
    "country": user.country,
    "department": user.department,
    "municipality": user.municipality,
    "address": user.address,
    "englishLevel": user.englishLevel,
    "isStudying": user.isStudying,
    "aboutYou": user.aboutYou,
    "urlCV": user.urlCV,
    "linkedin": user.linkedin,
    "sessionOn": true,
    "challenge": {
      "idChallenge": this.challenge.id,
      "registrationDate": this.dateDay,
      "initialDate": "",
      "finalDate": "",
      "language": this.languaje
    },
    "idTraining": JSON.parse(localStorage.getItem("idTraining")!)
    }

    this.postulantApiService.updatePostulant(userId, this.postulant).subscribe();

  	localStorage.setItem("postulant", JSON.stringify(this.postulant));
  }

}
