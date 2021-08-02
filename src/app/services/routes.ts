import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class RoutesExt {

  public home = '/accueil'
  public connexion = '/connexion'
  public registration = '/inscription'
  public locked = '/attente-validation'
  public story = '/notre-histoire'
  public solutionLawyer = '/avocat-mandataire-immobilier'
  public actuality = '/actualites'
  public privateSpace = '/espace-prive'
  public adminUserRole = '/admin-user-role'

}
