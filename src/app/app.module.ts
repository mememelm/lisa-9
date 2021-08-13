import { RouterModule } from '@angular/router';

import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EnvInterceptor } from './services/env.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './pages/home/home.component';
import { RegistrationComponent } from './pages/registration/registration.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { BackButtonDisableModule } from 'angular-disable-browser-back-button';
import { DataTablesModule } from 'angular-datatables';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';

import { HeaderRegistrationComponent } from './components/shared/header-registration/header-registration.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { LockedComponent } from './pages/locked/locked.component';
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
import { PrivateDocumentationComponent } from './components/private-documentation/private-documentation.component';
import { PrivateAdviceComponent } from './components/private-advice/private-advice.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderSpaceComponent } from './components/shared/header-space/header-space.component';
import { MandateUndersignedComponent } from './pages/home/mandate-undersigned/mandate-undersigned.component';
import { PersonInformationComponent } from './components/undersigned/person-information/person-information.component';
import { SocietyInformationComponent } from './components/undersigned/society-information/society-information.component';
import { LawyerInformationComponent } from './components/undersigned/lawyer-information/lawyer-information.component';
import { SocietyLawyerInformationComponent } from './components/undersigned/society-lawyer-information/society-lawyer-information.component';
import { AddressInputComponent } from './components/address-input/address-input.component';
import { ContactInputComponent } from './components/contact-input/contact-input.component';
import { BuildingInformationComponent } from './components/undersigned/building-information/building-information.component';
import { BuildingFinancialComponent } from './components/undersigned/building-financial/building-financial.component';
import { TextMissionComponent } from './components/undersigned/text-mission/text-mission.component';
import { RenumerationAssistanceComponent } from './components/undersigned/renumeration-assistance/renumeration-assistance.component';
import { RenumerationTransactionComponent } from './components/undersigned/renumeration-transaction/renumeration-transaction.component';
import { TextInterruptionComponent } from './components/undersigned/text-interruption/text-interruption.component';
import { SignatureComponent } from './components/undersigned/signature/signature.component';
import { RetractionComponent } from './components/undersigned/retraction/retraction.component';

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
    PrivateDocumentationComponent,
    PrivateAdviceComponent,
    HeaderSpaceComponent,
    MandateUndersignedComponent,
    PersonInformationComponent,
    SocietyInformationComponent,
    LawyerInformationComponent,
    SocietyLawyerInformationComponent,
    AddressInputComponent,
    ContactInputComponent,
    BuildingInformationComponent,
    BuildingFinancialComponent,
    TextMissionComponent,
    RenumerationAssistanceComponent,
    RenumerationTransactionComponent,
    TextInterruptionComponent,
    SignatureComponent,
    RetractionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FlexLayoutModule,
    NgbModule,
    RouterModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      closeButton: true
    }),
    BackButtonDisableModule.forRoot({ preserveScrollPosition: true }),
    NgxIntlTelInputModule,
    DataTablesModule,
    MatCheckboxModule,
    FontAwesomeModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    FontAwesomeModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: EnvInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
