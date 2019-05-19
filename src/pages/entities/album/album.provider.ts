import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Api } from '../../../providers/api/api';
// todo: handle dates

import { Album } from './album.model';

@Injectable()
export class AlbumService {
    private resourceUrl = Api.API_URL + '/albums';

    constructor(private http: HttpClient) { }

    create(album: Album): Observable<Album> {
        return this.http.post(this.resourceUrl, album);
    }

    update(album: Album): Observable<Album> {
        return this.http.put(this.resourceUrl, album);
    }

    find(id: number): Observable<Album> {
        return this.http.get(`${this.resourceUrl}/${id}`);
    }

    query(req?: any): Observable<any> {
        return this.http.get(this.resourceUrl);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response', responseType: 'text' });
    }
}
