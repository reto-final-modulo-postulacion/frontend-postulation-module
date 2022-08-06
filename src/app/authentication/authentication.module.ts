import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire/compat';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SinupComponent } from './sinup/sinup.component';
import { environment } from '../../environments/environment';



@NgModule({
  declarations: [
    LoginComponent,
    SinupComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  exports: [],
  providers: [AuthenticationModule]
})
export class AuthenticationModule { }