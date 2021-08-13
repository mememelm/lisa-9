import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-retraction',
  templateUrl: './retraction.component.html',
  styleUrls: ['./retraction.component.scss']
})
export class RetractionComponent implements OnInit {

  @Input() parentFormGroup: FormGroup

  constructor() { }

  ngOnInit(): void {
  }

}
