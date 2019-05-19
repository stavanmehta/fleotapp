import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Api } from '../../../providers/api/api';
// todo: handle dates

import { Car } from './car.model';

@Injectable()
export class CarService {
    private resourceUrl = Api.API_URL + '/cars';

    constructor(private http: HttpClient) { }

    create(car: Car): Observable<Car> {
        return this.http.post(this.resourceUrl, car);
    }

    update(car: Car): Observable<Car> {
        return this.http.put(this.resourceUrl, car);
    }

    find(id: number): Observable<Car> {
        return this.http.get(`${this.resourceUrl}/${id}`);
    }

    query(req?: any): Observable<any> {
        return this.http.get(this.resourceUrl);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response', responseType: 'text' });
    }
}
