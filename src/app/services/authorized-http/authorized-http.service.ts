import { Injectable } from '@angular/core';
import { env } from '../../env';
import {
  HttpClient,
  HttpHeaders,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { AuthLocalStorageService } from '../auth-local-storage/auth-local-storage.service';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthorizedHttpService {
  constructor(
    private http: HttpClient,
    private authLocalStorageService: AuthLocalStorageService
  ) {}

  public get<T>(url: string, options?: any): Observable<T> {
    console.log({ url });
    return this.http
      .get<HttpEvent<T>>(env.SERVER_URI + url, {
        headers: this.authorizedHeader,
        ...options,
      })
      .pipe(map((response) => response as T));
  }

  public post<T>(url: string, data: any, options?: any): Observable<T> {
    return this.http
      .post<HttpEvent<T>>(env.SERVER_URI + url, data, {
        headers: this.authorizedHeader,
        ...options,
      })
      .pipe(map((response) => response as T));
  }

  public put<T>(url: string, data: any, options?: any): Observable<T> {
    return this.http
      .put<HttpEvent<T>>(env.SERVER_URI + url, data, {
        headers: this.authorizedHeader,
        ...options,
      })
      .pipe(
        map((response) => response as T),
        catchError(this.handleError)
      );
  }

  public delete<T>(url: string, options?: any): Observable<T> {
    return this.http
      .delete<HttpEvent<T>>(env.SERVER_URI + url, {
        headers: this.authorizedHeader,
        ...options,
      })
      .pipe(
        map((response) => response as T),
        catchError(this.handleError)
      );
  }

  private get authorizedHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();

    return authHeaders.set(
      'Authorization',
      `Bearer ${this.authLocalStorageService.token}`
    );
  }

  private handleError({ error }: HttpErrorResponse) {
    return throwError(() => error.message);
  }
}
