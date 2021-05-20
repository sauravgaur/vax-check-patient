import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { AppConstants } from '../../../../app.constants';
import { IDateProperties } from '../../../../interface/date.properties';

@Component({
  selector: 'kt-traveler-info',
  templateUrl: './traveler.info.component.html',
})
export class TravelerInfoComponent implements OnInit {

  contactOptions: SelectItem[];
  stateList: SelectItem[];
  genderOptions: SelectItem[];
  resedenceOptions: SelectItem[];
  islandOptions: SelectItem[];

  @Input() travelerInfo: FormGroup;
  @Input() dateProperties: IDateProperties;
  @Input() tooltipJson: any;
  @Input() isControlHasError: (controlName: string, validationType: string) => boolean;

  constructor(private constants: AppConstants) {
  }
  hasError(controlName: string, validationType: string) {
    return this.isControlHasError(controlName, validationType);
  }
  ngOnInit() {
    this.resedenceOptions = this.constants.YESNO;
    this.contactOptions = this.constants.CONTACT_ITEM;
    this.genderOptions = this.constants.GENDER_ITEM;
    this.stateList = this.constants.STATES;
    this.islandOptions = this.constants.ISLANDS;
    // console.log('date properties:', this.dateProperties)
  }
}
