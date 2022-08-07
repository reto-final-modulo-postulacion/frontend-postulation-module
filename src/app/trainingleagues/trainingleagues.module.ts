import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./header/header.component";
import { ListTrainigLeaguesComponent } from "./list-trainig-leagues/list-trainig-leagues.component";
import { TrainingleaguesRoutingModule } from "./trainingleagues-routing.module";
import { NavbarComponent } from "./navbar/navbar.component";

@NgModule({
  declarations: [
    ListTrainigLeaguesComponent,
    HeaderComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    TrainingleaguesRoutingModule
  ],
})
export class TrainingleaguesModule {}
