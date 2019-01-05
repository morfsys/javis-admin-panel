import { UQCService } from './uqc.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

declare var $: any;

@Component({
    selector: 'app-uqc-view',
    templateUrl: './uqc-view.component.html'
})
export class UQCViewComponent implements OnInit {


    @Input('view-item') item = {
        _id: 0,
        code: "",
        description: ""
    };
    @Input('cancel-allowed') cancelAllowed = false;
    @Output() postSubmit = new EventEmitter();
    @Output() clickedCancel = new EventEmitter();

    constructor(
        private mService: UQCService
    ) { }

    ngOnInit() {

    }

    formSubmitted = false;
    addItem(form) {

        this.formSubmitted = true;
        if (!form.valid) {
            return false;
        }
        // TODO: Logic to add company
        this.mService.addItem(Object.assign({ _id: 0 }, this.item, {
            code: this.item.code.toUpperCase(),
            description: this.item.description.toUpperCase()
        })).subscribe(company => {

            this.postSubmit.emit();
        })
    }


}
