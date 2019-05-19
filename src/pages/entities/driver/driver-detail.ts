import { Component } from '@angular/core';
import { IonicPage, ModalController, NavParams, ToastController } from 'ionic-angular';
import { JhiDataUtils } from 'ng-jhipster';
import { Driver } from './driver.model';
import { DriverService } from './driver.provider';

@IonicPage({
    segment: 'driver-detail/:id',
    defaultHistory: ['EntityPage', 'driverPage']
})
@Component({
    selector: 'page-driver-detail',
    templateUrl: 'driver-detail.html'
})
export class DriverDetailPage {
    driver: Driver;

    constructor(private dataUtils: JhiDataUtils, private modalCtrl: ModalController, params: NavParams,
                private driverService: DriverService, private toastCtrl: ToastController) {
        this.driver = new Driver();
        this.driver.id = params.get('id');
    }

    ionViewDidLoad() {
        this.driverService.find(this.driver.id).subscribe(data => this.driver = data);
    }

    open(item: Driver) {
        let modal = this.modalCtrl.create('DriverDialogPage', {item: item});
        modal.onDidDismiss(driver => {
            if (driver) {
                this.driverService.update(driver).subscribe(data => {
                    this.driver = data;
                    let toast = this.toastCtrl.create(
                        {message: 'Driver updated successfully.', duration: 3000, position: 'middle'});
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
