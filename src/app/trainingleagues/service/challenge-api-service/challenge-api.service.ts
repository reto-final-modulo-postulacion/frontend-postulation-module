import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { Challenge } from '../../interfaces/challenge';

@Injectable({
  providedIn: 'root'
})
export class ChallengeApiService {
  private challengeURL = "api/challenge";

	httpOptions = {
		headers: new HttpHeaders({ "Content-Type": "application/json" }),
	};

  constructor(private http: HttpClient) {}

	/** GET challenge from the server */
	getChallengeById(id: string): Observable<Challenge> {
		const url = `${this.challengeURL}/${id}`;
		return this.http.get<Challenge>(url).pipe(
			tap((res) => console.log(`fetched Challenge id: ${id}`, res)),
			catchError(this.handleError<Challenge>(`getChallengeById id: ${id} `)),
		);
	}

	/** GET All challenge from the server */
	getChallengeAll(): Observable<Challenge[]> {
		const url = `${this.challengeURL}`;
		return this.http.get<Challenge[]>(url).pipe(
			tap((res) => console.log(`fetched Challenge All:`, res)),
			catchError(this.handleError<Challenge[]>(` Erro in getChallengeAll `)),
		);
	}

	/** PUT: update the Pastuland on the server */
	updateChallenge(id: string, postulant: Challenge): Observable<any> {
		const url = `${this.challengeURL}/${id}`;
		return this.http.put(url, postulant, this.httpOptions).pipe(
			tap((_) => console.log(`updated Challenge ${id}`)),
			catchError(this.handleError<any>("updateChallenge")),
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
