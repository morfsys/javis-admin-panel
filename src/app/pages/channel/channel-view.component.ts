import { ChannelService } from './channel.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ErrorHandlerService } from 'src/app/services/error-handler';

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
        private mService: ChannelService,
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
            description: this.item.description.toUpperCase()
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
