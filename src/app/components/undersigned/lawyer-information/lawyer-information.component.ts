import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-lawyer-information',
  templateUrl: './lawyer-information.component.html',
  styleUrls: ['./lawyer-information.component.scss']
})
export class LawyerInformationComponent implements OnInit {

  @Input() display = true
  @Input() parentFormGroup: FormGroup

  constructor() { }

  ngOnInit(): void {
  }

}
