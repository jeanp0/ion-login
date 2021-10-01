import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from 'src/app/common/interfaces/User';
import { AUTH_HEADER } from 'src/app/config/headers';
import { TOKEN_KEY } from 'src/app/config/localStorage';
import { AuthResponse } from '../interfaces/AuthResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: User;

  get authUser() {
    return { ...this.user };
  }

  get token() {
    return localStorage.getItem(TOKEN_KEY) || '';
  }

  set token(tokenValue: string) {
    localStorage.setItem(TOKEN_KEY, tokenValue);
  }

  constructor(private http: HttpClient) {}

  authenticate(): Observable<boolean> {
    if (!this.token) {
      return of(false);
    }
    return this.validateToken(this.token);
  }

  private validateToken(token: string): Observable<boolean> {
    const url = '';
    const headers = new HttpHeaders().set(AUTH_HEADER, token);
    return this.http.post<AuthResponse>(url, { headers }).pipe(
      map((res) => {
        //refresh token
        this.token = res.token;
        this.user = {
          uid: res.uid,
          name: res.name,
          email: res.email,
        };

        return res.ok;
      }),
      catchError((err) => of(false))
    );
  }
}
