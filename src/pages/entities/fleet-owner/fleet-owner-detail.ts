import { Component } from '@angular/core';
import { IonicPage, ModalController, NavParams, ToastController } from 'ionic-angular';
import { JhiDataUtils } from 'ng-jhipster';
import { FleetOwner } from './fleet-owner.model';
import { FleetOwnerService } from './fleet-owner.provider';

@IonicPage({
    segment: 'fleet-owner-detail/:id',
    defaultHistory: ['EntityPage', 'fleet-ownerPage']
})
@Component({
    selector: 'page-fleet-owner-detail',
    templateUrl: 'fleet-owner-detail.html'
})
export class FleetOwnerDetailPage {
    fleetOwner: FleetOwner;

    constructor(private dataUtils: JhiDataUtils, private modalCtrl: ModalController, params: NavParams,
                private fleetOwnerService: FleetOwnerService, private toastCtrl: ToastController) {
        this.fleetOwner = new FleetOwner();
        this.fleetOwner.id = params.get('id');
    }

    ionViewDidLoad() {
        this.fleetOwnerService.find(this.fleetOwner.id).subscribe(data => this.fleetOwner = data);
    }

    open(item: FleetOwner) {
        let modal = this.modalCtrl.create('FleetOwnerDialogPage', {item: item});
        modal.onDidDismiss(fleetOwner => {
            if (fleetOwner) {
                this.fleetOwnerService.update(fleetOwner).subscribe(data => {
                    this.fleetOwner = data;
                    let toast = this.toastCtrl.create(
                        {message: 'FleetOwner updated successfully.', duration: 3000, position: 'middle'});
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
