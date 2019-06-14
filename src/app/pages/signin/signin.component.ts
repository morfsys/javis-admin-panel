import { Component, OnInit, ViewChild } from '@angular/core';
import { SigninService } from './signin.service';
import { Router } from '@angular/router';
import { ResourcesService } from 'src/app/services/resources.service';
import { ErrorHandlerService } from 'src/app/services/error-handler';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(
    private signinService: SigninService,
    private router: Router,
    private resource: ResourcesService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.resource.clearToken();
  }

  loginUser(form, username, password) {
    // form = {
    //   ...form,
    //   failed: false,
    //   failMessage: false
    // };
    form.failed = false;
    form.failMessage = "";
    this.fgForm.success = false;
    console.log(form);
    if(!form.valid) {
      return console.log('Form is invalid');
    }
    this.signinService.signIn(username, password).subscribe(resp=>{
      console.log(resp);
      if(resp.status == 0) {
        this.errorHandler.showNoty({
          text: resp.message
      })
        return false;
      }
      // this.errorHandler.showNoty({
      //   type: "success",
      //   text: "Successfully logged in"
      // })
      this.resource.setToken(resp).subscribe(()=>{
        this.router.navigate(['/dashboard']);
      }, err=>{
        console.log(err);
      })
      
    }, err=>{
      console.log(err.message);
    });
  }

  @ViewChild('fgForm') fgForm;
  forgotPasswordForm: boolean = false;

  sendFGEmail(form, email) {
    // form = {
    //   ...form,
    //   failed: false,
    //   failMessage: false
    // };
    form.failed = false;
    form.success = false;
    form.failMessage = "";
    form.processing = true;
    console.log(form);
    if(!form.valid) {
      return console.log('Form is invalid');
    }
    this.signinService.forgotPassword(email).subscribe(resp=>{
      form.processing = false;
      if(resp.message != 'SUCCESS') {
        form.failed = true;
        form.failMessage = resp.message;
        return false;
      }
      this.forgotPasswordForm = false;
      this.fgForm.success = true;

      
    }, err=>{
      console.log(err.message);
    });
  }
}
