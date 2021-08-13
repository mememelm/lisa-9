import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-renumeration-transaction',
  templateUrl: './renumeration-transaction.component.html',
  styleUrls: ['./renumeration-transaction.component.scss']
})
export class RenumerationTransactionComponent implements OnInit {

  @Input() parentFormGroup: FormGroup
  @Input() proportional = true
  @Input() lumpsum = true

  constructor() { }

  ngOnInit(): void {
  }

}
