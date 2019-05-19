import { Component, ElementRef, ViewChild } from '@angular/core';
import { JhiDataUtils } from 'ng-jhipster';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Photo } from './photo.model';
import { PhotoService } from './photo.provider';
import { Album, AlbumService } from '../album';
import { Tag, TagService } from '../tag';

@IonicPage()
@Component({
    selector: 'page-photo-dialog',
    templateUrl: 'photo-dialog.html'
})
export class PhotoDialogPage {

    photo: Photo;
    albums: Album[];
    tags: Tag[];
    @ViewChild('fileInput') fileInput;
    cameraOptions: CameraOptions;
    taken: string;
    uploaded: string;
    isReadyToSave: boolean;

    form: FormGroup;

    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public toastCtrl: ToastController,
                formBuilder: FormBuilder, params: NavParams,
                private dataUtils: JhiDataUtils, private elementRef: ElementRef, private camera: Camera,
                private albumService: AlbumService,
                private tagService: TagService,
                private photoService: PhotoService) {
        this.photo = params.get('item');
        if (this.photo && this.photo.id) {
            this.photoService.find(this.photo.id).subscribe(data => {
                this.photo = data;
            });
        } else {
            this.photo = new Photo();
        }

        this.form = formBuilder.group({
            id: [params.get('item') ? this.photo.id : null],
            title: [params.get('item') ? this.photo.title : null,  Validators.required],
            description: [params.get('item') ? this.photo.description : null, ],
            image: [params.get('item') ? this.photo.image : null,  Validators.required],
            imageContentType: [params.get('item') ? this.photo.imageContentType : ''],
            height: [params.get('item') ? this.photo.height : null, ],
            width: [params.get('item') ? this.photo.width : null, ],
            taken: [params.get('item') ? this.photo.taken : null, ],
            uploaded: [params.get('item') ? this.photo.uploaded : null, ],
            album: [params.get('item') ? this.photo.album : '',],
            tags: [params.get('item') ? this.photo.tags : '',],
        });

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

        // Set the Camera options
        this.cameraOptions = {
            quality: 100,
            targetWidth: 900,
            targetHeight: 600,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            saveToPhotoAlbum: false,
            allowEdit: true,
            sourceType: 1
        };
    }

    ionViewDidLoad() {
        this.albumService.query()
            .subscribe(data => { this.albums = data; }, (error) => this.onError(error));
        this.tagService.query()
            .subscribe(data => { this.tags = data; }, (error) => this.onError(error));
    }

    /**
     * The user cancelled, dismiss without sending data back.
     */
    cancel() {
        this.viewCtrl.dismiss();
    }

    /**
     * The user is done and wants to create the photo, so return it
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
        this.processWebImage(event, field);
    }

    getPicture(fieldName) {
        if (Camera['installed']()) {
            this.camera.getPicture(this.cameraOptions).then((data) => {
                this.photo[fieldName] = data;
                this.photo[fieldName + 'ContentType'] = 'image/jpeg';
                this.form.patchValue({ [fieldName]: 'data:image/jpg;base64,' + data });
                this.form.patchValue({ [fieldName + 'ContentType']: 'image/jpeg' });
            }, (err) => {
                alert('Unable to take photo');
            })
        } else {
            this.fileInput.nativeElement.click();
        }
    }

    processWebImage(event, fieldName) {
        let reader = new FileReader();
        reader.onload = (readerEvent) => {

            let imageData = (readerEvent.target as any).result;
            const imageType = event.target.files[0].type;
            imageData = imageData.substring(imageData.indexOf(',') + 1);

            this.form.patchValue({ [fieldName]: imageData });
            this.form.patchValue({ [fieldName + 'ContentType']: imageType });
        };

        reader.readAsDataURL(event.target.files[0]);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.photo, this.elementRef, field, fieldContentType, idInput);
        this.form.patchValue( {[field]: ''} );
    }
    compareAlbum(first: Album, second: Album): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackAlbumById(index: number, item: Album) {
        return item.id;
    }
    compareTag(first: Tag, second: Tag): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackTagById(index: number, item: Tag) {
        return item.id;
    }
}
