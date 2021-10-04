import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LOGIN_URI, REFRESH_TOKEN_URI } from 'src/app/config/api.config';
import { BEARER } from 'src/app/config/auth.config';
import { AUTHORIZATION } from 'src/app/config/headers.config';
import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
} from 'src/app/config/local-storage.config';
import { GENERIC_ERROR_MESSAGE } from 'src/app/config/messages.config';
import { User } from 'src/app/shared/interfaces/user.interface';
import { ToastsService } from 'src/app/shared/services/toasts.service';
import {
  LoginResponse,
  RefreshTokenResponse,
} from '../interfaces/responses.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: User;

  get authUser() {
    return { ...this.user };
  }

  get accessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY) || '';
  }

  set accessToken(tokenValue: string) {
    localStorage.setItem(ACCESS_TOKEN_KEY, `${BEARER}${tokenValue}`);
  }

  get refreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_KEY) || '';
  }

  set refreshToken(tokenValue: string) {
    localStorage.setItem(REFRESH_TOKEN_KEY, `${BEARER}${tokenValue}`);
  }

  constructor(private http: HttpClient, private toastService: ToastsService) {}

  login(email: string, password: string): Observable<string> {
    const params = new HttpParams()
      .set('username', email)
      .set('password', password);
    const observable = this.http.post<LoginResponse>(LOGIN_URI, null, {
      params,
    });
    return observable.pipe(
      tap((res) => {
        const { uid, name, username } = res;
        this.accessToken = res.accessToken;
        this.refreshToken = res.refreshToken;
        this.user = { uid, name, email: username };
      }),
      map((_) => 'autenticación exitosa')
    );
  }

  logout() {
    localStorage.clear();
  }

  renewToken(): Observable<boolean> {
    if (!this.refreshToken) {
      console.log('no se encontró token');
      return of(false);
    }
    console.log('renovando token...');
    const headers = new HttpHeaders().set(AUTHORIZATION, this.refreshToken);
    return this.http
      .post<RefreshTokenResponse>(REFRESH_TOKEN_URI, null, { headers })
      .pipe(
        map((res) => {
          //refresh token
          const { uid, name, username } = res;
          this.accessToken = res.accessToken;
          this.refreshToken = res.refreshToken;
          this.user = { uid, name, email: username };
          return true;
        }),
        catchError((err) => {
          const { error } = err;
          this.toastService.presentToast(
            error.message || GENERIC_ERROR_MESSAGE
          );
          return of(false);
        })
      );
  }
}
