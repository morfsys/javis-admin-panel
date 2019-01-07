import { AreaService } from "./../area/area.service";
import { RetailerService } from "./retailer.service";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { CityService } from "../city/city.service";

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

  constructor(
    private mService: RetailerService,
    private areaService: AreaService,
    private cityService: CityService
  ) {}

  ngOnInit() {
    this.populateCityOptions();
  }

  formSubmitted = false;
  addItem(form) {
    this.formSubmitted = true;
    if (!form.valid) {
      return false;
    }
    // TODO: Logic to add company
    this.mService
      .addItem(
        Object.assign({ _id: 0 }, this.item, {
          name: this.item.name.toUpperCase(),
          address: this.item.address.toUpperCase()
        })
      )
      .subscribe(company => {
        this.postSubmit.emit();
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
  showAreaSelect: any = [];

  populateCityOptions() {
    this.cityService.getItems().subscribe(
      cities => {
        this.cityOptions = cities.map(
          c => (c = { label: c.name, value: c.name, code: c.code })
        );
        this.showCitySelect = false;
        setTimeout(() => (this.showCitySelect = true), 100);
        $("#add-city-modal").modal("hide");
      },
      err => console.log(err)
    );
  }

  populateAreaOptions() {
    this.areaService.getItems(this.item.city).subscribe(
      cities => {
        console.log(cities);
        this.areaOptions = cities.map(
          c => (c = { label: c.name, value: c.name, code: c.code })
        );
        this.showAreaSelect = false;
        setTimeout(() => (this.showAreaSelect = true), 100);
        $("#add-area-modal").modal("hide");
      },
      err => console.log(err)
    );
  }

  citySelectChanged() {
    console.log(this.item.city);
    this.populateAreaOptions();
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
