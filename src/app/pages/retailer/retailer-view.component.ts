import { AreaService } from "./../area/area.service";
import { RetailerService } from "./retailer.service";
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from "@angular/core";
import { CityService } from "../city/city.service";
import { ChannelService } from "../channel/channel.service";
import { ErrorHandlerService } from "src/app/services/error-handler";

declare var $: any;

@Component({
  selector: "app-retailer-view",
  templateUrl: "./retailer-view.component.html"
})
export class RetailerViewComponent implements OnInit {
  @Input("view-item") item = {
    _id: 0,
    name: "",
    mobile: "",
    altMobile: "",
    landline: {
      isd: "",
      std: "",
      number: ""
    },
    address: "",
    pincode: "",
    area: "",
    city: "",
    channel: "",
    FSSAILicense: "",
    latitude: "",
    longitude: "",
    endDate: ""
  };
  @Input("cancel-allowed") cancelAllowed = false;
  @Output() postSubmit = new EventEmitter();
  @Output() clickedCancel = new EventEmitter();
  @ViewChild('datePicker') datePicker;

  constructor(
    private mService: RetailerService,
    private areaService: AreaService,
    private cityService: CityService,
    private channelService: ChannelService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.populateCityOptions();
    this.populateChannelOptions();
    this.populateAreaOptions();
  }

  formSubmitted = false;
  addItem(form) {
    form.failed = false;
    form.failedMessage = '';
    this.formSubmitted = true;
    if (!form.valid) {
      return false;
    }
    // TODO: Logic to add company
    this.mService
      .addItem(
        Object.assign({ _id: 0 }, this.item, {
          name: this.item.name.toUpperCase(),
          address: this.item.address.toUpperCase(),
          endDate: this.datePicker.nativeElement.value
        })
      )
      .subscribe(item => {
        if (item.level != "Error") {
          this.postSubmit.emit(item);
        } else {
          this.errorHandler.showNoty({
            text: item.message
          })
        }
      });
  }

  selectizeConfig: any = {
    labelField: "label",
    valueField: "value",
    searchField: ["label"]
  };

  cityOptions: any = [];
  showCitySelect = true;
  areaOptions: any = [];
  showAreaSelect: boolean = true;

  populateCityOptions() {
    this.cityService.getItems().subscribe(
      cities => {
        this.cityOptions = cities.map(
          c => (c = { label: c.name, value: c._id, code: c.code })
        );
        this.showCitySelect = false;
        setTimeout(() => (this.showCitySelect = true), 100);
        $("#add-city-modal").modal("hide");
      },
      err => console.log(err)
    );
  }

  populateAreaOptions() {
    // this.areaService.getItems(this.item.city).subscribe(
    this.areaService.getItems().subscribe(
      cities => {
        this.areaOptions = cities.map(
          c => (c = { label: c.name, value: c._id, code: c.code })
        );
        this.showAreaSelect = false;
        console.log(this.areaOptions);
        setTimeout(() => (this.showAreaSelect = true), 100);
        $("#add-area-modal").modal("hide");
      },
      err => console.log(err)
    );
  }

  channelOptions = [];
  showChannelSelect: boolean = true;
  populateChannelOptions() {
    this.channelService.getItems().subscribe(
      channels => {
        console.log(channels);
        this.channelOptions = channels.map(
          c => (c = { label: c.name, value: c._id, code: c.name })
        );
        this.showChannelSelect = false;
        setTimeout(() => (this.showChannelSelect = true), 100);
      },
      err => console.log(err)
    );
  }

  citySelectChanged() {
    console.log(this.item.city);
    // this.populateAreaOptions();
  }

  city = {};
  area = {};

  addNewCity() {
    $("#add-city-modal").modal("show");
  }
  saveCity() {
    this.cityService.issueSubmit.next();
  }
  addNewArea() {
    $("#add-area-modal").modal("show");
  }
  saveArea() {
    this.areaService.issueSubmit.next();
  }
}
