import { ReactiveFormsModule } from '@angular/forms';
import { MediaItemFormComponent } from './new-item/media-item-form.component';

import { routing } from './app.routing';
import { CategoryListPipe } from './category-list.pipe';
import { FaveDirective } from './fave.directive';
import { MediaItemListComponent } from './media-item-list.component';
import { MediaItemComponent } from './media-item.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component'
import { lookupLists, lookupListToken} from './providers'
import { HttpClientModule, HttpXhrBackend } from '@angular/common/http'
import { MockXHRBackend } from './mock-xhr-backend';


@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        routing,
        ReactiveFormsModule
    ],
    declarations: [ 
        AppComponent,
        MediaItemComponent,
        MediaItemListComponent,
        MediaItemFormComponent,
        FaveDirective,
        CategoryListPipe,
    ],
    providers: [
        { provide: lookupListToken, useValue: lookupLists},
        { provide: HttpXhrBackend, useClass: MockXHRBackend }
    ],
    bootstrap: [
        AppComponent,
    ],
})

export class AppModule {}