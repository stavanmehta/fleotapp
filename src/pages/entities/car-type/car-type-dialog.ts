import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { CarType } from './car-type.model';
import { CarTypeService } from './car-type.provider';

@IonicPage()
@Component({
    selector: 'page-car-type-dialog',
    templateUrl: 'car-type-dialog.html'
})
export class CarTypeDialogPage {

    carType: CarType;
    isReadyToSave: boolean;

    form: FormGroup;

    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public toastCtrl: ToastController,
                formBuilder: FormBuilder, params: NavParams,
                private carTypeService: CarTypeService) {
        this.carType = params.get('item');
        if (this.carType && this.carType.id) {
            this.carTypeService.find(this.carType.id).subscribe(data => {
                this.carType = data;
            });
        } else {
            this.carType = new CarType();
        }

        this.form = formBuilder.group({
            id: [params.get('item') ? this.carType.id : null],
            typeName: [params.get('item') ? this.carType.typeName : null,  Validators.required],
        });

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ionViewDidLoad() {
    }

    /**
     * The user cancelled, dismiss without sending data back.
     */
    cancel() {
        this.viewCtrl.dismiss();
    }

    /**
     * The user is done and wants to create the car-type, so return it
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

}
