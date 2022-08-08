import { NgModule } from "@angular/core";
import { Routes, RouterModule, GuardsCheckEnd } from "@angular/router";

import { LoginComponent } from "./login/login.component";
import { SinupComponent } from "./sinup/sinup.component";
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ActionPasswordComponent } from './action-password/action-password.component';

const routes: Routes = [
	{
		path: "",
		children: [
			{ path: "login", component: LoginComponent },
			{ path: "sinup", component: SinupComponent },
			{ path: 'forgot-password', component: ForgotPasswordComponent, canActivateChild:[] },
			{ path: 'action-password', component: ActionPasswordComponent },
			{ path: "**", redirectTo: "login" },
		],
	},
];

@NgModule({
	declarations: [],
	imports: [
		RouterModule.forChild(routes),
	]
})
export class AuthRoutingModule { }
