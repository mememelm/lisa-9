import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CountryISO, SearchCountryField } from 'ngx-intl-tel-input';

@Component({
  selector: 'app-phone-input',
  templateUrl: './phone-input.component.html',
  styleUrls: ['./phone-input.component.scss']
})
export class PhoneInputComponent {

  @Input() parentFormGroup: FormGroup
  @Input() controlName: FormControl
  @Input() placeholder: string

  preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ]

  searchCountryField = SearchCountryField
  countryISO = CountryISO

}
