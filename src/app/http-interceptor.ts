import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Observable, Subscription, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";


@Injectable({
    providedIn: 'root'
})
export class MyHttpInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>  {
        let authReq = req.clone();
        if(req.url.match(/validate|signup|forgotPwd/g)) {
             authReq = authReq.clone();
        }else{
             authReq = authReq.clone({
                headers: req.headers.set('Authorization', 'Bearer '+localStorage.getItem('authToken'))
              });
        }

        return next.handle(authReq)
        .pipe(
            map((ev:HttpEvent<any>)=>{
                // if(ev instanceof HttpResponse) {
                //     console.log("event::", ev);
                // }
                return ev;
            }),
            catchError((err: HttpErrorResponse)=>{
                // console.log(err);
                return throwError(err);
            })
        )

       
    }
}
