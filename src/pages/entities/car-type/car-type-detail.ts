import { Component } from '@angular/core';
import { IonicPage, ModalController, NavParams, ToastController } from 'ionic-angular';
import { CarType } from './car-type.model';
import { CarTypeService } from './car-type.provider';

@IonicPage({
    segment: 'car-type-detail/:id',
    defaultHistory: ['EntityPage', 'car-typePage']
})
@Component({
    selector: 'page-car-type-detail',
    templateUrl: 'car-type-detail.html'
})
export class CarTypeDetailPage {
    carType: CarType;

    constructor(private modalCtrl: ModalController, params: NavParams,
                private carTypeService: CarTypeService, private toastCtrl: ToastController) {
        this.carType = new CarType();
        this.carType.id = params.get('id');
    }

    ionViewDidLoad() {
        this.carTypeService.find(this.carType.id).subscribe(data => this.carType = data);
    }

    open(item: CarType) {
        let modal = this.modalCtrl.create('CarTypeDialogPage', {item: item});
        modal.onDidDismiss(carType => {
            if (carType) {
                this.carTypeService.update(carType).subscribe(data => {
                    this.carType = data;
                    let toast = this.toastCtrl.create(
                        {message: 'CarType updated successfully.', duration: 3000, position: 'middle'});
                    toast.present();
                }, (error) => console.error(error));
            }
        });
        modal.present();
    }

}
