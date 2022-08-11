import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TrainingLeague } from "../interfaces/trainingLeague";
import { TrainingLeagueApiService } from "../service/treining-league-api-service/training-league-api.service";

@Component({
  selector: 'app-list-trainig-leagues',
  templateUrl: './list-trainig-leagues.component.html',
  styleUrls: ['./list-trainig-leagues.component.css']
})
export class ListTrainigLeaguesComponent implements OnInit {
  trainingLeagues: TrainingLeague[]=[];

	constructor(private trainingLeagueApiService: TrainingLeagueApiService, private router: Router) {
    	}

	ngOnInit(): void {
	  this.addTrainingLeagues();
	}

	addTrainingLeagues(){
    this.trainingLeagueApiService.getTrainingLeague().subscribe(
      (trainingLeague) => this.trainingLeagues = trainingLeague
    );
	}


  startButton($event: any){
    const element= $event.target.id;
  	localStorage.setItem("idTraining", JSON.stringify(element));
    this.router.navigate(["list/registro-postulation"]);
  }
}
