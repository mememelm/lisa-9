import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-person-information',
  templateUrl: './person-information.component.html',
  styleUrls: ['./person-information.component.scss']
})
export class PersonInformationComponent implements OnInit {

  @Input() display = true
  @Input() parentFormGroup: FormGroup

  personGender: Array<any> = [
    { value: 1, display: 'Madame' },
    { value: 2, display: 'Monsieur' }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
