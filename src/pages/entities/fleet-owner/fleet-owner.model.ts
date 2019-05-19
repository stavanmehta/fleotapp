import { BaseEntity, User } from './../../../models';

export const enum Gender {
    'MALE',
    'FEMALE',
    'OTHER'
}

export class FleetOwner implements BaseEntity {
    constructor(
        public id?: number,
        public companyName?: string,
        public gender?: Gender,
        public phone?: string,
        public addressLine1?: string,
        public addressLine2?: string,
        public city?: string,
        public country?: string,
        public imageContentType?: string,
        public image?: any,
        public createdAt?: any,
        public updatedAt?: any,
        public user?: User,
        public turo?: BaseEntity,
        public cars?: BaseEntity[],
        public drivers?: BaseEntity[],
    ) {
    }
}
