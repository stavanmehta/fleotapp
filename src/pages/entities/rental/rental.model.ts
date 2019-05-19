import { BaseEntity } from './../../../models';

export class Rental implements BaseEntity {
    constructor(
        public id?: number,
        public startAt?: any,
        public endAat?: any,
        public car?: BaseEntity,
        public fleetowner?: BaseEntity,
    ) {
    }
}
