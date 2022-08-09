import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./header/header.component";
import { ListTrainigLeaguesComponent } from "./list-trainig-leagues/list-trainig-leagues.component";
import { TrainingleaguesRoutingModule } from "./trainingleagues-routing.module";
import { NavbarComponent } from "./navbar/navbar.component";
import { PostulationHomeComponent } from './postulation-home/postulation-home.component';
import { HttpClientModule } from "@angular/common/http";
import { ResgisterFormComponent } from './resgister-form/resgister-form.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    ListTrainigLeaguesComponent,
    HeaderComponent,
    NavbarComponent,
    PostulationHomeComponent,
    ResgisterFormComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TrainingleaguesRoutingModule
  ],
})
export class TrainingleaguesModule {}
