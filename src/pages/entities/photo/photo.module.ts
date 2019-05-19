import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { PhotoPage } from './photo';
import { PhotoService } from './photo.provider';

@NgModule({
    declarations: [
        PhotoPage
    ],
    imports: [
        IonicPageModule.forChild(PhotoPage),
        TranslateModule.forChild()
    ],
    exports: [
        PhotoPage
    ],
    providers: [PhotoService]
})
export class PhotoPageModule {
}
