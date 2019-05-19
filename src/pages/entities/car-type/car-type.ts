import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, ToastController } from 'ionic-angular';
import { CarType } from './car-type.model';
import { CarTypeService } from './car-type.provider';

@IonicPage({
    defaultHistory: ['EntityPage']
})
@Component({
    selector: 'page-car-type',
    templateUrl: 'car-type.html'
})
export class CarTypePage {
    carTypes: CarType[];

    // todo: add pagination

    constructor(private navCtrl: NavController, private carTypeService: CarTypeService,
                private modalCtrl: ModalController, private toastCtrl: ToastController) {
        this.carTypes = [];
    }

    ionViewDidLoad() {
        this.loadAll();
    }

    loadAll(refresher?) {
        this.carTypeService.query().subscribe(
            (response) => {
                this.carTypes = response;
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

    trackId(index: number, item: CarType) {
        return item.id;
    }

    open(slidingItem: any, item: CarType) {
        let modal = this.modalCtrl.create('CarTypeDialogPage', {item: item});
        modal.onDidDismiss(carType => {
            if (carType) {
                if (carType.id) {
                    this.carTypeService.update(carType).subscribe(data => {
                        this.loadAll();
                        let toast = this.toastCtrl.create(
                            {message: 'CarType updated successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                        slidingItem.close();
                    }, (error) => console.error(error));
                } else {
                    this.carTypeService.create(carType).subscribe(data => {
                        this.carTypes.push(data);
                        let toast = this.toastCtrl.create(
                            {message: 'CarType added successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                    }, (error) => console.error(error));
                }
            }
        });
        modal.present();
    }

    delete(carType) {
        this.carTypeService.delete(carType.id).subscribe(() => {
            let toast = this.toastCtrl.create(
                {message: 'CarType deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    detail(carType: CarType) {
        this.navCtrl.push('CarTypeDetailPage', {id: carType.id});
    }
}
