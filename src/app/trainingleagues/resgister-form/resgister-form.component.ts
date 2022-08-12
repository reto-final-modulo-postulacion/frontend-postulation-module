import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { PostulantApiService } from '../service/postulant-api/postulant-api.service';
import { Countrie } from '../interfaces/countries';
import { ServiceApiCountriesService } from '../service/service-api-countries/service-api-countries.service';
import { Postulant } from '../interfaces/postulant';

import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resgister-form',
  templateUrl: './resgister-form.component.html',
  styleUrls: ['./resgister-form.component.css']
})
export class ResgisterFormComponent implements OnInit {
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
  listNameCountries: any[] = [];
  listNameStates: any[] = [];
  listNameCities: any[] = [];
  country: string = "";
  state: string = "";
  cities: string = "";
  age: string = "23";
  formRegisterLigue: any;
  photoURL: any;
  urlCV: any;


  constructor(
    public formBuilder: FormBuilder,
    private postulantApiService: PostulantApiService,
    private countriesApiService: ServiceApiCountriesService,
    private storage: Storage,
    private router: Router,
  ) {
  }


  ngOnInit(): void {
    this.obtenerPaises();
    this.getPostulantById();

    this.formRegisterLigue
    .valueChanges
    .subscribe((value:any) => {
      console.log(value);

      this.country = value.country!;
      this.state = value.state!;
      this.cities = value.cities!;
      if (value.country != '') {
        this.getAllStatesOfCountry(); 

        if (value.state != '') {
          this.getAllCitiesOfState();
        }
      }
    });
  }


// Funcion que llama 
  onSubmit(customerData: any) {
    let userId = JSON.parse(localStorage.getItem("user") || "").uid!;
    let email = JSON.parse(localStorage.getItem("user") || "").email;
    // let user = this.formRegisterLigue.value;
    let user = customerData;
    this.postulant={
    "id": "",
    "fullName": {
      name: user.name,
      lastname: user.lastname
    },
    "documentUser": {
      type: user.documentType,
      value: user.documentValue
    },
    "dateOfBirth": user.dateOfBirth,
    "nationality": user.nationality,
    "urlPhoto": this.photoURL,
    "phone": {
      "phoneCode": user.phoneCode,
      "phoneNumber": user.phoneNumber
    },
    "email": email,
    "companyName": user.companyName,
    "workExperience": user.workExperience,
    "currentOccupation": user.currentOccupation,
    "educationalLevel": user.educationalLevel,
    "country": user.country,
    "department": user.state,
    "municipality": user.cities,
    "address": user.address,
    "englishLevel": user.englishLevel,
    "isStudying": user.isStudying,
    "aboutYou": user.aboutYou,
    "urlCV": this.urlCV,
    "linkedin": user.linkedin,
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

    this.postulantApiService
    .updatePostulant(userId, this.postulant)
    .subscribe();
    this.router.navigate(['/list/form-reto']);
    this.formRegisterLigue.reset();
    this.age="0";
  }


  getPostulantById() {
    let userId = JSON.parse(localStorage.getItem("user") || "").uid!;
    this.postulantApiService
      .getPostulantById(userId)
      .subscribe((user) => {
        this.postulant = (user) ? user : this.postulant;
        this.startFormReactive();
      });
  }

  startFormReactive(){
    this.formRegisterLigue = this.formBuilder.group({
          name: this.postulant.fullName.name||"",
          lastname: this.postulant.fullName.lastname ||"",
          documentType: this.postulant.documentUser.type || "",
          documentValue: this.postulant.documentUser.value || "",
          dateOfBirth: this.postulant.dateOfBirth || "",
          age: this.age || "",
          nationality: this.postulant.nationality || "",
          urlPhoto: this.postulant.urlPhoto || "",
          phoneCode: this.postulant.phone.phoneCode || "",
          phoneNumber: this.postulant.phone.phoneNumber || "",
          companyName: this.postulant.companyName || "",
          workExperience: this.postulant.workExperience || "",
          currentOccupation: this.postulant.currentOccupation || "",
          educationalLevel: this.postulant.educationalLevel || "",
          country: this.postulant.country || "",
          state: this.postulant.department || "",
          cities: this.postulant.municipality || "",
          address: this.postulant.address || "",
          englishLevel: this.postulant.englishLevel || "",
          isStudying: this.postulant.isStudying || "",
          aboutYou: this.postulant.aboutYou || "",
          urlCV: this.postulant.urlCV || "",
          linkedin: this.postulant.linkedin || "",
        });


        this.formRegisterLigue.valueChanges.subscribe((value: any) => {
          if (this.country !== value.country) {
            this.country = value.country!;
            this.getAllStatesOfCountry();
          }

          if (this.state !== value.state) {
              this.state = value.state!;
              this.getAllCitiesOfState();
          }

        });
  }

  obtenerPaises() {
    let token = JSON.parse(localStorage.getItem("token")!);
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

  getAllStatesOfCountry() {
    let token = JSON.parse(localStorage.getItem("token")!);
    this.countriesApiService
      .getAllStatesOfCountry(token, this.country)
      .subscribe((listStates: any) => {
        this.listNameStates = listStates.map((auxStates: any) => {
          return {
            name: auxStates.state_name
          }
        });
      });
  }

  getAllCitiesOfState(){
  let token = JSON.parse(localStorage.getItem("token")!);
    this.countriesApiService
      .getAllCitiesOfState(token, this.state)
      .subscribe((listCities: any) => {
        this.listNameCities = listCities.map((auxCities: any) => {
          return {
            name: auxCities.city_name
          }
        });
      });
  }

  uploadImage($event: any){
    const file= $event.target.files[0];
    console.log(file);

    const imgRef = ref(this.storage, `images/${file.name}`);
    uploadBytes(imgRef, file)
    .then(response => console.log(response))
    .catch(error => console.log(error))

    getDownloadURL(imgRef).then((url)=> {
      this.photoURL= url;
    }
    ).catch((error) => console.log(error))
  }


  uploadDocument($event: any){
    const file= $event.target.files[0];
    console.log(file);
    const imgRef = ref(this.storage, `document/${file.name}`);
    uploadBytes(imgRef, file)
    .then(response => console.log(response))
    .catch(error => console.log(error))

    getDownloadURL(imgRef).then((url)=> {
      console.log(url)
      this.urlCV = url;
    }).catch((error) => console.log(error))
  }
}
