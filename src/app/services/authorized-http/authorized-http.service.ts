import { Injectable } from '@angular/core';
import { env } from '../../env';
import {
  HttpClient,
  HttpHeaders,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { AuthLocalStorageService } from '../auth-local-storage/auth-local-storage.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthorizedHttpService {
  private BASE_SERVER_URI = env.SERVER_URI;

  constructor(
    private http: HttpClient,
    private authLocalStorageService: AuthLocalStorageService
  ) {}

  public get<T>(url: string, options?: any): Observable<T> {
    return this.http
      .get<HttpEvent<T>>(this.BASE_SERVER_URI + url, {
        headers: this.authorizedHeader,
        ...options,
      })
      .pipe(
        map((event) => {
          if (event instanceof HttpResponse) {
            return event.body as T;
          }

          return null;
        })
      );
  }

  public post<T>(url: string, data: any, options?: any): Observable<T> {
    return this.http
      .post<HttpEvent<T>>(this.BASE_SERVER_URI + url, data, {
        headers: this.authorizedHeader,
        ...options,
      })
      .pipe(
        map((event) => {
          if (event instanceof HttpResponse) {
            return event.body as T;
          }

          return null;
        })
      );
  }

  public put<T>(url: string, data: any, options?: any): Observable<T> {
    return this.http
      .put<HttpEvent<T>>(this.BASE_SERVER_URI + url, data, {
        headers: this.authorizedHeader,
        ...options,
      })
      .pipe(
        map((event) => {
          if (event instanceof HttpResponse) {
            return event.body as T;
          }

          return null;
        })
      );
  }

  public delete<T>(url: string, options?: any): Observable<T> {
    return this.http
      .delete<HttpEvent<T>>(this.BASE_SERVER_URI + url, {
        headers: this.authorizedHeader,
        ...options,
      })
      .pipe(
        map((event) => {
          if (event instanceof HttpResponse) {
            return event.body as T;
          }

          return null;
        })
      );
  }

  private get authorizedHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();

    return authHeaders.set(
      'Authorization',
      `Bearer ${this.authLocalStorageService.token}`
    );
  }
}
