import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { RentalDetailPage } from './rental-detail';
import { RentalService } from './rental.provider';

@NgModule({
    declarations: [
        RentalDetailPage
    ],
    imports: [
        IonicPageModule.forChild(RentalDetailPage),
        TranslateModule.forChild()
    ],
    exports: [
        RentalDetailPage
    ],
    providers: [RentalService]
})
export class RentalDetailPageModule {
}
