import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LoginComponent } from "./login/login.component";
import { SinupComponent } from "./sinup/sinup.component";

const routes: Routes = [
	{
		path: "",
		children: [
			{ path: "login", component: LoginComponent },
			{ path: "sinup", component: SinupComponent },
			{ path: "**", redirectTo: "login" },
		],
	},
];

@NgModule({
  declarations: [
    LoginComponent,
    SinupComponent
  ],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class AuthRoutingModule {}
