import { User as UserService } from '../../../providers/user/user';
import { TuroService } from '../turo';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { FleetOwnerDialogPage } from './fleet-owner-dialog';
import { FleetOwnerService } from './fleet-owner.provider';

@NgModule({
    declarations: [
        FleetOwnerDialogPage
    ],
    imports: [
        IonicPageModule.forChild(FleetOwnerDialogPage),
        TranslateModule.forChild()
    ],
    exports: [
        FleetOwnerDialogPage
    ],
    providers: [
        FleetOwnerService,
        UserService,
        TuroService,
    ]
})
export class FleetOwnerDialogPageModule {
}
