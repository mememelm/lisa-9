import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-private-advice',
  templateUrl: './private-advice.component.html',
  styleUrls: ['./private-advice.component.scss']
})
export class PrivateAdviceComponent implements OnInit {

  @Input() c01 = true
  @Input() c02 = false
  @Input() c03 = false
  @Input() c04 = false
  @Input() c05 = false
  @Input() c06 = false

  constructor() { }

  ngOnInit(): void {
  }

}
