import { Component, ElementRef, ViewChild } from '@angular/core';
import { JhiDataUtils } from 'ng-jhipster';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Driver } from './driver.model';
import { DriverService } from './driver.provider';
import { Car, CarService } from '../car';
import { FleetOwner, FleetOwnerService } from '../fleet-owner';

@IonicPage()
@Component({
    selector: 'page-driver-dialog',
    templateUrl: 'driver-dialog.html'
})
export class DriverDialogPage {

    driver: Driver;
    cars: Car[];
    fleetowners: FleetOwner[];
    @ViewChild('fileInput') fileInput;
    cameraOptions: CameraOptions;
    createdAt: string;
    updatedAt: string;
    isReadyToSave: boolean;

    form: FormGroup;

    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public toastCtrl: ToastController,
                formBuilder: FormBuilder, params: NavParams,
                private dataUtils: JhiDataUtils, private elementRef: ElementRef, private camera: Camera,
                private carService: CarService,
                private fleetOwnerService: FleetOwnerService,
                private driverService: DriverService) {
        this.driver = params.get('item');
        if (this.driver && this.driver.id) {
            this.driverService.find(this.driver.id).subscribe(data => {
                this.driver = data;
            });
        } else {
            this.driver = new Driver();
        }

        this.form = formBuilder.group({
            id: [params.get('item') ? this.driver.id : null],
            firstName: [params.get('item') ? this.driver.firstName : null,  Validators.required],
            lastName: [params.get('item') ? this.driver.lastName : null,  Validators.required],
            email: [params.get('item') ? this.driver.email : null,  Validators.required],
            gender: [params.get('item') ? this.driver.gender : null,  Validators.required],
            phone: [params.get('item') ? this.driver.phone : null,  Validators.required],
            addressLine1: [params.get('item') ? this.driver.addressLine1 : null,  Validators.required],
            addressLine2: [params.get('item') ? this.driver.addressLine2 : null, ],
            city: [params.get('item') ? this.driver.city : null,  Validators.required],
            country: [params.get('item') ? this.driver.country : null,  Validators.required],
            licenseNo: [params.get('item') ? this.driver.licenseNo : null,  Validators.required],
            licenseImage: [params.get('item') ? this.driver.licenseImage : null,  Validators.required],
            licenseImageContentType: [params.get('item') ? this.driver.licenseImageContentType : ''],
            nid: [params.get('item') ? this.driver.nid : null,  Validators.required],
            nidImage: [params.get('item') ? this.driver.nidImage : null,  Validators.required],
            nidImageContentType: [params.get('item') ? this.driver.nidImageContentType : ''],
            image: [params.get('item') ? this.driver.image : null,  Validators.required],
            imageContentType: [params.get('item') ? this.driver.imageContentType : ''],
            createdAt: [params.get('item') ? this.driver.createdAt : null, ],
            updatedAt: [params.get('item') ? this.driver.updatedAt : null, ],
            car: [params.get('item') ? this.driver.car : '',],
            fleetOwner: [params.get('item') ? this.driver.fleetowner : '',],
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
        this.carService
            .query({filter: 'driver-is-null'})
            .subscribe(data => {
                if (!this.driver.car || !this.driver.car.id) {
                    this.cars = data;
                } else {
                    this.carService
                        .find(this.driver.car.id)
                        .subscribe((subData: Car) => {
                            this.cars = [subData].concat(subData);
                        }, (error) => this.onError(error));
                }
            }, (error) => this.onError(error));
        this.fleetOwnerService.query()
            .subscribe(data => { this.fleetowners = data; }, (error) => this.onError(error));
    }

    /**
     * The user cancelled, dismiss without sending data back.
     */
    cancel() {
        this.viewCtrl.dismiss();
    }

    /**
     * The user is done and wants to create the driver, so return it
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
                this.driver[fieldName] = data;
                this.driver[fieldName + 'ContentType'] = 'image/jpeg';
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
        this.dataUtils.clearInputImage(this.driver, this.elementRef, field, fieldContentType, idInput);
        this.form.patchValue( {[field]: ''} );
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
