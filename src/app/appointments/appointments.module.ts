import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppointmentsRoutingModule } from './appointments-routing.module';
import { LayoutComponent } from './layout.component';
import { ListComponent } from './list.component';
import { AddComponent } from './add.component';
import { EditComponent } from './edit.component';
import { TabComponent } from './tab.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import{ServiceListComponent} from './servicelist.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { from } from 'rxjs';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AppointmentsRoutingModule,
        Ng2SearchPipeModule,
        NgxPaginationModule,
        NgbModule,
        NgMultiSelectDropDownModule.forRoot(),
        FormsModule
    ],
    declarations: [
        LayoutComponent,
        ListComponent,
        AddComponent,
        EditComponent,
        TabComponent,
        ServiceListComponent
    
    ],
    exports: [TabComponent],
    bootstrap: [TabComponent]

})
export class AppointmentsModule { 
    constructor()
    {
        console.log("appointment")
    }
}

