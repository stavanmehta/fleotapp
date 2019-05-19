import { CarService } from '../car';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { AlbumDialogPage } from './album-dialog';
import { AlbumService } from './album.provider';

@NgModule({
    declarations: [
        AlbumDialogPage
    ],
    imports: [
        IonicPageModule.forChild(AlbumDialogPage),
        TranslateModule.forChild()
    ],
    exports: [
        AlbumDialogPage
    ],
    providers: [
        AlbumService,
        CarService,
    ]
})
export class AlbumDialogPageModule {
}
