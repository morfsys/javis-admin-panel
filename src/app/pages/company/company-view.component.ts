import { CityService } from './../city/city.service';
import { CompanyService } from './company.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

declare var $: any;

@Component({
    selector: 'app-company-view',
    templateUrl: './company-view.component.html',
    styleUrls: ['./company-view.component.css']
})
export class CompanyViewComponent implements OnInit {


    @Input('view-item') item = {
        _id: 0
    };
    @Input('cancel-allowed') cancelAllowed = false;
    @Output() postSubmit = new EventEmitter();
    @Output() clickedCancel = new EventEmitter();

    constructor(
        private companyService: CompanyService,
        private cityService: CityService
    ) { }

    ngOnInit() {
        this.populateCityOptions();
    }

    selectizeConfig: any = {
        labelField: 'label',
        valueField: 'value',
        searchField: ['label']
    };

    cityOptions: any = [];
    companySubmitted = false;
    addCompany(form) {
        this.companySubmitted = true;
        console.log(form.valid)
        if(!form.valid) {
            return false;
        }
        // TODO: Logic to add company
        this.companyService.addCompany(Object.assign({_id: 0}, this.item)).subscribe(company => {
            
            this.postSubmit.emit();
        })
    }
    showCitySelect = true;
    populateCityOptions() {
        this.cityService.getCities().subscribe(
            cities => {
                this.cityOptions = cities.map(c => c = { label: c.name, value: c.name, code: c.code });
                this.showCitySelect = false;
                setTimeout(()=>this.showCitySelect=true, 100);
                $('#add-city-modal').modal('hide');
            },
            err => console.log(err));
    }

    addNewCity() {
        $('#add-city-modal').modal('show');
    }

    city = {};
 
    saveCity() {
        this.cityService.issueSubmit.next();
    }

}
