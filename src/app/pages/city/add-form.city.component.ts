import { StateService } from './../state/state.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { CityService } from './city.service';
declare var $: any;

@Component({
    selector: 'city-add-form',
    template: `
    <form autocomplete="off" (submit)="addCity(cityform.form)" #cityform="ngForm">
        <div class="row">
            <div class="col">
            <div class="form-group">
                <label>City Name</label>
                <input placeholder="City name" #cityField="ngModel" type="text" class="form-control" [class.is-invalid]="(formSubmitted || cityField.touched) && !cityField.valid" name="cityName" [(ngModel)]="city.name" required pattern="[\\w]+">
                <div class="invalid-feedback">
                    City is required.
                </div>
            </div>
            </div>
            <div class="w-100 d-md-none"></div>
            <div class="col">
            <div class="form-group">
                <label>City Code</label>
                <input placeholder="City code"  #codeField="ngModel" type="text" class="form-control" [class.is-invalid]="(formSubmitted || codeField.touched) && !codeField.valid" name="cityName" name="cityCode" [(ngModel)]="city.code" required>
                <div class="invalid-feedback">
                    Code is required.
                </div>
            </div>
            </div>
        </div>
        <div class="row">
            <div class="col">
            <div class="form-group">
                <label>Population</label>
                <input placeholder="Population"  #popField="ngModel" type="number" class="form-control" [class.is-invalid]="(formSubmitted || popField.touched) && !popField.valid" name="cityName" name="population" [(ngModel)]="city.population" required>
                <div class="invalid-feedback">
                    Population is required.
                </div>
            </div>
            </div>
            <div class="w-100 d-md-none"></div>
            <div class="col">
            <div class="form-group">
                <label>STD code</label>
                <input placeholder="STD Code" type="number"  #stdCode="ngModel" class="form-control" [class.is-invalid]="(formSubmitted || stdCode.touched) && !stdCode.valid" name="cityName" name="stdCode" [(ngModel)]="city.stdCode" required pattern="['\\d']{4}">
                <div class="invalid-feedback">
                    STD code is required.
                </div>
            </div>
            </div>
            <div class="w-100 d-md-none"></div>
            <div class="col">
            <div class="form-group">
                <label>State</label>
                <ng-selectize name="state" #stateField="ngModel" placeholder="SELECT STATE" [class.is-invalid]="(formSubmitted || stateField.touched) && !stateField.valid" name="stateField" [config]="selectizeConfig" [options]="stateOptions" [(ngModel)]="city.state" required></ng-selectize>
                <div class="invalid-feedback">
                    State is required.
                </div>
            </div>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="text-right mrg-top-5">
                    <button type="submit" class="btn btn-primary m-0" id="submit-button" [style.display]="showSubmit?'inline-block':'none'">Save</button>
                </div>
            </div>
        </div>
    </form>
  `,
  styleUrls: ['./add-form.city.component.css']
})
export class AddFormCityComponent implements OnInit {

    @Input('city') city;
    @Input('show-submit') showSubmit: boolean = false;
    @Output() postSubmit = new EventEmitter();
    @ViewChild('cityform') cityForm;

    constructor(
        private stateService: StateService,
        private cityService: CityService
    ) { }

    ngOnInit() {
        this.populateStateOptions();
        this.cityService.issueSubmit.subscribe(()=>{
            this.addCity(this.cityForm.form);
        })
    }

    selectizeConfig: any = {
        labelField: 'label',
        valueField: 'value',
        searchField: ['label']
    };
    stateOptions = [];
    populateStateOptions() {
        this.stateService.getItems().subscribe(
            states => this.stateOptions = states.map( s => s = { label: s.name, value: s.name, code: s.code } ),
            err => console.log(err)
        )
    }

    formSubmitted = false;
    addCity(form) {
        this.formSubmitted = true;
        if(!form.valid) {
            return false;
        }
        this.cityService.addItem(Object.assign({
            name: '',
            code: '',
            population: 0,
            stdCode: "",
            state: ''
        }, this.city, {
            name: this.city.name.toUpperCase(),
            code: this.city.code.toUpperCase()
        })).subscribe(city=>{
            this.postSubmit.emit(city);
        })
    }

}
