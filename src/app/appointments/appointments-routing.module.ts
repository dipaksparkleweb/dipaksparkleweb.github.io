import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { ListComponent } from './list.component';
import { AddComponent } from './add.component';
import { TabComponent } from './tab.component';
import { EditComponent } from './edit.component';
import { ServiceListComponent } from './servicelist.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: ListComponent },
            { path: 'add', component: AddComponent },
            { path: 'tab', component: TabComponent },
            { path: 'edit/:id', component: EditComponent },
            { path: 'servicelist/:id', component: ServiceListComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AppointmentsRoutingModule { }
