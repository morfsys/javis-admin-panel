import { AreaService } from './area.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CityService } from '../city/city.service';

declare var $: any;

@Component({
    selector: 'app-area-view',
    templateUrl: './area-view.component.html'
})
export class AreaViewComponent implements OnInit {


    @Input('view-item') item = {
        _id: 0,
        name: '',
        city: ""
    };
    @Input('cancel-allowed') cancelAllowed = false;
    @Output() postSubmit = new EventEmitter();
    @Output() clickedCancel = new EventEmitter();

    constructor(
        private mService: AreaService,
        private cityService: CityService
    ) { }

    ngOnInit() {
        this.populateCityOptions();
    }

    formSubmitted = false;
    addItem(form) {

        this.formSubmitted = true;
        if (!form.valid) {
            return false;
        }
        // TODO: Logic to add company
        this.mService.addItem(Object.assign({ _id: 0 }, this.item, {
            name: this.item.name.toUpperCase()
        })).subscribe(company => {

            this.postSubmit.emit();
        })
    }

    selectizeConfig: any = {
        labelField: 'label',
        valueField: 'value',
        searchField: ['label']
    };

    cityOptions: any = [];
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


}
