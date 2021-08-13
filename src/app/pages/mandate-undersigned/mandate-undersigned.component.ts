import { AbstractControl, FormGroup } from '@angular/forms';
import { ControllerService } from './../../services/controller.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mandate-undersigned',
  templateUrl: './mandate-undersigned.component.html',
  styleUrls: ['./mandate-undersigned.component.scss']
})
export class MandateUndersignedComponent implements OnInit {

  mandateForm: FormGroup
  situationClientForm: FormGroup
  situationAviForm: FormGroup

  constructor(public ctrl: ControllerService) { }

  get client(): AbstractControl {
    return this.situationClientForm.get('client')
  }

  get avi(): AbstractControl {
    return this.situationAviForm.get('avi')
  }

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
      person_representing: [''],
      avi_last_name: [''],
      avi_first_name: [''],
      avi_lawyer_office: [''],
      avi_toque: [''],
      avi_email: [''],
      avi_address: [''],
      avi_city: [''],
      avi_postal_code: [''],
      avi_country: [''],
      avi_personnal_phone: [''],
      avi_home_phone: [''],
      avi_declaration_date: [''],
      avi_society_name: [''],
      avi_legal_status: [''],
      avi_society_capital: [''],
      avi_rcs: [''],
      avi_id_number: ['']
    })

    this.mandateForm.valueChanges.subscribe(() => {
      this.mandateForm.value['personnal_phone'] = this.mandateForm.value['personnal_phone']?.internationalNumber
      this.mandateForm.value['home_phone'] = this.mandateForm.value['home_phone']?.internationalNumber
    })

    this.initializeClientSituation()
    this.initializeAviSituation()
  }

  initializeClientSituation() {
    this.situationClientForm = this.ctrl.fb.group({
      client: ['person']
    })
  }

  initializeAviSituation() {
    this.situationAviForm = this.ctrl.fb.group({
      avi: ['lawyer']
    })
  }
}
