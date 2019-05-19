import { Component } from '@angular/core';
import { IonicPage, ModalController, NavParams, ToastController } from 'ionic-angular';
import { JhiDataUtils } from 'ng-jhipster';
import { Photo } from './photo.model';
import { PhotoService } from './photo.provider';

@IonicPage({
    segment: 'photo-detail/:id',
    defaultHistory: ['EntityPage', 'photoPage']
})
@Component({
    selector: 'page-photo-detail',
    templateUrl: 'photo-detail.html'
})
export class PhotoDetailPage {
    photo: Photo;

    constructor(private dataUtils: JhiDataUtils, private modalCtrl: ModalController, params: NavParams,
                private photoService: PhotoService, private toastCtrl: ToastController) {
        this.photo = new Photo();
        this.photo.id = params.get('id');
    }

    ionViewDidLoad() {
        this.photoService.find(this.photo.id).subscribe(data => this.photo = data);
    }

    open(item: Photo) {
        let modal = this.modalCtrl.create('PhotoDialogPage', {item: item});
        modal.onDidDismiss(photo => {
            if (photo) {
                this.photoService.update(photo).subscribe(data => {
                    this.photo = data;
                    let toast = this.toastCtrl.create(
                        {message: 'Photo updated successfully.', duration: 3000, position: 'middle'});
                    toast.present();
                }, (error) => console.error(error));
            }
        });
        modal.present();
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
}
