import { CarService } from '../car';
import { FleetOwnerService } from '../fleet-owner';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { RentalDialogPage } from './rental-dialog';
import { RentalService } from './rental.provider';

@NgModule({
    declarations: [
        RentalDialogPage
    ],
    imports: [
        IonicPageModule.forChild(RentalDialogPage),
        TranslateModule.forChild()
    ],
    exports: [
        RentalDialogPage
    ],
    providers: [
        RentalService,
        CarService,
        FleetOwnerService,
    ]
})
export class RentalDialogPageModule {
}
