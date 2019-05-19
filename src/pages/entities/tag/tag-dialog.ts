import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Tag } from './tag.model';
import { TagService } from './tag.provider';
import { Photo, PhotoService } from '../photo';

@IonicPage()
@Component({
    selector: 'page-tag-dialog',
    templateUrl: 'tag-dialog.html'
})
export class TagDialogPage {

    tag: Tag;
    photos: Photo[];
    isReadyToSave: boolean;

    form: FormGroup;

    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public toastCtrl: ToastController,
                formBuilder: FormBuilder, params: NavParams,
                private photoService: PhotoService,
                private tagService: TagService) {
        this.tag = params.get('item');
        if (this.tag && this.tag.id) {
            this.tagService.find(this.tag.id).subscribe(data => {
                this.tag = data;
            });
        } else {
            this.tag = new Tag();
        }

        this.form = formBuilder.group({
            id: [params.get('item') ? this.tag.id : null],
            name: [params.get('item') ? this.tag.name : null,  Validators.required],
            photos: [params.get('item') ? this.tag.photos : '',],
        });

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ionViewDidLoad() {
        this.photoService.query()
            .subscribe(data => { this.photos = data; }, (error) => this.onError(error));
    }

    /**
     * The user cancelled, dismiss without sending data back.
     */
    cancel() {
        this.viewCtrl.dismiss();
    }

    /**
     * The user is done and wants to create the tag, so return it
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

    comparePhoto(first: Photo, second: Photo): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackPhotoById(index: number, item: Photo) {
        return item.id;
    }
}
