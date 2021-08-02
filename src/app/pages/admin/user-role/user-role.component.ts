import { ControllerService } from './../../../services/controller.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.scss']
})
export class UserRoleComponent implements OnInit {

  constructor(private ctrl: ControllerService) { }

  ngOnInit(): void {
    if (!this.ctrl.storage.user()) {
      this.ctrl.router.navigate([''])
    }
  }

}
