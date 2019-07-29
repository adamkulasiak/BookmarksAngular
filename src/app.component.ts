import { Component } from '@angular/core';
import { BookmarkService } from './bookmark.service';

@Component({
  selector: 'bookmark-app',
  template: `
      <bookmark-edit (save)="save($event)" [bookmark]="editableBookmark"></bookmark-edit>
      <bookmark-list (remove)="remove($event)" (edit)="edit($event)" [bookmarks]="bookmarks"></bookmark-list>

  `,
})
export class AppComponent {

  bookmarks = [];
  editableBookmark = {};

  constructor(private bookmarkService : BookmarkService)
  {
    this.reload(); 
  }

    edit(bookmark) {
      this.editableBookmark = Object.assign({}, bookmark);
    }

    remove(bookmark) { 
      this.bookmarkService.removeBookmark(bookmark)
        .then(() => this.reload());
    }

    save(bookmark) {
      if(bookmark.id) {
        this.bookmarkService.updateBookmark(this.editableBookmark)
          .then(() => this.reload());
      } else {
        this.bookmarkService.addBookmark(bookmark)
          .then(() => this.reload());
      }
      this.editableBookmark = { };
  }

  private reload() {
    return this.bookmarkService.getBookmarks()
      .then(bookmarks => this.bookmarks = bookmarks);
  }
}
