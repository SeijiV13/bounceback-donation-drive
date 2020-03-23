import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { RequestorTicket } from '../../shared/models/RequestorTicket';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestorTicketService {

  url = environment.url;
  constructor(private http: HttpClient) { }

  getAllRequestorTicket(): Observable<RequestorTicket[]> {
    return this.http.get(`${this.url}/requestor`).pipe(
      tap((data: RequestorTicket[]) => data),
      catchError(error => throwError(error))
    );
  }

  createRequestorTicket(donorTicket: RequestorTicket): Observable<{message: string, data: RequestorTicket}> {
    return this.http.post(`${this.url}/requestor`, donorTicket).pipe(
      tap((data: {message: string, data: RequestorTicket}) => data),
      catchError(error => throwError(error))
    );
  }

  approveDonorTicket(id): Observable<{message: string}> {
    return this.http.put(`${this.url}/requestor/${id}`, {}).pipe(
      tap((data: {message: string}) => data),
      catchError(error => throwError(error))
    );
  }

}
