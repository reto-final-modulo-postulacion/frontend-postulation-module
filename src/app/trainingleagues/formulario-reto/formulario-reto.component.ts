import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import 'moment/locale/ja';
import { Postulant } from '../interfaces/postulant';


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


  formLenguaje = new FormGroup({
    lenguajeUtiliza: new FormControl(''),
  })

  constructor(
    private formBuilder: FormBuilder,
  ) {

    this.postulant = JSON.parse(localStorage.getItem("postulant")!);
    console.log(this.postulant);

     const currentYear = new Date().getFullYear();
     const currentMonth = new Date().getMonth();
     const currentDate = new Date().getDate();

     this.dateDay = new Date(currentYear, currentMonth, currentDate);
     this.closingDate = new Date(currentYear, currentMonth, currentDate + 14);
  }

  ngOnInit(): void {

    // this.formLenguaje = this.formBulder.group({
      // lenguajeUtiliza: ['', [Validators.required]]
    // });
  }

  onSubmit(): void {
    console.log(this.formLenguaje.value);
  }
}
