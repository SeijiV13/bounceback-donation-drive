import { Product } from './../../shared/models/Product';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = environment.url;
  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get(`${this.url}/product`).pipe(
      tap((data: Product[]) => data),
      catchError((error) => throwError(error))
    );
  }

  createProduct(product: Product): Observable<{message: string, data: Product}> {
    return this.http.post(`${this.url}/product`, product).pipe(
      tap((data: {message: string, data: Product}) => data),
      catchError((error) => throwError(error))
    );
  }

  deleteProduct(id) {
    return this.http.delete(`${this.url}/product/${id}`).pipe(
      tap((data) => data),
      catchError((error) => throwError(error))
    );
  }

}
