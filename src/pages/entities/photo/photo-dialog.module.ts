import { AlbumService } from '../album';
import { TagService } from '../tag';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { PhotoDialogPage } from './photo-dialog';
import { PhotoService } from './photo.provider';

@NgModule({
    declarations: [
        PhotoDialogPage
    ],
    imports: [
        IonicPageModule.forChild(PhotoDialogPage),
        TranslateModule.forChild()
    ],
    exports: [
        PhotoDialogPage
    ],
    providers: [
        PhotoService,
        AlbumService,
        TagService,
    ]
})
export class PhotoDialogPageModule {
}
