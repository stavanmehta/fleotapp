import { Component } from '@angular/core';
import { IonicPage, ModalController, NavParams, ToastController } from 'ionic-angular';
import { Turo } from './turo.model';
import { TuroService } from './turo.provider';

@IonicPage({
    segment: 'turo-detail/:id',
    defaultHistory: ['EntityPage', 'turoPage']
})
@Component({
    selector: 'page-turo-detail',
    templateUrl: 'turo-detail.html'
})
export class TuroDetailPage {
    turo: Turo;

    constructor(private modalCtrl: ModalController, params: NavParams,
                private turoService: TuroService, private toastCtrl: ToastController) {
        this.turo = new Turo();
        this.turo.id = params.get('id');
    }

    ionViewDidLoad() {
        this.turoService.find(this.turo.id).subscribe(data => this.turo = data);
    }

    open(item: Turo) {
        let modal = this.modalCtrl.create('TuroDialogPage', {item: item});
        modal.onDidDismiss(turo => {
            if (turo) {
                this.turoService.update(turo).subscribe(data => {
                    this.turo = data;
                    let toast = this.toastCtrl.create(
                        {message: 'Turo updated successfully.', duration: 3000, position: 'middle'});
                    toast.present();
                }, (error) => console.error(error));
            }
        });
        modal.present();
    }

}
