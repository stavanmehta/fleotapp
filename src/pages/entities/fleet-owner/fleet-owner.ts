import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, ToastController } from 'ionic-angular';
import { JhiDataUtils } from 'ng-jhipster';
import { FleetOwner } from './fleet-owner.model';
import { FleetOwnerService } from './fleet-owner.provider';

@IonicPage({
    defaultHistory: ['EntityPage']
})
@Component({
    selector: 'page-fleet-owner',
    templateUrl: 'fleet-owner.html'
})
export class FleetOwnerPage {
    fleetOwners: FleetOwner[];

    // todo: add pagination

    constructor(private dataUtils: JhiDataUtils,private navCtrl: NavController, private fleetOwnerService: FleetOwnerService,
                private modalCtrl: ModalController, private toastCtrl: ToastController) {
        this.fleetOwners = [];
    }

    ionViewDidLoad() {
        this.loadAll();
    }

    loadAll(refresher?) {
        this.fleetOwnerService.query().subscribe(
            (response) => {
                this.fleetOwners = response;
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

    trackId(index: number, item: FleetOwner) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    open(slidingItem: any, item: FleetOwner) {
        let modal = this.modalCtrl.create('FleetOwnerDialogPage', {item: item});
        modal.onDidDismiss(fleetOwner => {
            if (fleetOwner) {
                if (fleetOwner.id) {
                    this.fleetOwnerService.update(fleetOwner).subscribe(data => {
                        this.loadAll();
                        let toast = this.toastCtrl.create(
                            {message: 'FleetOwner updated successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                        slidingItem.close();
                    }, (error) => console.error(error));
                } else {
                    this.fleetOwnerService.create(fleetOwner).subscribe(data => {
                        this.fleetOwners.push(data);
                        let toast = this.toastCtrl.create(
                            {message: 'FleetOwner added successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                    }, (error) => console.error(error));
                }
            }
        });
        modal.present();
    }

    delete(fleetOwner) {
        this.fleetOwnerService.delete(fleetOwner.id).subscribe(() => {
            let toast = this.toastCtrl.create(
                {message: 'FleetOwner deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    detail(fleetOwner: FleetOwner) {
        this.navCtrl.push('FleetOwnerDetailPage', {id: fleetOwner.id});
    }
}
