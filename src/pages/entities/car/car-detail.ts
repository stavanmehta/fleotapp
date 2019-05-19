import { Component } from '@angular/core';
import { IonicPage, ModalController, NavParams, ToastController } from 'ionic-angular';
import { JhiDataUtils } from 'ng-jhipster';
import { Car } from './car.model';
import { CarService } from './car.provider';

@IonicPage({
    segment: 'car-detail/:id',
    defaultHistory: ['EntityPage', 'carPage']
})
@Component({
    selector: 'page-car-detail',
    templateUrl: 'car-detail.html'
})
export class CarDetailPage {
    car: Car;

    constructor(private dataUtils: JhiDataUtils, private modalCtrl: ModalController, params: NavParams,
                private carService: CarService, private toastCtrl: ToastController) {
        this.car = new Car();
        this.car.id = params.get('id');
    }

    ionViewDidLoad() {
        this.carService.find(this.car.id).subscribe(data => this.car = data);
    }

    open(item: Car) {
        let modal = this.modalCtrl.create('CarDialogPage', {item: item});
        modal.onDidDismiss(car => {
            if (car) {
                this.carService.update(car).subscribe(data => {
                    this.car = data;
                    let toast = this.toastCtrl.create(
                        {message: 'Car updated successfully.', duration: 3000, position: 'middle'});
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
