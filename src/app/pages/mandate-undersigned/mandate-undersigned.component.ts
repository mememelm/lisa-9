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
    this.mandateForm = this.ctrl.fb.group({
      ref: [''],
      type_mandate: [''],
      gender: [''],
      first_name: [''],
      last_name: [''],
      date_birth: [''],
      place_birth: [''],
      department: [''],
      nationality: [''],
      email: [''],
      address: [''],
      city: [''],
      postal_code: [''],
      country: [''],
      personnal_phone: [''],
      home_phone: [''],
      society_name: [''],
      legal_status: [''],
      society_capital: [''],
      society_id_number: [''],
      society_rcs: [''],
      person_representing: ['']
    })

    this.mandateForm.valueChanges.subscribe(() => {
      this.mandateForm.value['personnal_phone'] = this.mandateForm.value['personnal_phone']?.internationalNumber
      this.mandateForm.value['home_phone'] = this.mandateForm.value['home_phone']?.internationalNumber
    })
  }
}
