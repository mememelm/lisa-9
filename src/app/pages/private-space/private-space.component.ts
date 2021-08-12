import { ControllerService } from './../../services/controller.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-private-space',
  templateUrl: './private-space.component.html',
  styleUrls: ['./private-space.component.scss']
})
export class PrivateSpaceComponent implements OnInit {

  d01 = true
  d02 = false
  d03 = false
  d04 = false

  c01 = true
  c02 = false
  c03 = false
  c04 = false
  c05 = false
  c06 = false

  constructor(public ctrl: ControllerService) { }

  ngOnInit(): void {
    let user = this.ctrl.storage.user()
    if (!user) {
      this.ctrl.logOut()
    }
  }

  toogleView(element: string) {
    switch (element) {
      case 'd01':
        this.d01 ? this.d01 = false : this.d01 = true
        break
      case 'd02':
        this.d02 ? this.d02 = false : this.d02 = true
        break
      case 'd03':
        this.d03 ? this.d03 = false : this.d03 = true
        break
      case 'd04':
        this.d04 ? this.d04 = false : this.d04 = true
        break
      case 'c01':
        this.c01 ? this.c01 = false : this.c01 = true
        break
      case 'c02':
        this.c02 ? this.c02 = false : this.c02 = true
        break
      case 'c03':
        this.c03 ? this.c03 = false : this.c03 = true
        break
      case 'c04':
        this.c04 ? this.c04 = false : this.c04 = true
        break
      case 'c05':
        this.c05 ? this.c05 = false : this.c05 = true
        break
      case 'c06':
        this.c06 ? this.c06 = false : this.c06 = true
        break
      default:
        break
    }
  }

}
