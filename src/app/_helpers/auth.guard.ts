import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AccountService } from 'src/app/_services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private accountService: AccountService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.accountService.userValue;
    //get queryString from url
    const url = window.location.href;
    let token;
    let emailid;
    if (url.includes('?')) {
      const httpParams = new HttpParams({ fromString: url.split('?')[1] });
      if (url.indexOf) {
        token = httpParams.get('token');
        emailid = httpParams.get('email');
      }
    }
    if (user) {
      // authorised so return true
      return true;
    }
    else if (token && emailid) {
      // token & emailid is not null and verifypassword then redirect verifypassword
      this.router.navigate(['/Account/verifypassword'], { queryParams: { token: token, email: emailid } });
      return false;
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/Account/Login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
