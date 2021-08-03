import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-private-documentation',
  templateUrl: './private-documentation.component.html',
  styleUrls: ['./private-documentation.component.scss']
})
export class PrivateDocumentationComponent implements OnInit {

  @Input() d01 = true
  @Input() d02 = false
  @Input() d03 = false
  @Input() d04 = false

  constructor() { }

  ngOnInit(): void {
  }

}
