import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, ToastController } from 'ionic-angular';
import { Turo } from './turo.model';
import { TuroService } from './turo.provider';

@IonicPage({
    defaultHistory: ['EntityPage']
})
@Component({
    selector: 'page-turo',
    templateUrl: 'turo.html'
})
export class TuroPage {
    turos: Turo[];

    // todo: add pagination

    constructor(private navCtrl: NavController, private turoService: TuroService,
                private modalCtrl: ModalController, private toastCtrl: ToastController) {
        this.turos = [];
    }

    ionViewDidLoad() {
        this.loadAll();
    }

    loadAll(refresher?) {
        this.turoService.query().subscribe(
            (response) => {
                this.turos = response;
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

    trackId(index: number, item: Turo) {
        return item.id;
    }

    open(slidingItem: any, item: Turo) {
        let modal = this.modalCtrl.create('TuroDialogPage', {item: item});
        modal.onDidDismiss(turo => {
            if (turo) {
                if (turo.id) {
                    this.turoService.update(turo).subscribe(data => {
                        this.loadAll();
                        let toast = this.toastCtrl.create(
                            {message: 'Turo updated successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                        slidingItem.close();
                    }, (error) => console.error(error));
                } else {
                    this.turoService.create(turo).subscribe(data => {
                        this.turos.push(data);
                        let toast = this.toastCtrl.create(
                            {message: 'Turo added successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                    }, (error) => console.error(error));
                }
            }
        });
        modal.present();
    }

    delete(turo) {
        this.turoService.delete(turo.id).subscribe(() => {
            let toast = this.toastCtrl.create(
                {message: 'Turo deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    detail(turo: Turo) {
        this.navCtrl.push('TuroDetailPage', {id: turo.id});
    }
}
