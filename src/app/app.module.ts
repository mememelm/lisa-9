import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EnvInterceptor } from './services/env.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './pages/home/home.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { ToastrModule } from 'ngx-toastr';
import { BackButtonDisableModule } from 'angular-disable-browser-back-button';
import { DataTablesModule } from 'angular-datatables';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatCheckboxModule } from '@angular/material/checkbox'

import { HeaderRegistrationComponent } from './components/shared/header-registration/header-registration.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { LockedComponent } from './pages/locked/locked.component'
import { PhoneInputComponent } from './components/phone-input/phone-input.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { PrivateSpaceComponent } from './pages/private-space/private-space.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { StoryComponent } from './pages/story/story.component';
import { SolutionLawyerComponent } from './pages/solution-lawyer/solution-lawyer.component';
import { ActualityComponent } from './pages/actuality/actuality.component';
import { UserRoleComponent } from './pages/admin/user-role/user-role.component';
import { UserListComponent } from './pages/admin/user-list/user-list.component';
import { ModalDeleteComponent } from './components/shared/modal-delete/modal-delete.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegistrationComponent,
    HeaderRegistrationComponent,
    HeaderComponent,
    LockedComponent,
    PhoneInputComponent,
    ConnexionComponent,
    PrivateSpaceComponent,
    FooterComponent,
    StoryComponent,
    SolutionLawyerComponent,
    ActualityComponent,
    UserRoleComponent,
    UserListComponent,
    ModalDeleteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    RouterModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({ timeOut: 5000, positionClass: 'toast-bottom-right', preventDuplicates: true, closeButton: true }),
    BackButtonDisableModule.forRoot({ preserveScrollPosition: true }),
    NgxIntlTelInputModule,
    DataTablesModule,
    MatCheckboxModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: EnvInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
