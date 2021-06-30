import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { AppConstants } from '../../../../app.constants';
import { IDateProperties } from '../../../../interface/date.properties';
import { TitleCasePipe } from '@angular/common';
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
  phoneNumberLabel = 'Secondary Phone Number';
  @Input() travelerInfo: FormGroup;
  @Input() dateProperties: IDateProperties;
  @Input() tooltipJson: any;
  @Input() mailformat: string;
  off = 'off';
  @Input() isControlHasError: (controlName: string, validationType: string) => boolean;

  constructor(private constants: AppConstants, private titlecasePipe: TitleCasePipe) {
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

    this.subscribeValueChanges();
  }

  subscribeValueChanges() {
    this.travelerInfo.get('state').valueChanges.subscribe(selectedValue => {
      // console.log('firstname value changed');
      this.listenToStateChange(selectedValue);
    });

    this.travelerInfo.get('contactOption').valueChanges.subscribe(selectedValue => {
      this.listenToIsContactNumberChange(selectedValue);
    });

    // this.travelerInfo.get('firstName').valueChanges.subscribe(selectedValue => {
    //   this.travelerInfo.get('firstName').setValue(this.titlecasePipe.transform(selectedValue));
    //   this.travelerInfo.get('firstName').updateValueAndValidity({emitEvent: false});
    // });

    // this.travelerInfo.get('lastName').valueChanges.subscribe(selectedValue => {
    //   this.travelerInfo.get('lastName').setValue(this.titlecasePipe.transform(selectedValue));
    //   this.travelerInfo.get('lastName').updateValueAndValidity({emitEvent: false});
    // });
  }

  setFirstNameTitleCase(){
    this.travelerInfo.get('firstName').setValue(this.titlecasePipe.transform(this.travelerInfo.get('firstName').value));
    this.travelerInfo.get('lastName').updateValueAndValidity();
  }

  setLastNameTitleCase() {
    this.travelerInfo.get('lastName').setValue(this.titlecasePipe.transform(this.travelerInfo.get('firstName').value));
    this.travelerInfo.get('lastName').updateValueAndValidity();
  }

  listenToStateChange(selectedValue) {
    // console.log('selected value on state:', selectedValue);
    if (selectedValue !== 'HI') {
      this.travelerInfo.get('resedenceItem').setValue('');
      this.travelerInfo.get('resedenceItem').clearValidators();
      this.travelerInfo.get('resedenceItem').setValidators(null);
      this.travelerInfo.get('resedenceItem').setErrors(null);
      this.travelerInfo.get('resedenceItem').updateValueAndValidity();

      this.travelerInfo.get('islandItem').setValue('');
      this.travelerInfo.get('islandItem').clearValidators();
      this.travelerInfo.get('islandItem').setValidators(null);
      this.travelerInfo.get('islandItem').setErrors(null);
      this.travelerInfo.get('islandItem').updateValueAndValidity();

      this.travelerInfo.get('travelDateToHawaii').setValue('');
      this.travelerInfo.get('travelDateToHawaii').clearValidators();
      this.travelerInfo.get('travelDateToHawaii').setValidators(null);
      this.travelerInfo.get('travelDateToHawaii').setErrors(null);
      this.travelerInfo.get('travelDateToHawaii').updateValueAndValidity();
    } else {
      this.travelerInfo.get('resedenceItem').setValidators(Validators.required);
      this.travelerInfo.get('resedenceItem').updateValueAndValidity();

      this.travelerInfo.get('islandItem').setValidators(Validators.required);
      this.travelerInfo.get('islandItem').updateValueAndValidity();

      this.travelerInfo.get('travelDateToHawaii').setValidators(Validators.required);
      this.travelerInfo.get('travelDateToHawaii').updateValueAndValidity();
    }
    this.travelerInfo.updateValueAndValidity();
  }

  listenToIsContactNumberChange(selectedValue) {
    if (selectedValue === 'YES') {
      this.phoneNumberLabel = 'Secondary Phone Number';
      // this.travelerInfo.get('contactNumber2').setValue('');
      this.travelerInfo.get('contactNumber2').clearValidators();
      this.travelerInfo.get('contactNumber2').setErrors(null);
      this.travelerInfo.get('contactNumber2')
        .setValidators(Validators.compose([Validators.minLength(10), Validators.maxLength(10)]));
      this.travelerInfo.get('contactNumber2').updateValueAndValidity();
    } else {
      this.phoneNumberLabel = 'Mobile Phone Number';
      this.travelerInfo.get('contactNumber2')
        .setValidators(Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)]));
      this.travelerInfo.get('contactNumber2').updateValueAndValidity();
    }
  }
}
