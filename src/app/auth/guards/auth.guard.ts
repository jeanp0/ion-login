import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.renewToken().pipe(
      tap((valid) => {
        if (!valid) {
          this.navigateToLogin();
        }
      })
    );
  }

  canLoad(): Observable<boolean> {
    return this.authService.renewToken().pipe(
      tap((valid) => {
        if (!valid) {
          this.navigateToLogin();
        }
      })
    );
  }

  private navigateToLogin() {
    this.router.navigate(['/auth/login']);
  }
}
