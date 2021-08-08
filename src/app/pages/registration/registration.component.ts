import { Endpoints } from './../../constants/classes/endpoints';
import { ControllerService } from './../../services/controller.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  userForm: FormGroup
  errorPassword = false

  constructor(private ctrl: ControllerService) { }

  ngOnInit(): void {
    this.userForm = this.ctrl.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      phone_number: ['', [Validators.required, Validators.minLength(9), Validators.pattern('[- +()0-9]+')]],
      toque_number: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.minLength(4), Validators.email]],
      password: ['', Validators.required],
      match_password: ['', Validators.required]
    })

    this.userForm.valueChanges.subscribe(() => {
      if (this.userForm.value['match_password'].length > 0) {
        this.userForm.value['match_password'] !== this.userForm.value['password']
          ? this.errorPassword = true : this.errorPassword = false
      }
      this.userForm.value['phone_number'] = this.userForm.value['phone_number']?.internationalNumber
    })
  }

  register() {
    const body = {
      firstname: this.userForm.value['firstname'],
      lastname: this.userForm.value['lastname'],
      phone_number: this.userForm.value['phone_number'],
      toque_number: this.userForm.value['toque_number'],
      email: this.userForm.value['email'],
      password: this.userForm.value['password']
    }
    this.ctrl.api.post(Endpoints.SIGN_IN, body).subscribe((user: any) => {
      if (user?.message == 'user_created') {
        this.ctrl.alert.success("Inscription réussie. Un courriel vous a été envoyé.")
        this.ctrl.router.navigate(['attente-validation'])
      } else {
        this.ctrl.alert.warn("L'email utilisé existe déjà dans la base de données.")
      }
    })
  }

}
