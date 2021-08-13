import { FormControl, FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-address-input',
  templateUrl: './address-input.component.html',
  styleUrls: ['./address-input.component.scss']
})
export class AddressInputComponent implements OnInit {

  @Input() parentFormGroup: FormGroup
  @Input() address: FormControl
  @Input() city: FormControl
  @Input() postalCode: FormControl
  @Input() country: FormControl

  constructor() { }

  ngOnInit(): void {
  }

}
