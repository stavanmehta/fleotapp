import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { PhotoDetailPage } from './photo-detail';
import { PhotoService } from './photo.provider';

@NgModule({
    declarations: [
        PhotoDetailPage
    ],
    imports: [
        IonicPageModule.forChild(PhotoDetailPage),
        TranslateModule.forChild()
    ],
    exports: [
        PhotoDetailPage
    ],
    providers: [PhotoService]
})
export class PhotoDetailPageModule {
}
