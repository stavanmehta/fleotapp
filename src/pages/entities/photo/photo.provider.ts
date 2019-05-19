import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Api } from '../../../providers/api/api';
// todo: handle dates

import { Photo } from './photo.model';

@Injectable()
export class PhotoService {
    private resourceUrl = Api.API_URL + '/photos';

    constructor(private http: HttpClient) { }

    create(photo: Photo): Observable<Photo> {
        return this.http.post(this.resourceUrl, photo);
    }

    update(photo: Photo): Observable<Photo> {
        return this.http.put(this.resourceUrl, photo);
    }

    find(id: number): Observable<Photo> {
        return this.http.get(`${this.resourceUrl}/${id}`);
    }

    query(req?: any): Observable<any> {
        return this.http.get(this.resourceUrl);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response', responseType: 'text' });
    }
}
