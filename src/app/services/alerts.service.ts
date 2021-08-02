import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  title = 'LISA'

  constructor(private toastr: ToastrService) { }

  success(message: string) {
    this.toastr.success(message, this.title)
  }

  error(message: string) {
    this.toastr.success(message, this.title)
  }

  warn(message: string) {
    this.toastr.warning(message, this.title)
  }

  actionError() {
    this.toastr.error('Une erreur est survenue. Veuillez réessayer ultérieurement.')
  }

  actionSuccess() {
    this.toastr.error('Enregistrement réussi.')
  }

  actionUpdate() {
    this.toastr.error('Modification réussie.')
  }

  actionDelete() {
    this.toastr.error('Suppression effectuée.')
  }
}
