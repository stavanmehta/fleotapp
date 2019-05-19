import { Component } from '@angular/core';
import { JhiDataUtils } from 'ng-jhipster';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Album } from './album.model';
import { AlbumService } from './album.provider';
import { Car, CarService } from '../car';

@IonicPage()
@Component({
    selector: 'page-album-dialog',
    templateUrl: 'album-dialog.html'
})
export class AlbumDialogPage {

    album: Album;
    cars: Car[];
    created: string;
    isReadyToSave: boolean;

    form: FormGroup;

    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public toastCtrl: ToastController,
                formBuilder: FormBuilder, params: NavParams,
                private dataUtils: JhiDataUtils,                 private carService: CarService,
                private albumService: AlbumService) {
        this.album = params.get('item');
        if (this.album && this.album.id) {
            this.albumService.find(this.album.id).subscribe(data => {
                this.album = data;
            });
        } else {
            this.album = new Album();
        }

        this.form = formBuilder.group({
            id: [params.get('item') ? this.album.id : null],
            title: [params.get('item') ? this.album.title : null,  Validators.required],
            description: [params.get('item') ? this.album.description : null, ],
            created: [params.get('item') ? this.album.created : null, ],
            car: [params.get('item') ? this.album.car : '',],
        });

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ionViewDidLoad() {
        this.carService.query()
            .subscribe(data => { this.cars = data; }, (error) => this.onError(error));
    }

    /**
     * The user cancelled, dismiss without sending data back.
     */
    cancel() {
        this.viewCtrl.dismiss();
    }

    /**
     * The user is done and wants to create the album, so return it
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

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
        
    }

    compareCar(first: Car, second: Car): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackCarById(index: number, item: Car) {
        return item.id;
    }
}
