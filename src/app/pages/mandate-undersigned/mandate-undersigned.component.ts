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
      cli1_gender: [''],
      cli1_first_name: [''],
      cli1_last_name: [''],
      cli1_date_birth: [''],
      cli1_place_birth: [''],
      cli1_department: [''],
      cli1_nationality: [''],
      cli1_email: [''],
      cli1_address: [''],
      cli1_city: [''],
      cli1_postal_code: [''],
      cli1_country: [''],
      cli1_personnal_phone: [''],
      cli1_home_phone: [''],
    })

    this.mandateForm.valueChanges.subscribe(() => {
      this.mandateForm.value['cli1_personnal_phone'] = this.mandateForm.value['cli1_personnal_phone']?.internationalNumber
      this.mandateForm.value['cli1_home_phone'] = this.mandateForm.value['cli1_home_phone']?.internationalNumber
    })
  }
}
