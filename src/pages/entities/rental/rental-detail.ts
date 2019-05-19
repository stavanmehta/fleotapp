import { Component } from '@angular/core';
import { IonicPage, ModalController, NavParams, ToastController } from 'ionic-angular';
import { Rental } from './rental.model';
import { RentalService } from './rental.provider';

@IonicPage({
    segment: 'rental-detail/:id',
    defaultHistory: ['EntityPage', 'rentalPage']
})
@Component({
    selector: 'page-rental-detail',
    templateUrl: 'rental-detail.html'
})
export class RentalDetailPage {
    rental: Rental;

    constructor(private modalCtrl: ModalController, params: NavParams,
                private rentalService: RentalService, private toastCtrl: ToastController) {
        this.rental = new Rental();
        this.rental.id = params.get('id');
    }

    ionViewDidLoad() {
        this.rentalService.find(this.rental.id).subscribe(data => this.rental = data);
    }

    open(item: Rental) {
        let modal = this.modalCtrl.create('RentalDialogPage', {item: item});
        modal.onDidDismiss(rental => {
            if (rental) {
                this.rentalService.update(rental).subscribe(data => {
                    this.rental = data;
                    let toast = this.toastCtrl.create(
                        {message: 'Rental updated successfully.', duration: 3000, position: 'middle'});
                    toast.present();
                }, (error) => console.error(error));
            }
        });
        modal.present();
    }

}
