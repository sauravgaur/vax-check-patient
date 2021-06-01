import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import Utils from '../../../utils';
import { IDateProperties } from '../../../interface/date.properties';
import { WizardService } from '../wizard/wizard2/wizard.service';
import { IProfile, ITravelerExists, IVaccinations, IPatientAddress } from '../../../interface/record.interface';
import { EmpData } from '../../../../app/employee-data';
@Component({
  selector: 'kt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [WizardService]
})
export class LoginComponent implements OnInit {
  corporateForm: FormGroup;
  mailFormat = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  errorUtils = Utils;
  isSubmitted = false;
  buttonLabel = 'Login';
  constructor(private fb1: FormBuilder, private wizardService: WizardService, private empConstants: EmpData) { }
  dateProperties: IDateProperties;
  empData: any[] = [];
  tooltipJson: any = {
    contactNumber: 'Prefered mobile phone number',
    resedenceItem: 'Are you a permanent Hawaii resident?',
    orgName: `Who organized the vaccination?<br> Type at least 1 alphabet.`,
    orgAddress1: 'Address of the Organization',
    takeSnapShot: 'Take a picture of you vaccination card',
    travelDateToHawaii: 'Trip date in Safe Travels'
  };
  ngOnInit(): void {
    this.empData = this.empConstants.JSON_DATA;
    this.dateProperties = {
      dateFormat: 'mm-dd-yy',
      maxDate: new Date(),
      minDate: Utils.addDays(new Date(), 1),
      yearRange: `1930:${new Date().getFullYear()}`
    };

    this.corporateForm = this.fb1.group({
      firstName: new FormControl('A', Validators.compose([Validators.required, Validators.pattern('^[ A-Za-z-.,]*$')])),
      middleName: new FormControl('A', Validators.pattern('^[ A-Za-z-.,]*$')),
      lastName: new FormControl('A', Validators.compose([Validators.required, Validators.pattern('^[ A-Za-z-.,]*$')])),
      dob: new FormControl(new Date('2021-04-01'), Validators.required),
      email: new FormControl('a@a.com', Validators.compose([Validators.required, Validators.pattern(this.mailFormat)])),
      contactNumber: new FormControl('1231231231',
        Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])),
      corporateId: new FormControl('234', Validators.required)
    });
  }

  async onSubmit() {
    if (this.corporateForm.valid) {
      this.isSubmitted = true;
      this.buttonLabel = 'Logging In';
      const formObj = {
        firstName: this.corporateForm.get('firstName').value,
        lastName: this.corporateForm.get('lastName').value,
        middleName: this.corporateForm.get('middleName').value,
        dateOfBirth: this.corporateForm.get('dob').value,
        contactNumber: this.corporateForm.get('contactNumber').value,
        email: this.corporateForm.get('email').value
      };
      const findEmp = this.empData.find((x: any) => formObj.firstName == x.firstName && formObj.lastName == x.lastName
        && formObj.dateOfBirth == x.dateOfBirth && formObj.contactNumber == x.contactNumber);
      if (findEmp) {
        const address: IPatientAddress = {
          street_address: findEmp.address,
          street_address2: findEmp.address2,
          state: findEmp.state,
          zip_code: findEmp.zipCode,
          city: findEmp.city
        };

        const profiles: IProfile = {
          name: {
            first_name: findEmp.firstName,
            middle_name: findEmp.middleName,
            last_name: findEmp.lastName
          },
          date_of_birth: findEmp.dateOfBirth,
          access_code: this.corporateForm.get('corporateId').value,
          address, mobile_number: findEmp.contactNumber,
          mobile_number2: findEmp.contactNumber2
        };
      }
      // this.wizardService.isExists(formObj).subscribe((res: ITravelerExists) => {
      //   res.profile_skyflow_id = 'f4a90203-c091-11eb-afac-6e8fbbfa3e7b';
      //   if (res.profile_skyflow_id) {
      //     this.wizardService.patientById('f4a90203-c091-11eb-afac-6e8fbbfa3e7b').subscribe((resp: any) => {
      //       if (resp.records.length > 0) {
      //         const profiles: IProfile = resp.records[0].profiles;
      //         const vaccinations: IVaccinations = resp.records[0].vaccinations;
      //         console.log('profile:', profiles);
      //         console.log('vaccinations: ', vaccinations);
      //       }
      //     });
      //   }
      // });
    }
  }
}
