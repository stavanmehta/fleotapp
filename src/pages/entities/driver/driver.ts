import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, ToastController } from 'ionic-angular';
import { JhiDataUtils } from 'ng-jhipster';
import { Driver } from './driver.model';
import { DriverService } from './driver.provider';

@IonicPage({
    defaultHistory: ['EntityPage']
})
@Component({
    selector: 'page-driver',
    templateUrl: 'driver.html'
})
export class DriverPage {
    drivers: Driver[];

    // todo: add pagination

    constructor(private dataUtils: JhiDataUtils,private navCtrl: NavController, private driverService: DriverService,
                private modalCtrl: ModalController, private toastCtrl: ToastController) {
        this.drivers = [];
    }

    ionViewDidLoad() {
        this.loadAll();
    }

    loadAll(refresher?) {
        this.driverService.query().subscribe(
            (response) => {
                this.drivers = response;
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

    trackId(index: number, item: Driver) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    open(slidingItem: any, item: Driver) {
        let modal = this.modalCtrl.create('DriverDialogPage', {item: item});
        modal.onDidDismiss(driver => {
            if (driver) {
                if (driver.id) {
                    this.driverService.update(driver).subscribe(data => {
                        this.loadAll();
                        let toast = this.toastCtrl.create(
                            {message: 'Driver updated successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                        slidingItem.close();
                    }, (error) => console.error(error));
                } else {
                    this.driverService.create(driver).subscribe(data => {
                        this.drivers.push(data);
                        let toast = this.toastCtrl.create(
                            {message: 'Driver added successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                    }, (error) => console.error(error));
                }
            }
        });
        modal.present();
    }

    delete(driver) {
        this.driverService.delete(driver.id).subscribe(() => {
            let toast = this.toastCtrl.create(
                {message: 'Driver deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    detail(driver: Driver) {
        this.navCtrl.push('DriverDetailPage', {id: driver.id});
    }
}
