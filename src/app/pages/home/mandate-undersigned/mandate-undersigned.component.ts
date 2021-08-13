import { AbstractControl, FormGroup } from '@angular/forms';
import { ControllerService } from '../../../services/controller.service';
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
  displayCondition = false

  constructor(public ctrl: ControllerService) { }

  get client(): AbstractControl {
    return this.situationClientForm.get('client')
  }

  get avi(): AbstractControl {
    return this.situationAviForm.get('avi')
  }

  get margin_negociation(): AbstractControl {
    return this.mandateForm.get('margin_negociation')
  }

  get additional_hour_type(): AbstractControl {
    return this.mandateForm.get('additional_hour_type')
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
      avi_id_number: [''],
      object_cession: [''],
      building_place: [''],
      building_address: [''],
      building_city: [''],
      building_postal_code: [''],
      building_country: [''],
      building_name: [''],
      building_area: [''],
      building_description: [''],
      building_lot: [''],
      net_price: [''],
      net_price_text: [''],
      condition: [''],
      margin_negociation: [15],
      honorary_ht: [''],
      honorary_ht_text: [''],
      honorary_ttc: [''],
      honorary_ttc_text: [''],
      honorary_modality: [''],
      additional_percent_ht: [''],
      additional_percent_ht_text: [''],
      additional_percent_ttc: [''],
      additional_percent_ttc_text: [''],
      additional_amount_ht: [''],
      additional_amount_ht_text: [''],
      additional_amount_ttc: [''],
      additional_amount_ttc_text: [''],
      additional_hour_type: ['']
    })

    this.mandateForm.valueChanges.subscribe(() => {
      this.mandateForm.value['personnal_phone'] = this.mandateForm.value['personnal_phone']?.internationalNumber
      this.mandateForm.value['home_phone'] = this.mandateForm.value['home_phone']?.internationalNumber
      this.margin_negociation.value == 'other' ? this.displayCondition = true : this.displayCondition = false
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
