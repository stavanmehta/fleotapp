import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { AlbumDetailPage } from './album-detail';
import { AlbumService } from './album.provider';

@NgModule({
    declarations: [
        AlbumDetailPage
    ],
    imports: [
        IonicPageModule.forChild(AlbumDetailPage),
        TranslateModule.forChild()
    ],
    exports: [
        AlbumDetailPage
    ],
    providers: [AlbumService]
})
export class AlbumDetailPageModule {
}
