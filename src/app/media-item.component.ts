import { Component, Input, Output } from "@angular/core";
import { EventEmitter } from '@angular/core';

@Component({
    selector: 'media-item',
    templateUrl: './media-item.component.html',
    styleUrls: ['./media-item.component.css']
})



export class MediaItemComponent {
@Input() mediaItem; 
@Output() delete = new EventEmitter();

    onDelete() {
        this.delete.emit(this.mediaItem);
    }

    onFave() {
        if (this.mediaItem.isFave == false) {
            this.mediaItem.isFave = true;
        }
        else if (this.mediaItem.isFave == true) {
            this.mediaItem.isFave = false;
        }
    }
}