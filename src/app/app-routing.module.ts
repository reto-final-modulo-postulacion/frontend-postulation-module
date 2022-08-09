import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
	{
		path: "auth",
		loadChildren: () =>
			import("./authentication/authentication.module").then(
				(m) => m.AuthenticationModule,
			),
		// canActivateChild: [AngularFireAuth],
	},
	{
		path: "list",
		loadChildren: () =>
			import("./trainingleagues/trainingleagues.module").then(
				(m) => m.TrainingleaguesModule,
			),
		// canActivate: [AngularFireAuth],
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
	exports: [
		RouterModule
	]
})
export class AppRoutingModule { }
