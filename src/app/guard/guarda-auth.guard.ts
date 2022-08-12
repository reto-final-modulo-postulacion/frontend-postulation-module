import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from "../authentication/service/auth.service";

@Injectable({
  providedIn: 'root'
})
export class GuardaAuthGuard implements CanActivate {

  constructor(
    private router: Router,
    public authService: AuthService
  ) { }

    async redirectTo(): Promise<any> {

		  const uId = await JSON.parse(localStorage.getItem("user")!);
			  if (!uId) {
          this.router.navigate(["/","list/login"]);
          return false;
			  }
			  return true;
    }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return  this.redirectTo();
  }

}
