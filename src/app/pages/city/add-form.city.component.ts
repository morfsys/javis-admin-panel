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
                <label>City Name*</label>
                <input placeholder="City name" type="text" class="form-control" name="cityName" [(ngModel)]="city.name" required>
            </div>
            </div>
            <div class="w-100 d-md-none"></div>
            <div class="col">
            <div class="form-group">
                <label>City Code*</label>
                <input placeholder="City code" type="text" class="form-control" name="cityCode" [(ngModel)]="city.code" required>
            </div>
            </div>
        </div>
        <div class="row">
            <div class="col">
            <div class="form-group">
                <label>Population*</label>
                <input placeholder="Population" type="number" class="form-control" name="population" [(ngModel)]="city.population" required>
            </div>
            </div>
            <div class="w-100 d-md-none"></div>
            <div class="col">
            <div class="form-group">
                <label>STD code*</label>
                <input placeholder="STD Code" type="number" class="form-control" name="stdCode" [(ngModel)]="city.stdCode" required>
            </div>
            </div>
            <div class="w-100 d-md-none"></div>
            <div class="col">
            <div class="form-group">
                <label>State*</label>
                <ng-selectize name="state" [config]="selectizeConfig" [options]="stateOptions" [(ngModel)]="city.state" required></ng-selectize>
            </div>
            </div>
        </div>
        <div [style.display]="formSubmitted && !cityform.form.valid  ? 'inherit':'none'" class="alert alert-danger">Required fields missing</div>
        <button type="submit" [style.display]="'none'" id="submit-button"></button>
    </form>
  `
})
export class AddFormCityComponent implements OnInit {

    @Input('city') city;
    @Output() postSubmit = new EventEmitter();
    @ViewChild('cityform') cityForm;

    constructor(
        private stateService: StateService,
        private cityService: CityService
    ) { }

    ngOnInit() {
        this.populateStateOptions();
        this.cityService.issueSubmit.subscribe(()=>{
            // $(this.cityForm.nativeElement).find('#submit-button').click();
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
        this.stateService.getStates().subscribe(
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
        this.cityService.addCity(Object.assign({
            name: '',
            code: '',
            population: 0,
            stdCode: "",
            state: ''
        }, this.city)).subscribe(city=>{
            this.postSubmit.emit(city);
        })
    }

}
