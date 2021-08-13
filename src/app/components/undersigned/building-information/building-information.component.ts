import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-building-information',
  templateUrl: './building-information.component.html',
  styleUrls: ['./building-information.component.scss']
})
export class BuildingInformationComponent implements OnInit {

  @Input() parentFormGroup: FormGroup

  constructor() { }

  ngOnInit(): void {
  }

}
