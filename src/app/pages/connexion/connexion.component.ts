import { Endpoints } from './../../constants/classes/endpoints';
import { ControllerService } from './../../services/controller.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {

  userForm: FormGroup

  constructor(private ctrl: ControllerService) { }

  ngOnInit(): void {
    this.userForm = this.ctrl.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  connexion() {
    this.ctrl.api.post(Endpoints.LOG_IN, this.userForm.value).subscribe((user: any) => {
      switch (user.message) {
        case 'email_not_found':
          this.ctrl.alert.warn("L'email utilisé n'est pas encore inscrit dans la base de données.")
          break
        case 'error_password':
          this.ctrl.alert.warn("Mot de passe incorrect")
          break
        case 'success':
          this.afterCheckConnexion(user)
          break
        default:
          break
      }
    })
  }

  afterCheckConnexion(user: any) {
    if (user?.res['account_state']) {
      localStorage.setItem('USER', JSON.stringify(user?.res))
      this.ctrl.router.navigate(['espace-prive'])
    } else {
      this.ctrl.router.navigate(['attente-validation'])
    }
  }

  getRoleUser(roleId: number) {
    this.ctrl.api.get(Endpoints.ROLE_GET + roleId).subscribe((role: any) => {

    })
  }

}
