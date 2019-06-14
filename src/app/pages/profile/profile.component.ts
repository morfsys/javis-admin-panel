import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { ResourcesService } from "src/app/services/resources.service";
import { ErrorHandlerService } from "src/app/services/error-handler";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  constructor(private http: HttpClient, private resource: ResourcesService, private errorHandler: ErrorHandlerService) {}

  ngOnInit() {}

  cpFormSubmitted: boolean = false;

  changePassword(input, field) {
    this.cpFormSubmitted = true;
    input.success = false;
    if (!input.valid) {
      return false;
    }
    this.http.post<any>(`${environment.serverUrl}/login/changePwd`, {
      userName: this.resource.getUsername(),
      password: field
    })
    .subscribe(v=>{
      // input.success = true;
      this.errorHandler.showNoty({
        text: "Updated",
        type: "success"
      })
    })
  }
}
