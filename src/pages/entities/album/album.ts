import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, ToastController } from 'ionic-angular';
import { JhiDataUtils } from 'ng-jhipster';
import { Album } from './album.model';
import { AlbumService } from './album.provider';

@IonicPage({
    defaultHistory: ['EntityPage']
})
@Component({
    selector: 'page-album',
    templateUrl: 'album.html'
})
export class AlbumPage {
    albums: Album[];

    // todo: add pagination

    constructor(private dataUtils: JhiDataUtils,private navCtrl: NavController, private albumService: AlbumService,
                private modalCtrl: ModalController, private toastCtrl: ToastController) {
        this.albums = [];
    }

    ionViewDidLoad() {
        this.loadAll();
    }

    loadAll(refresher?) {
        this.albumService.query().subscribe(
            (response) => {
                this.albums = response;
                if (typeof(refresher) !== 'undefined') {
                    refresher.complete();
                }
            },
            (error) => {
                console.error(error);
                let toast = this.toastCtrl.create({message: 'Failed to load data', duration: 2000, position: 'middle'});
                toast.present();
            });
    }

    trackId(index: number, item: Album) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    open(slidingItem: any, item: Album) {
        let modal = this.modalCtrl.create('AlbumDialogPage', {item: item});
        modal.onDidDismiss(album => {
            if (album) {
                if (album.id) {
                    this.albumService.update(album).subscribe(data => {
                        this.loadAll();
                        let toast = this.toastCtrl.create(
                            {message: 'Album updated successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                        slidingItem.close();
                    }, (error) => console.error(error));
                } else {
                    this.albumService.create(album).subscribe(data => {
                        this.albums.push(data);
                        let toast = this.toastCtrl.create(
                            {message: 'Album added successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                    }, (error) => console.error(error));
                }
            }
        });
        modal.present();
    }

    delete(album) {
        this.albumService.delete(album.id).subscribe(() => {
            let toast = this.toastCtrl.create(
                {message: 'Album deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    detail(album: Album) {
        this.navCtrl.push('AlbumDetailPage', {id: album.id});
    }
}
