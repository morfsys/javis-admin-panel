import { OutletService } from './outlet.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ErrorHandlerService } from 'src/app/services/error-handler';

declare var $: any;

@Component({
    selector: 'app-outlet-view',
    templateUrl: './outlet-view.component.html'
})
export class OutletViewComponent implements OnInit {


    @Input('view-item') item = {
        _id: 0,
        name: '',
        mobile: "",
        altMobile: "",
        landline: "",
        address: ""
    };
    @Input('cancel-allowed') cancelAllowed = false;
    @Output() postSubmit = new EventEmitter();
    @Output() clickedCancel = new EventEmitter();

    constructor(
        private mService: OutletService,
        private errorHandler: ErrorHandlerService
    ) { }

    ngOnInit() {

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
            name: this.item.name.toUpperCase(),
            address: this.item.address.toUpperCase()
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
