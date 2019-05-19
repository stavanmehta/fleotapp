import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Api } from '../../../providers/api/api';

import { CarType } from './car-type.model';

@Injectable()
export class CarTypeService {
    private resourceUrl = Api.API_URL + '/car-types';

    constructor(private http: HttpClient) { }

    create(carType: CarType): Observable<CarType> {
        return this.http.post(this.resourceUrl, carType);
    }

    update(carType: CarType): Observable<CarType> {
        return this.http.put(this.resourceUrl, carType);
    }

    find(id: number): Observable<CarType> {
        return this.http.get(`${this.resourceUrl}/${id}`);
    }

    query(req?: any): Observable<any> {
        return this.http.get(this.resourceUrl);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response', responseType: 'text' });
    }
}
