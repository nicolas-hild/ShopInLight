import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route, state: RouterStateSnapshot) {
    let isAuth: boolean;
    this.auth.user$.subscribe(user => {
      if (user) isAuth = true;

      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      isAuth = false;
    }); 
    return isAuth
  }
}
