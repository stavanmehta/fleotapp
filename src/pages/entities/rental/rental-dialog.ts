import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Rental } from './rental.model';
import { RentalService } from './rental.provider';
import { Car, CarService } from '../car';
import { FleetOwner, FleetOwnerService } from '../fleet-owner';

@IonicPage()
@Component({
    selector: 'page-rental-dialog',
    templateUrl: 'rental-dialog.html'
})
export class RentalDialogPage {

    rental: Rental;
    cars: Car[];
    fleetowners: FleetOwner[];
    startAt: string;
    endAat: string;
    isReadyToSave: boolean;

    form: FormGroup;

    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public toastCtrl: ToastController,
                formBuilder: FormBuilder, params: NavParams,
                private carService: CarService,
                private fleetOwnerService: FleetOwnerService,
                private rentalService: RentalService) {
        this.rental = params.get('item');
        if (this.rental && this.rental.id) {
            this.rentalService.find(this.rental.id).subscribe(data => {
                this.rental = data;
            });
        } else {
            this.rental = new Rental();
        }

        this.form = formBuilder.group({
            id: [params.get('item') ? this.rental.id : null],
            startAt: [params.get('item') ? this.rental.startAt : null, ],
            endAat: [params.get('item') ? this.rental.endAat : null, ],
            car: [params.get('item') ? this.rental.car : '',],
            fleetOwner: [params.get('item') ? this.rental.fleetowner : '',],
        });

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ionViewDidLoad() {
        this.carService
            .query({filter: 'rental-is-null'})
            .subscribe(data => {
                if (!this.rental.car || !this.rental.car.id) {
                    this.cars = data;
                } else {
                    this.carService
                        .find(this.rental.car.id)
                        .subscribe((subData: Car) => {
                            this.cars = [subData].concat(subData);
                        }, (error) => this.onError(error));
                }
            }, (error) => this.onError(error));
        this.fleetOwnerService
            .query({filter: 'rental-is-null'})
            .subscribe(data => {
                if (!this.rental.fleetowner || !this.rental.fleetowner.id) {
                    this.fleetowners = data;
                } else {
                    this.fleetOwnerService
                        .find(this.rental.fleetowner.id)
                        .subscribe((subData: FleetOwner) => {
                            this.fleetowners = [subData].concat(subData);
                        }, (error) => this.onError(error));
                }
            }, (error) => this.onError(error));
    }

    /**
     * The user cancelled, dismiss without sending data back.
     */
    cancel() {
        this.viewCtrl.dismiss();
    }

    /**
     * The user is done and wants to create the rental, so return it
     * back to the presenter.
     */
    done() {
        if (!this.form.valid) { return; }
        this.viewCtrl.dismiss(this.form.value);
    }

    onError(error) {
        console.error(error);
        let toast = this.toastCtrl.create({message: 'Failed to load data', duration: 2000, position: 'middle'});
        toast.present();
    }

    compareCar(first: Car, second: Car): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackCarById(index: number, item: Car) {
        return item.id;
    }
    compareFleetOwner(first: FleetOwner, second: FleetOwner): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackFleetOwnerById(index: number, item: FleetOwner) {
        return item.id;
    }
}
