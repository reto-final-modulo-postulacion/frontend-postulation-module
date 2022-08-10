import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { GuardaAuthGuard } from "../guard/guarda-auth.guard";
import { ChallengeFromComponent } from "./challenge-from/challenge-from.component";
import { DetailedChallengeInformationComponent } from "./detailed-challenge-information/detailed-challenge-information.component";

import { PostulationHomeComponent } from "./postulation-home/postulation-home.component";
import { ResgisterFormComponent } from './resgister-form/resgister-form.component';

const routes: Routes = [
	{
		path: "",
		children: [
			{ path: "home", component: PostulationHomeComponent, canActivate: [GuardaAuthGuard] },
			{ path: "registro-postulation", component: ResgisterFormComponent },
			{ path: "detailed-challenge-information", component: DetailedChallengeInformationComponent },
			{ path: "challenge-form", component: ChallengeFromComponent }
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
