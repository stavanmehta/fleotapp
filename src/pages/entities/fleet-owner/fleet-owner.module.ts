import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { FleetOwnerPage } from './fleet-owner';
import { FleetOwnerService } from './fleet-owner.provider';

@NgModule({
    declarations: [
        FleetOwnerPage
    ],
    imports: [
        IonicPageModule.forChild(FleetOwnerPage),
        TranslateModule.forChild()
    ],
    exports: [
        FleetOwnerPage
    ],
    providers: [FleetOwnerService]
})
export class FleetOwnerPageModule {
}
