import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ResourcesService } from './resources.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService {
  helper = new JwtHelperService();

  canActivate() {
    let authToken = this.resource.getToken();
    let access = authToken && !this.helper.isTokenExpired(authToken);
    if(!access) {
      this.resource.clearToken(this.router);
    }
    return access;
  }
  constructor(private resource: ResourcesService, private router: Router) { 
  }
}
