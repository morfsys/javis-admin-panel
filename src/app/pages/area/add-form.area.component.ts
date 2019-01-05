import { CityService } from './../city/city.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { AreaService } from './area.service';
declare var $: any;

@Component({
    selector: 'area-add-form',
    template: `
    <form autocomplete="off" (submit)="addItem(areaForm)" #areaForm="ngForm" class="uppercase-form">
        <div class="row">
        <div class="col">
            <div class="form-group">
            <label>Area Name</label>
            <input type="text" name="areaName" #areaName="ngModel" placeholder="Enter area name" class="form-control"
                [class.is-invalid]="(formSubmitted || areaName.touched) && !areaName.valid" [(ngModel)]="item.name"
                required pattern="[a-zA-Z]+">
            <div class="invalid-feedback">
                {{'Area name is required.'}}
            </div>
            </div>
        </div>
        <div class="w-100 d-md-none"></div>
        <div class="col">
            <div class="form-group">
            <label>City</label>
            <ng-selectize *ngIf="showCitySelect" #city="ngSelectize" [class.is-invalid]="formSubmitted && !city.hasNgValid"
                placeholder="SELECT CITY" name="city" [config]="selectizeConfig" [options]="cityOptions"
                [(ngModel)]="item.city" required></ng-selectize>
            <div class="invalid-feedback">
                City is required.
            </div>
            <div class="w-100 text-right">
                <small class="cursor-pointer" (click)="addNewCity()">+ Add new city</small>
            </div>
            </div>
        </div>
        </div>
        <div class="row" [style.display]="showSubmit?'inline-block':'none'">
            <div class="col">
                <div class="text-right mrg-top-5">
                <button type="submit" class="btn btn-primary m-0">Save</button>
                </div>
            </div>
        </div>
    </form>

    <div class="modal" tabindex="-1" role="dialog" id="add-city-modal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Add City</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <city-add-form [city]="city" (postSubmit)="populateCityOptions()"></city-add-form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" (click)="saveCity()">Save</button>
            </div>
            </div>
        </div>
    </div>
  `
})
export class AddFormAreaComponent implements OnInit {

    @Input('area') item;
    @Input('show-submit') showSubmit: boolean = false;
    @Output() postSubmit = new EventEmitter();
    @ViewChild('areaForm') areaForm;

    constructor(
        private cityService: CityService,
        private areaService: AreaService
    ) { }

    ngOnInit() {
        this.populateCityOptions();
        this.areaService.issueSubmit.subscribe(()=>{
            this.addArea(this.areaForm.form);
        })
    }

    selectizeConfig: any = {
        labelField: 'label',
        valueField: 'value',
        searchField: ['label']
    };
    cityOptions = [];
    showCitySelect = true;
    populateCityOptions() {
        this.cityService.getItems().subscribe(
            cities => {
                this.showCitySelect = false;
                this.cityOptions = cities.map( s => s = { label: s.name, value: s.name, code: s.code } );
                setTimeout(()=>this.showCitySelect=true, 100);

            },
            err => console.log(err)
        )
    }

    formSubmitted = false;
    addArea(form) {
        this.formSubmitted = true;
        if(!form.valid) {
            return false;
        }
        this.areaService.addItem(Object.assign({
            name: '',
            city: ""
        }, this.item, {
            name: this.item.name.toUpperCase()
        })).subscribe(item=>{
            this.postSubmit.emit(item);
        })
    }

    
    addNewCity() {
        $('#add-city-modal').modal('show');
    }

    city = {};
 
    saveCity() {
        this.cityService.issueSubmit.next();
    }


}
