import { BaseEntity } from './../../../models';

export class CarType implements BaseEntity {
    constructor(
        public id?: number,
        public typeName?: string,
        public cars?: BaseEntity[],
    ) {
    }
}
