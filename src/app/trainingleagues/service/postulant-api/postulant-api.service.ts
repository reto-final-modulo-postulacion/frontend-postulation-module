import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { Postulant } from "../../interfaces/postulant";

@Injectable({
  providedIn: 'root'
})
export class PostulantApiService {
  private postulandURL = "api/postulant";

	httpOptions = {
		headers: new HttpHeaders({ "Content-Type": "application/json" }),
	};

  constructor(private http: HttpClient) {}

	/** GET Postuland from the server */
	getPostulantById(id: string): Observable<Postulant> {
		const url = `${this.postulandURL}/${id}`;
		return this.http.get<Postulant>(url).pipe(
			tap((res) => console.log(`fetched Postulant id: ${id}`, res)),
			catchError(this.handleError<Postulant>(`getPostulant id: ${id} `)),
		);
	}


	/** PUT: update the Pastuland on the server */
	updatePostulant(id: string, postulant: Postulant): Observable<any> {
		const url = `${this.postulandURL}/${id}`;
		return this.http.put(url, postulant, this.httpOptions).pipe(
			tap((_) => console.log(`updated Postulant ${postulant.urlPhoto}`)),
			catchError(this.handleError<any>("updatPostulant")),
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
