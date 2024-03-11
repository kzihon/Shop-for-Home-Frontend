import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthLocalStorageService } from '../auth-local-storage/auth-local-storage.service';
import { env } from '../../env';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private authlocalStorageService: AuthLocalStorageService
  ) {}

  public register(registerDetails: any): Observable<any> {
    return this.http
      .post(env.SERVER_URI + '/customer/register', registerDetails)
      .pipe(catchError(this.handleError));
  }

  public login(email: string, password: string): Observable<any> {
    return this.http
      .post(
        env.SERVER_URI + '/auth/authenticate',
        { email, password },
        { observe: 'response' }
      )
      .pipe(
        map((response) => {
          const authorizationHeader = response.headers.get('Authorization')!;
          const bearerToken = authorizationHeader.split(' ')[1];

          const userDetails = (response.body as any).user;

          this.authlocalStorageService.signIn(bearerToken, userDetails);

          return userDetails.role;
        }),
        catchError(this.handleError)
      );
  }

  public logout(): Observable<void> {
    const logoutUrl = `${env.SERVER_URI}/auth/logout`;

    return this.http.post(logoutUrl, {}).pipe(
      map(() => this.authlocalStorageService.signout()),
      catchError(this.handleError)
    );
  }

  private handleError({ error }: HttpErrorResponse) {
    return throwError(() => error.message);
  }
}
