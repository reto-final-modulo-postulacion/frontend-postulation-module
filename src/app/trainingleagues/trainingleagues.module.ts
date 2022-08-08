import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./header/header.component";
import { ListTrainigLeaguesComponent } from "./list-trainig-leagues/list-trainig-leagues.component";
import { TrainingleaguesRoutingModule } from "./trainingleagues-routing.module";
import { NavbarComponent } from "./navbar/navbar.component";
import { PostulationHomeComponent } from './postulation-home/postulation-home.component';
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    ListTrainigLeaguesComponent,
    HeaderComponent,
    NavbarComponent,
    PostulationHomeComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    TrainingleaguesRoutingModule
  ],
})
export class TrainingleaguesModule {}
