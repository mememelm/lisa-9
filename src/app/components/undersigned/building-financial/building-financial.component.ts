import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-building-financial',
  templateUrl: './building-financial.component.html',
  styleUrls: ['./building-financial.component.scss']
})
export class BuildingFinancialComponent implements OnInit {

  @Input() parentFormGroup: FormGroup
  @Input() displayInput = true

  constructor() { }

  ngOnInit(): void {
  }

}
