import { CityService } from './../city/city.service';
import { CompanyService } from './company.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ErrorHandlerService } from 'src/app/services/error-handler';

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
        private cityService: CityService,
        private errorHandler: ErrorHandlerService
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
        form.failed = false;
        form.failedMessage = '';
        
        this.companySubmitted = true;
        if(!form.valid) {
            return false;
        }
        // TODO: Logic to add company
        this.companyService.addCompany(Object.assign({_id: 0}, this.item, {
            name: this.item.name.toUpperCase(),
            code: this.item.code.toUpperCase(),
            gstin: this.item.gstin.toUpperCase(),
            pan: this.item.pan.toUpperCase(),
            address_1: this.item.address_1.toUpperCase(),
            address_2: this.item.address_2.toUpperCase()
        })).subscribe(company => {
            if(company.level != "Error") {
                this.postSubmit.emit();
            }else{
                this.errorHandler.showNoty({
                    text: company.message
                  })
            }
        })
    }
    showCitySelect = true;
    populateCityOptions() {
        this.cityService.getItems().subscribe(
            cities => {
                this.cityOptions = cities.map(c => c = { label: c.name, value: c._id, code: c.code });
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
