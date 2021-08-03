import { ControllerService } from './../../../services/controller.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.scss']
})
export class ModalDeleteComponent implements OnInit {

  @Input() title: string;
  @Input() subtitle: string;
  @Output() emitDelete = new EventEmitter<void>()

  constructor(public ctrl: ControllerService) { }

  ngOnInit(): void {
  }

  actionDelete() {
    this.emitDelete.emit()
  }

}
