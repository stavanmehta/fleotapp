import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { RentalPage } from './rental';
import { RentalService } from './rental.provider';

@NgModule({
    declarations: [
        RentalPage
    ],
    imports: [
        IonicPageModule.forChild(RentalPage),
        TranslateModule.forChild()
    ],
    exports: [
        RentalPage
    ],
    providers: [RentalService]
})
export class RentalPageModule {
}
