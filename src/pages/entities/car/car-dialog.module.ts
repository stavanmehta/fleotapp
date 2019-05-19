import { CarTypeService } from '../car-type';
import { FleetOwnerService } from '../fleet-owner';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { CarDialogPage } from './car-dialog';
import { CarService } from './car.provider';

@NgModule({
    declarations: [
        CarDialogPage
    ],
    imports: [
        IonicPageModule.forChild(CarDialogPage),
        TranslateModule.forChild()
    ],
    exports: [
        CarDialogPage
    ],
    providers: [
        CarService,
        CarTypeService,
        FleetOwnerService,
    ]
})
export class CarDialogPageModule {
}
