import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { AuthenticationModule } from "./authentication/authentication.module";
import { AppRoutingModule } from "./app-routing.module";
import { TrainingleaguesModule } from "./trainingleagues/trainingleagues.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthenticationModule,
    TrainingleaguesModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }