import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AngularFireModule } from "@angular/fire/compat";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AuthRoutingModule } from "./auth-routing.module";
import { environment } from "../../environments/environment";
import { SinupComponent } from "./sinup/sinup.component";

@NgModule({
  declarations: [
    SinupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  exports: [],
  providers: [AuthenticationModule]
})
export class AuthenticationModule {}
