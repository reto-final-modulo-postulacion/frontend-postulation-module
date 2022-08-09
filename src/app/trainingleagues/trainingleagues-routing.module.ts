import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PostulationHomeComponent } from "./postulation-home/postulation-home.component";
import { ResgisterFormComponent } from './resgister-form/resgister-form.component';

const routes: Routes = [
	{
		path: "",
		children: [
			{ path: "home", component: PostulationHomeComponent },
			{ path: "registro-postulation", component: ResgisterFormComponent}
		],
	},
	{ path: "**", redirectTo: "home" },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TrainingleaguesRoutingModule {}
