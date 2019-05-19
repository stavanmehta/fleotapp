import { Component, ElementRef, ViewChild } from '@angular/core';
import { JhiDataUtils } from 'ng-jhipster';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { FleetOwner } from './fleet-owner.model';
import { FleetOwnerService } from './fleet-owner.provider';
import { User } from '../../../models/user.model';
import { User as UserService } from '../../../providers/user/user';
import { Turo, TuroService } from '../turo';

@IonicPage()
@Component({
    selector: 'page-fleet-owner-dialog',
    templateUrl: 'fleet-owner-dialog.html'
})
export class FleetOwnerDialogPage {

    fleetOwner: FleetOwner;
    users: User[];
    turos: Turo[];
    @ViewChild('fileInput') fileInput;
    cameraOptions: CameraOptions;
    createdAt: string;
    updatedAt: string;
    isReadyToSave: boolean;

    form: FormGroup;

    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public toastCtrl: ToastController,
                formBuilder: FormBuilder, params: NavParams,
                private dataUtils: JhiDataUtils, private elementRef: ElementRef, private camera: Camera,
                private userService: UserService,
                private turoService: TuroService,
                private fleetOwnerService: FleetOwnerService) {
        this.fleetOwner = params.get('item');
        if (this.fleetOwner && this.fleetOwner.id) {
            this.fleetOwnerService.find(this.fleetOwner.id).subscribe(data => {
                this.fleetOwner = data;
            });
        } else {
            this.fleetOwner = new FleetOwner();
        }

        this.form = formBuilder.group({
            id: [params.get('item') ? this.fleetOwner.id : null],
            companyName: [params.get('item') ? this.fleetOwner.companyName : null,  Validators.required],
            gender: [params.get('item') ? this.fleetOwner.gender : null,  Validators.required],
            phone: [params.get('item') ? this.fleetOwner.phone : null,  Validators.required],
            addressLine1: [params.get('item') ? this.fleetOwner.addressLine1 : null,  Validators.required],
            addressLine2: [params.get('item') ? this.fleetOwner.addressLine2 : null, ],
            city: [params.get('item') ? this.fleetOwner.city : null,  Validators.required],
            country: [params.get('item') ? this.fleetOwner.country : null,  Validators.required],
            image: [params.get('item') ? this.fleetOwner.image : null,  Validators.required],
            imageContentType: [params.get('item') ? this.fleetOwner.imageContentType : ''],
            createdAt: [params.get('item') ? this.fleetOwner.createdAt : null, ],
            updatedAt: [params.get('item') ? this.fleetOwner.updatedAt : null, ],
            user: [params.get('item') ? this.fleetOwner.user : '',],
            turo: [params.get('item') ? this.fleetOwner.turo : '',],
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
        this.userService.findAll().subscribe(data => this.users = data, (error) => this.onError(error));
        this.turoService
            .query({filter: 'fleetowner-is-null'})
            .subscribe(data => {
                if (!this.fleetOwner.turo || !this.fleetOwner.turo.id) {
                    this.turos = data;
                } else {
                    this.turoService
                        .find(this.fleetOwner.turo.id)
                        .subscribe((subData: Turo) => {
                            this.turos = [subData].concat(subData);
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
     * The user is done and wants to create the fleet-owner, so return it
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
                this.fleetOwner[fieldName] = data;
                this.fleetOwner[fieldName + 'ContentType'] = 'image/jpeg';
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
        this.dataUtils.clearInputImage(this.fleetOwner, this.elementRef, field, fieldContentType, idInput);
        this.form.patchValue( {[field]: ''} );
    }
    compareUser(first: User, second: User): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
    compareTuro(first: Turo, second: Turo): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackTuroById(index: number, item: Turo) {
        return item.id;
    }
}
