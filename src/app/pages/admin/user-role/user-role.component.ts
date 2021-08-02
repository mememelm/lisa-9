import { Role } from './../../../constants/models/role';
import { Endpoints } from './../../../constants/classes/endpoints';
import { ControllerService } from './../../../services/controller.service';
import { Component, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.scss']
})
export class UserRoleComponent implements OnInit, OnChanges, OnDestroy {

  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective
  dtOptions: DataTables.Settings = {}
  dtTrigger = new Subject()

  roleForm: FormGroup
  listRole: Role[]

  constructor(public ctrl: ControllerService) { }

  ngOnInit(): void {
    if (!this.ctrl.storage.user()) {
      this.ctrl.router.navigate([''])
    }

    this.roleForm = this.ctrl.fb.group({
      id: [''],
      label: ['', Validators.required],
      abbreviation: ['', Validators.required],
      active: [1]
    })

    this.dtOptions = {
      language: this.ctrl.frenchDatatable,
      responsive: true,
      destroy: true
    }

    this.loadRole()
  }

  ngOnChanges(): void {
    this.loadChange()
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe()
  }

  loadRole() {
    this.ctrl.api.get(Endpoints.ROLE_GET).subscribe((role: any) => {
      if (role?.message == 'success') {
        this.listRole = role.data
        this.dtTrigger.next()
      } else {
        this.ctrl.alert.actionError()
      }
    })
  }

  loadChange() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy()
      this.loadRole()
    })
  }

}
