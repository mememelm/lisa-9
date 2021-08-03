import { Role } from './../../../constants/models/role';
import { Endpoints } from './../../../constants/classes/endpoints';
import { UserAcl } from './../../../constants/models/user-acl';
import { FormGroup } from '@angular/forms';
import { ControllerService } from './../../../services/controller.service';
import { Component, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnChanges, OnDestroy {

  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective
  dtOptions: DataTables.Settings = {}
  dtTrigger = new Subject()

  userForm: FormGroup
  listUser = []
  user: UserAcl
  listRole: Role[]

  constructor(public ctrl: ControllerService) { }

  ngOnInit(): void {
    if (!this.ctrl.storage.user()) {
      this.ctrl.router.navigate([''])
    }

    this.dtOptions = {
      language: this.ctrl.frenchDatatable,
      responsive: true,
      destroy: true
    }

    this.userForm = this.ctrl.fb.group({
      user_acl_ID: [''],
      hoomeRoleUserRoleID: ['']
    })

    this.loadUser()
    this.ctrl.api.get(Endpoints.ROLE_GET).subscribe((role: any) => {
      if (role?.message == 'success') {
        this.listRole = role.data
      } else {
        this.ctrl.alert.actionError()
      }
    })
  }

  ngOnChanges(): void {
    this.loadChange()
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe()
  }

  loadUser() {
    this.ctrl.api.get(Endpoints.USER_GET).subscribe((user: any) => {
      if (user?.message == 'success') {
        this.listUser = user.data
        this.dtTrigger.next()
      } else {
        this.ctrl.alert.actionError()
      }
    })
  }

  loadChange() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy()
      this.loadUser()
    })
  }

  selectUser(user: UserAcl, container) {
    this.user = user
    this.userForm.setValue({
      user_acl_ID: user.user_acl_ID,
      hoomeRoleUserRoleID: user.hoomeRoleUserRoleID
    })
    this.ctrl.openModal(container, 'my-modal-lg')
  }

  updateUser() {
    this.ctrl.api.put(Endpoints.USER_UPDATE + this.userForm.value['user_acl_ID'], this.userForm.value).subscribe((user: any) => {
      this.ctrl.checkResultChange(user, this.loadChange(), this.ctrl.alert.actionUpdate())
    })
  }


}
