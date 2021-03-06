import { FrenchDataTable } from './../constants/classes/french-datatable';
import { StorageService } from './storage.service';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { AlertsService } from './alerts.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RoutesExt } from './routes';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ControllerService {

  public frenchDatatable = FrenchDataTable

  constructor(
    public api: ApiService,
    public alert: AlertsService,
    public storage: StorageService,
    public fb: FormBuilder,
    public router: Router,
    public route: RoutesExt,
    public modal: NgbModal,
  ) { }

  async initializeSuccess(reload: void, alert: void) {
    this.closeModal()
    await <any>reload
    return alert
  }

  checkResultChange(res: any, reload: void, alert: void) {
    res.message == 'success' ? this.initializeSuccess(reload, alert)
      : this.alert.actionError()
  }

  async logOut() {
    await <any>localStorage.clear()
    this.closeModal()
    this.router.navigate([''])
  }

  openModal(container, windowClass: string) {
    this.modal.open(container, { windowClass: windowClass })
  }

  closeModal() {
    this.modal.dismissAll()
  }

  scrollElement(element: any) {
    element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })
  }
}
