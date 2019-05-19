import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { TuroDialogPage } from './turo-dialog';
import { TuroService } from './turo.provider';

@NgModule({
    declarations: [
        TuroDialogPage
    ],
    imports: [
        IonicPageModule.forChild(TuroDialogPage),
        TranslateModule.forChild()
    ],
    exports: [
        TuroDialogPage
    ],
    providers: [
        TuroService
    ]
})
export class TuroDialogPageModule {
}
