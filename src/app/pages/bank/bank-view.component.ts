import { CountryService } from './../country/country.service';
import { BankService } from './bank.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ErrorHandlerService } from 'src/app/services/error-handler';

declare var $: any;

@Component({
    selector: 'app-bank-view',
    templateUrl: './bank-view.component.html'
})
export class BankViewComponent implements OnInit {


    @Input('view-item') item = {
        _id: 0,
        name: '',
        country: ""
    };
    @Input('cancel-allowed') cancelAllowed = false;
    @Output() postSubmit = new EventEmitter();
    @Output() clickedCancel = new EventEmitter();

    constructor(
        private mService: BankService,
        private countryService: CountryService,
        private errorHandler: ErrorHandlerService
    ) { }

    ngOnInit() {
        this.populateCountryOptions();
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
        this.mService.addItem(Object.assign({ _id: 0 }, this.item, {
            name: this.item.name.toUpperCase()
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


    selectizeConfig: any = {
        labelField: 'label',
        valueField: 'value',
        searchField: ['label']
    };

    countryOptions: any = [];
    showCountrySelect: boolean = true;
    populateCountryOptions() {
        this.countryService.getItems().subscribe(
            countries => {
                console.log(countries);
                this.countryOptions = countries.map(c => c = { label: c.name, value: c._id, code: c.code });
                this.showCountrySelect = false;
                setTimeout(() => this.showCountrySelect = true, 100);
            },
            err => console.log(err));
    }

}
