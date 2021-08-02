import { StorageService } from './storage.service';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { AlertsService } from './alerts.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RoutesExt } from './routes';

@Injectable({
  providedIn: 'root'
})
export class ControllerService {

  constructor(
    public api: ApiService,
    public alert: AlertsService,
    public storage: StorageService,
    public fb: FormBuilder,
    public router: Router,
    public route: RoutesExt
  ) { }

}
