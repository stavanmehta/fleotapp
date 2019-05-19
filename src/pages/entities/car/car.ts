import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, ToastController } from 'ionic-angular';
import { JhiDataUtils } from 'ng-jhipster';
import { Car } from './car.model';
import { CarService } from './car.provider';

@IonicPage({
    defaultHistory: ['EntityPage']
})
@Component({
    selector: 'page-car',
    templateUrl: 'car.html'
})
export class CarPage {
    cars: Car[];

    // todo: add pagination

    constructor(private dataUtils: JhiDataUtils,private navCtrl: NavController, private carService: CarService,
                private modalCtrl: ModalController, private toastCtrl: ToastController) {
        this.cars = [];
    }

    ionViewDidLoad() {
        this.loadAll();
    }

    loadAll(refresher?) {
        this.carService.query().subscribe(
            (response) => {
                this.cars = response;
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

    trackId(index: number, item: Car) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    open(slidingItem: any, item: Car) {
        let modal = this.modalCtrl.create('CarDialogPage', {item: item});
        modal.onDidDismiss(car => {
            if (car) {
                if (car.id) {
                    this.carService.update(car).subscribe(data => {
                        this.loadAll();
                        let toast = this.toastCtrl.create(
                            {message: 'Car updated successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                        slidingItem.close();
                    }, (error) => console.error(error));
                } else {
                    this.carService.create(car).subscribe(data => {
                        this.cars.push(data);
                        let toast = this.toastCtrl.create(
                            {message: 'Car added successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                    }, (error) => console.error(error));
                }
            }
        });
        modal.present();
    }

    delete(car) {
        this.carService.delete(car.id).subscribe(() => {
            let toast = this.toastCtrl.create(
                {message: 'Car deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    detail(car: Car) {
        this.navCtrl.push('CarDetailPage', {id: car.id});
    }
}
