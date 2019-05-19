import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Api } from '../../../providers/api/api';
// todo: handle dates

import { Driver } from './driver.model';

@Injectable()
export class DriverService {
    private resourceUrl = Api.API_URL + '/drivers';

    constructor(private http: HttpClient) { }

    create(driver: Driver): Observable<Driver> {
        return this.http.post(this.resourceUrl, driver);
    }

    update(driver: Driver): Observable<Driver> {
        return this.http.put(this.resourceUrl, driver);
    }

    find(id: number): Observable<Driver> {
        return this.http.get(`${this.resourceUrl}/${id}`);
    }

    query(req?: any): Observable<any> {
        return this.http.get(this.resourceUrl);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response', responseType: 'text' });
    }
}
