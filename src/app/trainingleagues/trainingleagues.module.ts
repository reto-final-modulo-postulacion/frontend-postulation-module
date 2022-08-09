import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HeaderComponent } from "./header/header.component";
import { HttpClientModule } from "@angular/common/http";
import { MatDatepickerModule,  } from '@angular/material/datepicker';
import { MatFormFieldModule } from "@angular/material/form-field";

import { ListTrainigLeaguesComponent } from "./list-trainig-leagues/list-trainig-leagues.component";
import { TrainingleaguesRoutingModule } from "./trainingleagues-routing.module";
import { NavbarComponent } from "./navbar/navbar.component";
import { PostulationHomeComponent } from './postulation-home/postulation-home.component';
import { ResgisterFormComponent } from './resgister-form/resgister-form.component';
import { MatNativeDateModule } from "@angular/material/core";
import { DetailedChallengeInformationComponent } from './detailed-challenge-information/detailed-challenge-information.component';


@NgModule({
  declarations: [
    HeaderComponent,
    NavbarComponent,
    ListTrainigLeaguesComponent,
    PostulationHomeComponent,
    ResgisterFormComponent,
    DetailedChallengeInformationComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TrainingleaguesRoutingModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule 
  ]
})
export class TrainingleaguesModule { }
