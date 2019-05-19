import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { CarTypeDialogPage } from './car-type-dialog';
import { CarTypeService } from './car-type.provider';

@NgModule({
    declarations: [
        CarTypeDialogPage
    ],
    imports: [
        IonicPageModule.forChild(CarTypeDialogPage),
        TranslateModule.forChild()
    ],
    exports: [
        CarTypeDialogPage
    ],
    providers: [
        CarTypeService
    ]
})
export class CarTypeDialogPageModule {
}
