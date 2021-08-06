import { ControllerService } from './../../../services/controller.service';
import { Role } from './../../../constants/models/role';
import { UserAcl } from './../../../constants/models/user-acl';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-space',
  templateUrl: './header-space.component.html',
  styleUrls: ['./header-space.component.scss']
})
export class HeaderSpaceComponent implements OnInit {

  user: UserAcl
  role: Role

  constructor(public ctrl: ControllerService) { }

  ngOnInit(): void {
    this.user = this.ctrl.storage.user()
    this.role = this.ctrl.storage.role()
  }

}
