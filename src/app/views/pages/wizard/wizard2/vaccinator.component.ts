import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
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
}
