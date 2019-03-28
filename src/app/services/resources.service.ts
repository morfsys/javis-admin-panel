import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ResourcesService {
  authToken: string = "";
  userName: string = "";
  

  constructor() {}

  

  setToken(data): Observable<void> {
    return new Observable(observer => {
      const { next, error } = observer;
      localStorage.setItem("authToken", data.activeToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("userName", data.userName);
      observer.next();
    });
  }

  setUsername(username) {
    this.userName = username;
  }

  getToken() {
    return localStorage.getItem("authToken");
  }

  getUsername() {
    return localStorage.getItem("userName");
  }

  getRefreshToken() {
    return localStorage.getItem("refreshToken");
  }

  clearToken(router?: any) {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userName');
    if(router) router.navigate(['/signin']);
  }
}
