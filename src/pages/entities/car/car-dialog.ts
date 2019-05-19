import { Component, ElementRef, ViewChild } from '@angular/core';
import { JhiDataUtils } from 'ng-jhipster';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Car } from './car.model';
import { CarService } from './car.provider';
import { CarType, CarTypeService } from '../car-type';
import { FleetOwner, FleetOwnerService } from '../fleet-owner';

@IonicPage()
@Component({
    selector: 'page-car-dialog',
    templateUrl: 'car-dialog.html'
})
export class CarDialogPage {

    car: Car;
    cartypes: CarType[];
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
                private carTypeService: CarTypeService,
                private fleetOwnerService: FleetOwnerService,
                private carService: CarService) {
        this.car = params.get('item');
        if (this.car && this.car.id) {
            this.carService.find(this.car.id).subscribe(data => {
                this.car = data;
            });
        } else {
            this.car = new Car();
        }

        this.form = formBuilder.group({
            id: [params.get('item') ? this.car.id : null],
            brand: [params.get('item') ? this.car.brand : null,  Validators.required],
            model: [params.get('item') ? this.car.model : null,  Validators.required],
            registrationNo: [params.get('item') ? this.car.registrationNo : null,  Validators.required],
            image: [params.get('item') ? this.car.image : null,  Validators.required],
            imageContentType: [params.get('item') ? this.car.imageContentType : ''],
            manufacturerYear: [params.get('item') ? this.car.manufacturerYear : null,  Validators.required],
            driverId: [params.get('item') ? this.car.driverId : null, ],
            description: [params.get('item') ? this.car.description : null, ],
            ageRestriction: [params.get('item') ? this.car.ageRestriction : null,  Validators.required],
            dailyRate: [params.get('item') ? this.car.dailyRate : null,  Validators.required],
            hourlyRate: [params.get('item') ? this.car.hourlyRate : null, ],
            milesSurcharge: [params.get('item') ? this.car.milesSurcharge : null, ],
            lateReturnFee: [params.get('item') ? this.car.lateReturnFee : null, ],
            cleaningFee: [params.get('item') ? this.car.cleaningFee : null, ],
            deposit: [params.get('item') ? this.car.deposit : null, ],
            createdAt: [params.get('item') ? this.car.createdAt : null, ],
            updatedAt: [params.get('item') ? this.car.updatedAt : null, ],
            carType: [params.get('item') ? this.car.cartype : '',],
            fleetOwner: [params.get('item') ? this.car.fleetowner : '',],
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
        this.carTypeService.query()
            .subscribe(data => { this.cartypes = data; }, (error) => this.onError(error));
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
     * The user is done and wants to create the car, so return it
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
                this.car[fieldName] = data;
                this.car[fieldName + 'ContentType'] = 'image/jpeg';
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
        this.dataUtils.clearInputImage(this.car, this.elementRef, field, fieldContentType, idInput);
        this.form.patchValue( {[field]: ''} );
    }
    compareCarType(first: CarType, second: CarType): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackCarTypeById(index: number, item: CarType) {
        return item.id;
    }
    compareFleetOwner(first: FleetOwner, second: FleetOwner): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackFleetOwnerById(index: number, item: FleetOwner) {
        return item.id;
    }
}
