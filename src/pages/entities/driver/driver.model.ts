import { BaseEntity } from './../../../models';

export const enum Gender {
    'MALE',
    'FEMALE',
    'OTHER'
}

export class Driver implements BaseEntity {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public email?: string,
        public gender?: Gender,
        public phone?: string,
        public addressLine1?: string,
        public addressLine2?: string,
        public city?: string,
        public country?: string,
        public licenseNo?: string,
        public licenseImageContentType?: string,
        public licenseImage?: any,
        public nid?: string,
        public nidImageContentType?: string,
        public nidImage?: any,
        public imageContentType?: string,
        public image?: any,
        public createdAt?: any,
        public updatedAt?: any,
        public car?: BaseEntity,
        public fleetowner?: BaseEntity,
    ) {
    }
}
