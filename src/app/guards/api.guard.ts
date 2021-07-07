import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../shared/auth.service";

@Injectable({
  providedIn: 'root'
})
export class ApiGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const authed = Boolean(this.auth.getUser());

    if (!authed) {
      this.router.navigateByUrl('/login');
    }

    return authed;
  }

}
