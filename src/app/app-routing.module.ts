import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/compat/auth";

const routes: Routes = [
	{
		path: "auth",
		loadChildren: () =>
			import("./authentication/authentication.module").then(
				(m) => m.AuthenticationModule,
			),
		canActivate: [AngularFireAuth],
	},
	{
		path: "list",
		loadChildren: () =>
			import("./trainingleagues/trainingleagues.module").then(
				(m) => m.TrainingleaguesModule,
			),
	},
	{
		path: "**",
		redirectTo: "auth",
	},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule {}
