import { BaseEntity } from './../../../models';

export class Photo implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public description?: any,
        public imageContentType?: string,
        public image?: any,
        public height?: number,
        public width?: number,
        public taken?: any,
        public uploaded?: any,
        public album?: BaseEntity,
        public tags?: BaseEntity[],
    ) {
    }
}
