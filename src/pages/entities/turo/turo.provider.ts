import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Api } from '../../../providers/api/api';

import { Turo } from './turo.model';

@Injectable()
export class TuroService {
    private resourceUrl = Api.API_URL + '/turos';

    constructor(private http: HttpClient) { }

    create(turo: Turo): Observable<Turo> {
        return this.http.post(this.resourceUrl, turo);
    }

    update(turo: Turo): Observable<Turo> {
        return this.http.put(this.resourceUrl, turo);
    }

    find(id: number): Observable<Turo> {
        return this.http.get(`${this.resourceUrl}/${id}`);
    }

    query(req?: any): Observable<any> {
        return this.http.get(this.resourceUrl);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response', responseType: 'text' });
    }
}
