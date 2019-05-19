import { Component } from '@angular/core';
import { IonicPage, ModalController, NavParams, ToastController } from 'ionic-angular';
import { JhiDataUtils } from 'ng-jhipster';
import { Album } from './album.model';
import { AlbumService } from './album.provider';

@IonicPage({
    segment: 'album-detail/:id',
    defaultHistory: ['EntityPage', 'albumPage']
})
@Component({
    selector: 'page-album-detail',
    templateUrl: 'album-detail.html'
})
export class AlbumDetailPage {
    album: Album;

    constructor(private dataUtils: JhiDataUtils, private modalCtrl: ModalController, params: NavParams,
                private albumService: AlbumService, private toastCtrl: ToastController) {
        this.album = new Album();
        this.album.id = params.get('id');
    }

    ionViewDidLoad() {
        this.albumService.find(this.album.id).subscribe(data => this.album = data);
    }

    open(item: Album) {
        let modal = this.modalCtrl.create('AlbumDialogPage', {item: item});
        modal.onDidDismiss(album => {
            if (album) {
                this.albumService.update(album).subscribe(data => {
                    this.album = data;
                    let toast = this.toastCtrl.create(
                        {message: 'Album updated successfully.', duration: 3000, position: 'middle'});
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
