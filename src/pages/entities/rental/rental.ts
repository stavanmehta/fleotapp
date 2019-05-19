import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, ToastController } from 'ionic-angular';
import { Rental } from './rental.model';
import { RentalService } from './rental.provider';

@IonicPage({
    defaultHistory: ['EntityPage']
})
@Component({
    selector: 'page-rental',
    templateUrl: 'rental.html'
})
export class RentalPage {
    rentals: Rental[];

    // todo: add pagination

    constructor(private navCtrl: NavController, private rentalService: RentalService,
                private modalCtrl: ModalController, private toastCtrl: ToastController) {
        this.rentals = [];
    }

    ionViewDidLoad() {
        this.loadAll();
    }

    loadAll(refresher?) {
        this.rentalService.query().subscribe(
            (response) => {
                this.rentals = response;
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

    trackId(index: number, item: Rental) {
        return item.id;
    }

    open(slidingItem: any, item: Rental) {
        let modal = this.modalCtrl.create('RentalDialogPage', {item: item});
        modal.onDidDismiss(rental => {
            if (rental) {
                if (rental.id) {
                    this.rentalService.update(rental).subscribe(data => {
                        this.loadAll();
                        let toast = this.toastCtrl.create(
                            {message: 'Rental updated successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                        slidingItem.close();
                    }, (error) => console.error(error));
                } else {
                    this.rentalService.create(rental).subscribe(data => {
                        this.rentals.push(data);
                        let toast = this.toastCtrl.create(
                            {message: 'Rental added successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                    }, (error) => console.error(error));
                }
            }
        });
        modal.present();
    }

    delete(rental) {
        this.rentalService.delete(rental.id).subscribe(() => {
            let toast = this.toastCtrl.create(
                {message: 'Rental deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    detail(rental: Rental) {
        this.navCtrl.push('RentalDetailPage', {id: rental.id});
    }
}
