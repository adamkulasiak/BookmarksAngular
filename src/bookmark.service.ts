import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class BookmarkService {

    private baseUrl = 'https://bookmarks-3986a.firebaseio.com/';

    errorHandler = error => console.error('BookmarkService error', error);

    constructor(private http: Http) { }

    removeBookmark(bookmark) {
        return this.http.delete(`${this.baseUrl}/bookmarks/${bookmark.id}.json`)
            .toPromise()
            .catch(this.errorHandler);
    }

    addBookmark(bookmark) {
        const json = JSON.stringify(bookmark);
        return this.http.post(`${this.baseUrl}/bookmarks.json`, json)
            .toPromise()
            .catch(this.errorHandler);
    }

    updateBookmark(bookmark) {
        const json = JSON.stringify({
            Title: bookmark.Title,
            Url: bookmark.Url
        });
        return this.http.patch(`${this.baseUrl}/bookmarks/${bookmark.id}.json`, json)
            .toPromise()
            .catch(this.errorHandler);
    }

    getBookmarks() {
        return this.http.get(`${this.baseUrl}/bookmarks.json`)
            .toPromise()
            .then(response => this.convert(response.json()))
            .catch(this.errorHandler);
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