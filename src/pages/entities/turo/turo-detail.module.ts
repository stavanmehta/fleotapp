import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { TuroDetailPage } from './turo-detail';
import { TuroService } from './turo.provider';

@NgModule({
    declarations: [
        TuroDetailPage
    ],
    imports: [
        IonicPageModule.forChild(TuroDetailPage),
        TranslateModule.forChild()
    ],
    exports: [
        TuroDetailPage
    ],
    providers: [TuroService]
})
export class TuroDetailPageModule {
}
