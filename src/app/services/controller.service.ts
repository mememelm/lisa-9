import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { AlertsService } from './alerts.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ControllerService {

  constructor(
    public api: ApiService,
    public alert: AlertsService,
    public fb: FormBuilder,
    public router: Router
  ) { }

}
