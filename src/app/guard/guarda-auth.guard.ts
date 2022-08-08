import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuardaAuthGuard implements CanActivate {

  constructor(
    private router: Router,
  ) { }

    redirectTo(flag: boolean): boolean {
      if(!flag){
        this.router.navigate(["list/login"]);
        return false;
      }

      return true
    }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      const { uid } = JSON.parse(localStorage.getItem("user")!);
      return this.redirectTo(uid);  
  }

}
