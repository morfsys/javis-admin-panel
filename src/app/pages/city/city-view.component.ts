import { CityService } from './city.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

declare var $: any;

@Component({
    selector: 'app-city-view',
    templateUrl: './city-view.component.html'
})
export class CityViewComponent implements OnInit {


    @Input('view-item') item = {
        _id: 0,
        name: "",
        code: "",
        population: "",
        stdCode: "",
        state: ""
    };
    @Input('cancel-allowed') cancelAllowed = false;
    @Output() postSubmit = new EventEmitter();
    @Output() clickedCancel = new EventEmitter();

    constructor(
        private mService: CityService
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
            name: this.item.name.toUpperCase(),
            code: this.item.code.toUpperCase(),
            state: this.item.state.toUpperCase()
        })).subscribe(company => {

            this.postSubmit.emit();
        })
    }


}
