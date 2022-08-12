import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from "./app.component";
import { AuthenticationModule } from "./authentication/authentication.module";
import { AppRoutingModule } from "./app-routing.module";
import { TrainingleaguesModule } from "./trainingleagues/trainingleagues.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthenticationModule,
    TrainingleaguesModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
