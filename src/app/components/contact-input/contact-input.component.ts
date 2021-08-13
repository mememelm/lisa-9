import { FormGroup, FormControl } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-input',
  templateUrl: './contact-input.component.html',
  styleUrls: ['./contact-input.component.scss']
})
export class ContactInputComponent implements OnInit {

  @Input() parentFormGroup: FormGroup
  @Input() personnalPhone: FormControl
  @Input() homePhone: FormControl
  @Input() email: FormControl

  constructor() { }

  ngOnInit(): void {
  }

}
