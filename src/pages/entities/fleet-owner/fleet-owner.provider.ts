import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Api } from '../../../providers/api/api';
// todo: handle dates

import { FleetOwner } from './fleet-owner.model';

@Injectable()
export class FleetOwnerService {
    private resourceUrl = Api.API_URL + '/fleet-owners';

    constructor(private http: HttpClient) { }

    create(fleetOwner: FleetOwner): Observable<FleetOwner> {
        return this.http.post(this.resourceUrl, fleetOwner);
    }

    update(fleetOwner: FleetOwner): Observable<FleetOwner> {
        return this.http.put(this.resourceUrl, fleetOwner);
    }

    find(id: number): Observable<FleetOwner> {
        return this.http.get(`${this.resourceUrl}/${id}`);
    }

    query(req?: any): Observable<any> {
        return this.http.get(this.resourceUrl);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response', responseType: 'text' });
    }
}
