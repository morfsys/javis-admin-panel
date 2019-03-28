import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  constructor(
    private http: HttpClient
  ) { }

  signIn(username, password): Observable<any> {
    return this.http.post(environment.serverUrl+'/login/validate', {
      "userName": username,
      "password": password
    });
  }

  forgotPassword(email): Observable<any> {
    return this.http.post(
      `${environment.serverUrl}/login/forgotPwd/${email}`,
      ''
    )
  }
 
}
