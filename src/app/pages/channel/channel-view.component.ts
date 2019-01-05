import { ChannelService } from './channel.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

declare var $: any;

@Component({
    selector: 'app-channel-view',
    templateUrl: './channel-view.component.html'
})
export class ChannelViewComponent implements OnInit {


    @Input('view-item') item = {
        _id: 0,
        name: '',
        description: ""
    };
    @Input('cancel-allowed') cancelAllowed = false;
    @Output() postSubmit = new EventEmitter();
    @Output() clickedCancel = new EventEmitter();

    constructor(
        private mService: ChannelService
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
            description: this.item.description.toUpperCase()
        })).subscribe(company => {

            this.postSubmit.emit();
        })
    }


}
