import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { AlbumPage } from './album';
import { AlbumService } from './album.provider';

@NgModule({
    declarations: [
        AlbumPage
    ],
    imports: [
        IonicPageModule.forChild(AlbumPage),
        TranslateModule.forChild()
    ],
    exports: [
        AlbumPage
    ],
    providers: [AlbumService]
})
export class AlbumPageModule {
}
