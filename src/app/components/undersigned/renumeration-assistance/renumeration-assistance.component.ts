import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-renumeration-assistance',
  templateUrl: './renumeration-assistance.component.html',
  styleUrls: ['./renumeration-assistance.component.scss']
})
export class RenumerationAssistanceComponent implements OnInit {

  @Input() parentFormGroup: FormGroup

  constructor() { }

  ngOnInit(): void {
  }

}
