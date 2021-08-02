import { ControllerService } from './../../../services/controller.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-registration',
  templateUrl: './header-registration.component.html',
  styleUrls: ['./header-registration.component.scss']
})
export class HeaderRegistrationComponent {

  @Input() displayConnexion = true
  @Input() displayRegistration = true

  constructor(public ctrl: ControllerService) { }

}
