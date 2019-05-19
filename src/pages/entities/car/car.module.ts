import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { CarPage } from './car';
import { CarService } from './car.provider';

@NgModule({
    declarations: [
        CarPage
    ],
    imports: [
        IonicPageModule.forChild(CarPage),
        TranslateModule.forChild()
    ],
    exports: [
        CarPage
    ],
    providers: [CarService]
})
export class CarPageModule {
}
