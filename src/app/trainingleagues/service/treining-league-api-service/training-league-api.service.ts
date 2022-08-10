import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { TrainingLeague } from "../../interfaces/trainingLeague";

@Injectable({
  providedIn: 'root'
})
export class TrainingLeagueApiService {
  private	trainingLeagueURL = "api/trainingleague/"

	httpOptions = {
		headers: new HttpHeaders({ "Content-Type": "application/json" }),
	};

  constructor(private http: HttpClient) {}

	/** GET cards from the server */
	getTrainingLeague(): Observable<TrainingLeague[]> {
		return this.http.get<TrainingLeague[]>(this.trainingLeagueURL).pipe(
			tap((res) => console.log("fetched trainingleague", res)),
			catchError(this.handleError<TrainingLeague[]>("getTrainingLeague", [])),
		);
	}

	/**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
	private handleError<T>(operation = "operation", result?: T) {
		return (error: any): Observable<T> => {
			// TODO: send the error to remote logging infrastructure
			console.error(error); // log to console instead

			// TODO: better job of transforming error for user consumption
			console.log(`${operation} failed: ${error.message}`);

			// Let the app keep running by returning an empty result.
			return of(result as T);
		};
	}
}
