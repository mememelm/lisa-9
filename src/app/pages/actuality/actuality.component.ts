import { ControllerService } from './../../services/controller.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-actuality',
  templateUrl: './actuality.component.html',
  styleUrls: ['./actuality.component.scss']
})
export class ActualityComponent implements OnInit {

  constructor(public ctrl: ControllerService) {}

  ngOnInit(): void {
  }

}
