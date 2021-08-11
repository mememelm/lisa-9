import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-society-lawyer-information',
  templateUrl: './society-lawyer-information.component.html',
  styleUrls: ['./society-lawyer-information.component.scss']
})
export class SocietyLawyerInformationComponent implements OnInit {

  @Input() display = true
  @Input() parentFormGroup: FormGroup

  constructor() { }

  ngOnInit(): void {
  }

}
