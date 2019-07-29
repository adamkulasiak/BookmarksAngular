import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'bookmark-list',
  template: `
  <div class="panel panel-default">
    <table class="table table-striped">
      <tr *ngFor="let bookmark of bookmarks">
        <td>
          <a [href]="bookmark.Url" target="_blank">
            {{bookmark.Title}}
          </a>
        </td>
        <td>
          <button (click)="onRemove(bookmark)" class="btn btn-danger">Usuń</button>
          <button (click)="onEdit(bookmark)" class="btn btn-warning">Edytuj</button>
        </td>
      </tr>
    </table>
  </div>
  `,
})
export class BookmarkListComponent {

  @Input() bookmarks = [];
  @Output() remove = new EventEmitter();
  @Output() edit = new EventEmitter();

  onRemove(bookmark) {
    this.remove.emit(bookmark);
  }

  onEdit(bookmark) {
    this.edit.emit(bookmark);
  }

}
