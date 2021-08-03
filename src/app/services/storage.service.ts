import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public user() {
    return JSON.parse(localStorage.getItem('USER'))
  }

  public role() {
    return JSON.parse(localStorage.getItem('ROLE'))
  }

}
