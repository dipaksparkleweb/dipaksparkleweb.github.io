import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import { LayoutComponent } from './layout.component';
import { ListComponent } from './list.component';
import { AddComponent } from './add.component';
import { EditComponent } from './edit.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ServicesRoutingModule
    ],
    declarations: [
        LayoutComponent,
        ListComponent,
        AddComponent,
        EditComponent
    ]
})
export class ServicesModule { 
    constructor()
    {
        console.log("services")
    }
}
