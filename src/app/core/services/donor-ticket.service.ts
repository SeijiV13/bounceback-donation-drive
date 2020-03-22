import { DonorTicket } from './../../shared/models/DonorTicket';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DonorTicketService {
  url = environment.url;
  constructor(private http: HttpClient) { }

  getAllDonorTicket(): Observable<DonorTicket[]> {
    return this.http.get(`${this.url}/donation`).pipe(
      tap((data: DonorTicket[]) => data),
      catchError(error => throwError(error))
    );
  }

  createDonorTicket(donorTicket: DonorTicket): Observable<{message: string, data: DonorTicket}> {
    return this.http.post(`${this.url}/donation`, donorTicket).pipe(
      tap((data: {message: string, data: DonorTicket}) => data),
      catchError(error => throwError(error))
    );
  }

  approveDonorTicker(id): Observable<{message: string}> {
    return this.http.put(`${this.url}/donation/${id}`, {}).pipe(
      tap((data: {message: string}) => data),
      catchError(error => throwError(error))
    );
  }
}
