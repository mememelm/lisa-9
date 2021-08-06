import { FormGroup } from '@angular/forms';
import { ControllerService } from './../../services/controller.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mandate-undersigned',
  templateUrl: './mandate-undersigned.component.html',
  styleUrls: ['./mandate-undersigned.component.scss']
})
export class MandateUndersignedComponent implements OnInit {

  mandateForm: FormGroup

  constructor(public ctrl: ControllerService) { }

  ngOnInit(): void {

  }
}
