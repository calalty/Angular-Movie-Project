import { lookupListToken } from '../providers';
import { MediaItemService } from '../media-item.service';
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router'
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms'
import { from } from 'rxjs';

@Component({
  selector: 'media-item-form',
  templateUrl: './media-item-form.component.html',
  styleUrls: ['./media-item-form.component.css']
})
export class MediaItemFormComponent implements OnInit {
    form: FormGroup;

    constructor(private formBuilder: FormBuilder,
        private mediaItemService: MediaItemService,
        private router: Router,
        @Inject(lookupListToken) public lookupLists) {}

    ngOnInit(){
        this.form = this.formBuilder.group({
            name: this.formBuilder.control('', 
            Validators.compose([
                Validators.required,
                Validators.pattern('[\\w\\-\\s\\/]+')
            ])),
            medium: this.formBuilder.control('Movie'),
            genre: this.formBuilder.control(''),
            year: this.formBuilder.control('',
            this.yearValidator),
        });
    }

    yearValidator(control: FormControl) {
        if (control.value.trim().length === 0) {
            return null;
        }
        const year = parseInt(control.value, 10);
        const minYear = 1900;
        const maxYear = 2100;
        if (year >= minYear && year <= maxYear){
            return null;
        } else {
             return { year: true };
        }
    }

    onSubmit(mediaItem) {
        this.mediaItemService.add(mediaItem)
        .subscribe(() => {
            this.router.navigate(['/', mediaItem.medium]);
        });
    }

}