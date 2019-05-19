import { BaseEntity } from './../../../models';

export class Turo implements BaseEntity {
    constructor(
        public id?: number,
        public turoId?: string,
    ) {
    }
}
