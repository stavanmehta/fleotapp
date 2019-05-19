import { CarService } from '../car';
import { FleetOwnerService } from '../fleet-owner';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { DriverDialogPage } from './driver-dialog';
import { DriverService } from './driver.provider';

@NgModule({
    declarations: [
        DriverDialogPage
    ],
    imports: [
        IonicPageModule.forChild(DriverDialogPage),
        TranslateModule.forChild()
    ],
    exports: [
        DriverDialogPage
    ],
    providers: [
        DriverService,
        CarService,
        FleetOwnerService,
    ]
})
export class DriverDialogPageModule {
}
