import { Component, Input } from '@angular/core';
import { SearchUserResponse } from 'src/app/model/response/search-user-response';

@Component({
  selector: 'app-user-list-view',
  templateUrl: './user-list-view.component.html',
  styleUrls: ['./user-list-view.component.css']
})
export class UserListViewComponent {
  @Input()
  userList!: SearchUserResponse[];

  constructor() {}
}
