import { BaseEntity } from './../../../models';

export class Car implements BaseEntity {
    constructor(
        public id?: number,
        public brand?: string,
        public model?: string,
        public registrationNo?: string,
        public imageContentType?: string,
        public image?: any,
        public manufacturerYear?: number,
        public driverId?: number,
        public description?: string,
        public ageRestriction?: number,
        public dailyRate?: number,
        public hourlyRate?: number,
        public milesSurcharge?: number,
        public lateReturnFee?: number,
        public cleaningFee?: number,
        public deposit?: number,
        public createdAt?: any,
        public updatedAt?: any,
        public cartype?: BaseEntity,
        public fleetowner?: BaseEntity,
    ) {
    }
}
