import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { CarDetailPage } from './car-detail';
import { CarService } from './car.provider';

@NgModule({
    declarations: [
        CarDetailPage
    ],
    imports: [
        IonicPageModule.forChild(CarDetailPage),
        TranslateModule.forChild()
    ],
    exports: [
        CarDetailPage
    ],
    providers: [CarService]
})
export class CarDetailPageModule {
}
