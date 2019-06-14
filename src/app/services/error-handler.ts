import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as noty from 'noty';
@Injectable({
    providedIn: 'root'
  })
export class ErrorHandlerService {
    constructor(
    ){}
    log(...args) {
        
        console.log(...args);
    } 
    showNoty(options) {
      new noty({...{
        text: "Error here",
        type: "error",
        layout: "topRight",
        timeout: 1000
      }, ...options}).show();
    }
    handleError<T> (operation = 'operation', result?: T, notify?:boolean) {
        return (error: any): Observable<T> => {
            
        
          // TODO: send the error to remote logging infrastructure
          console.error(error); // log to console instead
       
          // TODO: better job of transforming error for user consumption
          this.log(`${operation} failed: ${error.message}`);
          if(notify) {
            this.showNoty({
              text: error.error.message
            })
          }
          
          // Let the app keep running by returning an empty result.
          return of(result as T);
        };
      }
}
