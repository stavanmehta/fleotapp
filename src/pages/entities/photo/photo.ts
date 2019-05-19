import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, ToastController } from 'ionic-angular';
import { JhiDataUtils } from 'ng-jhipster';
import { Photo } from './photo.model';
import { PhotoService } from './photo.provider';

@IonicPage({
    defaultHistory: ['EntityPage']
})
@Component({
    selector: 'page-photo',
    templateUrl: 'photo.html'
})
export class PhotoPage {
    photos: Photo[];

    // todo: add pagination

    constructor(private dataUtils: JhiDataUtils,private navCtrl: NavController, private photoService: PhotoService,
                private modalCtrl: ModalController, private toastCtrl: ToastController) {
        this.photos = [];
    }

    ionViewDidLoad() {
        this.loadAll();
    }

    loadAll(refresher?) {
        this.photoService.query().subscribe(
            (response) => {
                this.photos = response;
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

    trackId(index: number, item: Photo) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    open(slidingItem: any, item: Photo) {
        let modal = this.modalCtrl.create('PhotoDialogPage', {item: item});
        modal.onDidDismiss(photo => {
            if (photo) {
                if (photo.id) {
                    this.photoService.update(photo).subscribe(data => {
                        this.loadAll();
                        let toast = this.toastCtrl.create(
                            {message: 'Photo updated successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                        slidingItem.close();
                    }, (error) => console.error(error));
                } else {
                    this.photoService.create(photo).subscribe(data => {
                        this.photos.push(data);
                        let toast = this.toastCtrl.create(
                            {message: 'Photo added successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                    }, (error) => console.error(error));
                }
            }
        });
        modal.present();
    }

    delete(photo) {
        this.photoService.delete(photo.id).subscribe(() => {
            let toast = this.toastCtrl.create(
                {message: 'Photo deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    detail(photo: Photo) {
        this.navCtrl.push('PhotoDetailPage', {id: photo.id});
    }
}
