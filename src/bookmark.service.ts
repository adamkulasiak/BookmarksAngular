import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class BookmarkService {

    private baseUrl = 'https://bookmarks-3986a.firebaseio.com/';

    constructor(private http: Http) { }

    removeBookmark(bookmark) {
        return this.http.delete(`${this.baseUrl}/bookmarks/${bookmark.id}.json`)
            .toPromise();
    }

    addBookmark(bookmark) {
        const json = JSON.stringify(bookmark);
        return this.http.post(`${this.baseUrl}/bookmarks.json`, json)
            .toPromise();
    }

    getBookmarks() {
        return this.http.get(`${this.baseUrl}/bookmarks.json`)
            .toPromise()
            .then(response => this.convert(response.json()));
    }

    private convert(convertResponse) {
        return Object.keys(convertResponse)
            .map(id => ({
                id: id,
                Title: convertResponse[id].Title,
                Url: convertResponse[id].Url
            }));
    }
}