import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HeaderComponent } from "./header/header.component";
import { HttpClientModule } from "@angular/common/http";
import { MatDatepickerModule,  } from '@angular/material/datepicker';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from "@angular/material/core";
import { MatCardModule } from "@angular/material/card";

import { ListTrainigLeaguesComponent } from "./list-trainig-leagues/list-trainig-leagues.component";
import { TrainingleaguesRoutingModule } from "./trainingleagues-routing.module";
import { NavbarComponent } from "./navbar/navbar.component";
import { PostulationHomeComponent } from './postulation-home/postulation-home.component';
import { ResgisterFormComponent } from './resgister-form/resgister-form.component';
import { DetailedChallengeInformationComponent } from './detailed-challenge-information/detailed-challenge-information.component';
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { provideStorage, getStorage } from "@angular/fire/storage";
import { environment } from "../../environments/environment";



@NgModule({
  declarations: [
    HeaderComponent,
    NavbarComponent,
    ListTrainigLeaguesComponent,
    PostulationHomeComponent,
    ResgisterFormComponent,
    DetailedChallengeInformationComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TrainingleaguesRoutingModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatCardModule,
    provideFirebaseApp(()=> initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
  ]
})
export class TrainingleaguesModule { }
