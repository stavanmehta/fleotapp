import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Api } from '../../../providers/api/api';
// todo: handle dates

import { Rental } from './rental.model';

@Injectable()
export class RentalService {
    private resourceUrl = Api.API_URL + '/rentals';

    constructor(private http: HttpClient) { }

    create(rental: Rental): Observable<Rental> {
        return this.http.post(this.resourceUrl, rental);
    }

    update(rental: Rental): Observable<Rental> {
        return this.http.put(this.resourceUrl, rental);
    }

    find(id: number): Observable<Rental> {
        return this.http.get(`${this.resourceUrl}/${id}`);
    }

    query(req?: any): Observable<any> {
        return this.http.get(this.resourceUrl);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response', responseType: 'text' });
    }
}
