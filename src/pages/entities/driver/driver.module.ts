import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { DriverPage } from './driver';
import { DriverService } from './driver.provider';

@NgModule({
    declarations: [
        DriverPage
    ],
    imports: [
        IonicPageModule.forChild(DriverPage),
        TranslateModule.forChild()
    ],
    exports: [
        DriverPage
    ],
    providers: [DriverService]
})
export class DriverPageModule {
}
