import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { FleetOwnerDetailPage } from './fleet-owner-detail';
import { FleetOwnerService } from './fleet-owner.provider';

@NgModule({
    declarations: [
        FleetOwnerDetailPage
    ],
    imports: [
        IonicPageModule.forChild(FleetOwnerDetailPage),
        TranslateModule.forChild()
    ],
    exports: [
        FleetOwnerDetailPage
    ],
    providers: [FleetOwnerService]
})
export class FleetOwnerDetailPageModule {
}
