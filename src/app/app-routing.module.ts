import { ActualityComponent } from './pages/actuality/actuality.component';
import { SolutionLawyerComponent } from './pages/solution-lawyer/solution-lawyer.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { LockedComponent } from './pages/locked/locked.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoryComponent } from './pages/story/story.component';


const routes: Routes = [
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: 'accueil', component: HomeComponent },
  { path: 'inscription', component: RegistrationComponent },
  { path: 'attente-validation', component: LockedComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'notre-histoire', component: StoryComponent },
  { path: 'avocat-mandataire-immobilier', component: SolutionLawyerComponent },
  { path: 'actualites', component: ActualityComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
