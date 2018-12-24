import { CityService } from './../city/city.service';
import { CompanyService } from './company.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

declare var $: any;

@Component({
    selector: 'app-company-view',
    templateUrl: './company-view.component.html'
})
export class CompanyViewComponent implements OnInit {


    @Input('view-item') item = {
        _id: 0,
        name: '',
        code: '',
        gstin: '',
        pan: '',
        pincode: '',
        address_1: '',
        address_2: '',
        city: ''
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
        if(!form.valid) {
            return false;
        }
        // TODO: Logic to add company
        // let {name, code, gstin, pan, pincode, city, address_1, address_2} = this.item;
        this.companyService.addCompany(Object.assign({_id: 0}, this.item, {
            name: this.item.name.toUpperCase(),
            code: this.item.code.toUpperCase(),
            gstin: this.item.gstin.toUpperCase(),
            pan: this.item.pan.toUpperCase(),
            address_1: this.item.address_1.toUpperCase(),
            address_2: this.item.address_2.toUpperCase()
        })).subscribe(company => {
            
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
