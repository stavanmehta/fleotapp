import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { CarTypeDetailPage } from './car-type-detail';
import { CarTypeService } from './car-type.provider';

@NgModule({
    declarations: [
        CarTypeDetailPage
    ],
    imports: [
        IonicPageModule.forChild(CarTypeDetailPage),
        TranslateModule.forChild()
    ],
    exports: [
        CarTypeDetailPage
    ],
    providers: [CarTypeService]
})
export class CarTypeDetailPageModule {
}
