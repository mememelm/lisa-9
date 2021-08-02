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

  constructor(public ctrl: ControllerService) { }

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
      const roleId = user?.res['hoomeRoleUserRoleID']
      localStorage.setItem('USER', JSON.stringify(user?.res))
      roleId ? this.getUserRole(roleId) : this.ctrl.router.navigate([this.ctrl.route.privateSpace])
    } else {
      this.ctrl.router.navigate([this.ctrl.route.locked])
    }
  }

  getUserRole(roleId: number) {
    this.ctrl.api.get(Endpoints.ROLE_GET + roleId).subscribe((role: any) => {
      if (role?.data['label'] == 'Administrateur général' || role?.data['abbreviation'] == 'ADG') {
        this.ctrl.router.navigate([this.ctrl.route.adminUserRole])
      }
    })
  }

}
