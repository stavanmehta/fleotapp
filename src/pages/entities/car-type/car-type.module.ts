import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { CarTypePage } from './car-type';
import { CarTypeService } from './car-type.provider';

@NgModule({
    declarations: [
        CarTypePage
    ],
    imports: [
        IonicPageModule.forChild(CarTypePage),
        TranslateModule.forChild()
    ],
    exports: [
        CarTypePage
    ],
    providers: [CarTypeService]
})
export class CarTypePageModule {
}
