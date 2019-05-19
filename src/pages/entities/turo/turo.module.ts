import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { TuroPage } from './turo';
import { TuroService } from './turo.provider';

@NgModule({
    declarations: [
        TuroPage
    ],
    imports: [
        IonicPageModule.forChild(TuroPage),
        TranslateModule.forChild()
    ],
    exports: [
        TuroPage
    ],
    providers: [TuroService]
})
export class TuroPageModule {
}
