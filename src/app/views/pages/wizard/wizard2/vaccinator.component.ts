import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import Utils from 'src/app/utils';
import { AppConstants } from '../../../../app.constants';
import { IDateProperties } from '../../../../interface/date.properties';
import moment from 'moment';

@Component({
  selector: 'kt-vaccinator',
  templateUrl: './vaccinator.component.html',
})
export class VaccinatorComponent implements OnInit {
  orgs: any[];
  gapDays = 0;
  orgOptions: any[];
  filteredOrgs: any[];
  manufacturerList: SelectItem[];
  stateList: SelectItem[];
  @Input() vaccinator: FormGroup;
  @Input() dateProperties: IDateProperties;
  @Input() tooltipJson: any;
  @Input() stepTwo: boolean;
  @Input() isControlHasError: (controlName: string, validationType: string) => boolean;
  constructor(private constants: AppConstants) {
    this.manufacturerList = this.constants.MANUFACTURER;
  }
  hasError(controlName: string, validationType: string) {
    return this.isControlHasError(controlName, validationType);
  }

  ngOnInit() {
    this.orgs = this.constants.ORGS;
    this.orgOptions = this.orgs.map((x) => x.name);
    this.stateList = this.constants.STATES;
    // this.subscribeValueChanges();
  }

  filterOrg(event) {
    const filtered: any[] = [];
    const query = event.query.toLowerCase();
    for (const org of this.orgs) {
      if (org.name.toLowerCase().indexOf(query) > -1) {
        filtered.push(org);
      }
    }
    this.filteredOrgs = filtered;
  }

  isGreatedThan(controlName: string, compareCtrlName: string): boolean {
    return this.vaccinator.controls[controlName].value < this.vaccinator.controls[compareCtrlName].value;
  }
  isMinimumGap(controlName: string, compareCtrlName: string): boolean {
    if (this.vaccinator.get('orgManufacturer').value === 'Moderna') {
      this.gapDays = 26;
    } else if (this.vaccinator.get('orgManufacturer').value === 'Pfizer') {
      this.gapDays = 20;
    }
    // console.log('moment:', moment(this.vaccinator.get('orgDose1').value, 'YYYY-MM-DD'))
    // console.log('moment:', moment(this.vaccinator.get('orgDose1').value).add(this.gapDays, 'day'))
    console.log('moment add days:', Utils.addDays(moment(this.vaccinator.get('orgDose1').value, 'MM-DD-YYYY').toDate(), this.gapDays));
    return this.vaccinator.controls[controlName].value <
      Utils.addDays(moment(this.vaccinator.controls[compareCtrlName].value, 'MM-DD-YYYY').toDate(), this.gapDays);
  }

  // listenToOrgManufacturerChange(selectedValue) {
  //   if (selectedValue === 'Johnson \& Johnson' || !selectedValue) {
  //     this.vaccinator.controls.orgDose2.setValue(null);
  //     this.vaccinator.controls.orgDose2.setErrors(null);
  //     this.vaccinator.controls.orgDose2.setValidators(null);
  //     this.vaccinator.controls.orgDose2.updateValueAndValidity();
  //   } else {
  //     this.vaccinator.get('orgDose2').setValidators(Validators.required);
  //     this.vaccinator.get('orgDose2').updateValueAndValidity();
  //   }
  // }
  // listenToOrgChange(selectedValue) {
  //   this.messageSeverity = '';
  //   this.messageContent = '';
  //   if (!selectedValue || selectedValue.value.toUpperCase().includes('HPH')) {
  //     this.submitButton = { id: 1, value: 'Submit' };
  //   } else if (selectedValue.value.toUpperCase().includes('CVS')) {
  //     this.submitButton = { id: 2, value: 'Start Verification' };
  //   } else {
  //     this.submitButton = { id: 3, value: `Verify with ${selectedValue.value}` };
  //   }
  //   if (this.submitButton.id === 2) {
  //     this.confirm2();
  //   }
  // }
  // listenToOrgStateChange(selectedValue) {
  //   if (selectedValue === 'HI') {
  //     this.vaccinator.get('orgEmail').setValidators(Validators.required);
  //     this.vaccinator.get('orgEmail').updateValueAndValidity();
  //   } else {
  //     // this.vaccinator.controls.orgEmail.setValue(null);
  //     this.vaccinator.controls.orgEmail.setErrors(null);
  //     this.vaccinator.controls.orgEmail.setValidators(null);
  //     this.vaccinator.controls.orgEmail.updateValueAndValidity();
  //   }
  // }
}
