import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Turo } from './turo.model';
import { TuroService } from './turo.provider';

@IonicPage()
@Component({
    selector: 'page-turo-dialog',
    templateUrl: 'turo-dialog.html'
})
export class TuroDialogPage {

    turo: Turo;
    isReadyToSave: boolean;

    form: FormGroup;

    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public toastCtrl: ToastController,
                formBuilder: FormBuilder, params: NavParams,
                private turoService: TuroService) {
        this.turo = params.get('item');
        if (this.turo && this.turo.id) {
            this.turoService.find(this.turo.id).subscribe(data => {
                this.turo = data;
            });
        } else {
            this.turo = new Turo();
        }

        this.form = formBuilder.group({
            id: [params.get('item') ? this.turo.id : null],
            turoId: [params.get('item') ? this.turo.turoId : null, ],
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
     * The user is done and wants to create the turo, so return it
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
