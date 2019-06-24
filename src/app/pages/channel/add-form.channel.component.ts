import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild
} from "@angular/core";
import { ChannelService } from "./channel.service";
import { ErrorHandlerService } from "src/app/services/error-handler";
declare var $: any;

@Component({
  selector: "channel-add-form",
  template: `
  <form autocomplete="off" (submit)="addItem(channelForm)" #channelForm="ngForm" class="uppercase-form">
  <div class="row">
    <div class="col">
      <div class="form-group">
        <label>Channel name</label>
        <input type="text" name="channelName" #channelName="ngModel" placeholder="Enter Channel name"
          class="form-control" [class.is-invalid]="(formSubmitted || channelName.touched) && !channelName.valid"
          [(ngModel)]="item.name" required pattern="[a-zA-Z0-9\\s]+">
        <div class="invalid-feedback">
          {{'Channel name is required.'}}
        </div>
      </div>
    </div>
    <div class="w-100"></div>
    <div class="col">
      <div class="form-group">
        <label>Channel Description</label>
        <input type="text" name="channelDescription" #channelDescription="ngModel" placeholder="Enter UQC description"
          class="form-control" [class.is-invalid]="(formSubmitted || channelDescription.touched) && !channelDescription.valid"
          [(ngModel)]="item.description" required>
        <div class="invalid-feedback">
          {{'Channel description is required.'}}
        </div>
      </div>
    </div>
  </div>
  <div
    class="alert alert-danger"
    [style.display]="channelForm.failed?'inherit':'none'"
  >{{channelForm.failedMessage}}</div>
  <div class="row">
    <div class="col">
      <div class="text-right mrg-top-5">
        <button type="submit" class="btn btn-primary m-0">Save</button>
      </div>
    </div>
  </div>
</form>

  `
})
export class AddFormChannelComponent implements OnInit {
  @Input("channel") item={
      _id: 0,
      name: "",
      description: ""
  };
  @Input("show-submit") showSubmit: boolean = false;
  @Output() postSubmit = new EventEmitter();
  @ViewChild("channelForm") channelForm;
 // @Input("show-add-city") showAddCity: Boolean = true;

  constructor(
    private errorHandler: ErrorHandlerService,
    private channelService: ChannelService
  ) {}

  ngOnInit() {
    
  }

  selectizeConfig: any = {
    labelField: "label",
    valueField: "value",
    searchField: ["label"]
  };
  

  formSubmitted = false;

  addItem(form) {
    form.failed = false;
    form.failedMessage = '';
    form.failed = false;
    form.failedMessage = '';
    this.formSubmitted = true;
    if (!form.valid) {
      return false;
    }
    form.failed = false;
        form.failedMessage = '';
        this.formSubmitted = true;
        if (!form.valid) {
            return false;
        }
        // TODO: Logic to add company
        this.channelService.addItem(Object.assign({ _id: 0 }, this.item, {
            name: this.item.name.toUpperCase(),
            description: this.item.description.toUpperCase()
        })).subscribe(item => {
            if(item.level != "Error") {
                this.postSubmit.emit(item);
              }else{
                this.errorHandler.showNoty({
                    text: item.message
                  })
              }
        })
  }

}
