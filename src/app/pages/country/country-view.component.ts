import { CountryService } from './country.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ErrorHandlerService } from 'src/app/services/error-handler';

declare var $: any;

@Component({
    selector: 'app-country-view',
    templateUrl: './country-view.component.html'
})
export class CountryViewComponent implements OnInit {


    @Input('view-item') item = {
        _id: 0,
        name: '',
        code: "",
        isd: "",
        currency: "",
        currencyCode: ""
    };
    @Input('cancel-allowed') cancelAllowed = false;
    @Output() postSubmit = new EventEmitter();
    @Output() clickedCancel = new EventEmitter();

    constructor(
        private mService: CountryService,
        private errorHandler: ErrorHandlerService
    ) { }

    ngOnInit() {

    }

    formSubmitted = false;
    addItem(form) {
        form.failed = false;
        form.failedMessage = '';
        $('.alert-danger').hide();
        this.formSubmitted = true;
        if (!form.valid) {
            return false;
        }
        // TODO: Logic to add company
        this.mService.addItem(Object.assign({ _id: 0 }, this.item, {
            name: this.item.name.toUpperCase(),
            code: this.item.code.toUpperCase(),
            currency: this.item.currency.toUpperCase(),
            currencyCode: this.item.currencyCode.toUpperCase()
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
