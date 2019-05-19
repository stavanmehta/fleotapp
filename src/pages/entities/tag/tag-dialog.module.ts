import { PhotoService } from '../photo';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { TagDialogPage } from './tag-dialog';
import { TagService } from './tag.provider';

@NgModule({
    declarations: [
        TagDialogPage
    ],
    imports: [
        IonicPageModule.forChild(TagDialogPage),
        TranslateModule.forChild()
    ],
    exports: [
        TagDialogPage
    ],
    providers: [
        TagService,
        PhotoService,
    ]
})
export class TagDialogPageModule {
}
