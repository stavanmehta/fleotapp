import { BaseEntity } from './../../../models';

export class Album implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public description?: any,
        public created?: any,
        public car?: BaseEntity,
    ) {
    }
}
