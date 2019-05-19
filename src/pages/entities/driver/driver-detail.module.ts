import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { DriverDetailPage } from './driver-detail';
import { DriverService } from './driver.provider';

@NgModule({
    declarations: [
        DriverDetailPage
    ],
    imports: [
        IonicPageModule.forChild(DriverDetailPage),
        TranslateModule.forChild()
    ],
    exports: [
        DriverDetailPage
    ],
    providers: [DriverService]
})
export class DriverDetailPageModule {
}
