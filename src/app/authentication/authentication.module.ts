import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AngularFireModule } from "@angular/fire/compat";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AuthRoutingModule } from "./auth-routing.module";
import { environment } from "../../environments/environment";

import { SinupComponent } from './sinup/sinup.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ActionPasswordComponent } from './action-password/action-password.component';

@NgModule({
  declarations: [
    LoginComponent,
    SinupComponent,
    ForgotPasswordComponent,
    ActionPasswordComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  exports: [],
  providers: [AuthenticationModule]
})
export class AuthenticationModule {}
