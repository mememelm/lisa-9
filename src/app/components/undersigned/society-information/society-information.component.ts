import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-society-information',
  templateUrl: './society-information.component.html',
  styleUrls: ['./society-information.component.scss']
})
export class SocietyInformationComponent implements OnInit {

  @Input() parentFormGroup: FormGroup
  @Input() display = true

  constructor() { }

  ngOnInit(): void {
  }

}
