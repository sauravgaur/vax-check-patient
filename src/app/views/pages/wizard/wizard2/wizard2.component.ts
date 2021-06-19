import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ValidationErrors, AbstractControl } from '@angular/forms';

import { ConfirmEventType, MenuItem, SelectItem } from 'primeng/api';
import { Observable, Subject } from 'rxjs';
import { ShepherdService } from 'angular-shepherd';
import { steps as defaultSteps, defaultStepOptions } from './tour';
import moment from 'moment';
// import { StripeService, Elements, StripeCardComponent, Element as StripeElement, ElementsOptions, ElementOptions } from "ngx-stripe";
import { ConfirmationService } from 'primeng/api';
import { Message } from 'primeng//api';
import { MessageService } from 'primeng/api';
import { CdkRow } from '@angular/cdk/table';
import { countBy } from 'lodash';
import { Router, NavigationExtras } from '@angular/router';
// label: 'Hispanic or Latino', value: '2186-5'
// import { Swal } from '@sweetalert2/ngx-sweetalert2';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from '../../../../../environments/environment';
// import * as HumanConnect from "humanapi-connect-client";
import { AppConstants } from '../../../../app.constants';
import { IDateProperties } from '../../../../interface/date.properties';
import { IImageToText } from '../../../../interface/image.text';
import {
    IProfile, IPatientAddress, IVaccinations, ITravelerExists,
    IAddress2, IProvider, IMediaArray, IVaccineDosing, IMedia, LOCAL_STORAGE_KEYS
} from '../../../../interface/record.interface';
import { WizardService } from './wizard.service';
import Utils from '../../../../utils';
const BASE_URL = 'http://localhost:3100/api';

@Component({
    selector: 'kt-wizard2',
    templateUrl: './wizard2.component.html',
    styleUrls: ['./wizard2.component.scss'],
    providers: [ConfirmationService, MessageService, WizardService]
})
export class Wizard2Component implements OnInit, AfterViewInit {

    stripeTest: FormGroup;
    @ViewChild('wizard', { static: true }) el: ElementRef;
    @ViewChild('imgRenderer') imgRenderer: ElementRef;
    supportingDocFile = null;
    isHawaiiState = false;
    showWebcam = false;
    stateList: SelectItem[];
    tooltipJson: any = {
        contactNumber: 'Prefered mobile phone number',
        resedenceItem: 'Are you a permanent Hawaii resident?',
        orgName: `Who organized the vaccination?`,
        orgAddress1: 'Address of the Organization',
        takeSnapShot: 'Take a picture of you vaccination card',
        travelDateToHawaii: 'Trip date in Safe Travels'
    };
    submitted = false;

    ndcItem: SelectItem[];
    selectedNDC: any;

    states: any[] = [];
    items: MenuItem[];

    stepOne = false;
    stepTwo = false;
    patientForm: FormGroup;
    isFormSubmitted = false;

    groupedForm: FormGroup;
    public mode: 'view' | 'edit' = 'view';
    imageToTextResponse: IImageToText;
    consent = false;
    tab3Pressed = false;
    submitButton = { id: 1, value: 'Submit' };
    showHumanApiDialog = false;
    doseReceived: number;
    seriesComplete = 'No';
    effectiveDate: Date;
    expirationDate: any;
    orgOptions: any[];
    previousClick = false;
    changeStep: any;
    tab3Required = false;
    display = false;
    messageContent = '';
    messageSeverity = '';
    yearRange: any;
    dateProperties: IDateProperties;
    firstInputText: string;
    lastInputText: any;
    firstClinicName: any;
    secondClinicName: any;
    lastNameInputControl = new FormControl();
    firstNameInputControl = new FormControl();
    firstClinicNameInputControl = new FormControl();
    secondClinicNameInputControl = new FormControl();
    imageSrc: any;
    webcamImage: any;
    button = 'Submit';
    isLoading = false;
    mailFormat = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
    skyflowId: string;
    forceSelection = false;
    isLoadingNext = false;
    loginResponse: { profiles: IProfile, vaccinations: IVaccinations, media: IMedia[], travelerExists: ITravelerExists };
    constructor(
        private cd: ChangeDetectorRef,
        private http: HttpClient,
        private fb1: FormBuilder,
        private shepherdService: ShepherdService,
        // private stripeService: StripeService,
        private fb: FormBuilder,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private router: Router,
        private constants: AppConstants,
        private wizardService: WizardService,
    ) {
        this.dateProperties = {
            dateFormat: 'mm-dd-yy',
            maxDate: new Date(),
            minDate: Utils.addDays(new Date(), 1),
            yearRange: `1930:${new Date().getFullYear()}`
        };
    }

    // public capture() {
    //     var context = this.canvas.nativeElement.getContext("2d").drawImage(this.video.nativeElement, 0, 0, 640, 480);
    //     this.captures.push(this.canvas.nativeElement.toDataURL("image/png"));
    // }
    inputs: any;
    token = '';
    connectClosed = false;
    isCorporalteUser: boolean;
    ngOnInit() {
        this.stateList = this.constants.STATES;
        this.isCorporalteUser = false;
        localStorage.removeItem('travelerData');
        this.loginResponse = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS[LOCAL_STORAGE_KEYS.LOGIN_RESPONSE_DATA]));
        // this.patientForm = this.fb1.group({
        //     id: new FormControl(''),

        //     firstName: new FormControl('A', Validators.compose([Validators.required, Validators.pattern('^[ A-Za-z-.,]*$')])),
        //     middleName: new FormControl('A', Validators.pattern('^[ A-Za-z-.,]*$')),
        //     lastName: new FormControl('A', Validators.compose([Validators.required, Validators.pattern('^[ A-Za-z-.,]*$')])),
        //     dob: new FormControl(new Date('2021-04-01'), Validators.required),
        //     email: new FormControl('a@a.com', Validators.compose([Validators.required, Validators.pattern(this.mailFormat)])),
        //     gender: new FormControl('MALE', Validators.required),
        //     address1: new FormControl('test', Validators.required),
        //     address2: new FormControl('test'),
        //     city: new FormControl('test', Validators.required),
        //     zipcode: new FormControl('12323', Validators.required),
        //     state: new FormControl('', Validators.required),
        //     resedenceItem: new FormControl('YES'),
        //     islandItem: new FormControl(''),
        //     contactNumber: new FormControl('1231231231',
        //         Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])),
        //     contactNumber2: new FormControl('',
        //         Validators.compose([Validators.minLength(10), Validators.maxLength(10)])),
        //     contactOption: new FormControl('YES', Validators.required),
        //     orgName: new FormControl({ name: 'CVS/Long Drugs', type: 'HAPI' }),
        //     orgAddress1: new FormControl('a'),
        //     orgAddress2: new FormControl('334'),
        //     orgCity: new FormControl('a'),
        //     orgZipcode: new FormControl('23423'),
        //     orgState: new FormControl('AL'),
        //     orgContactNumber: new FormControl('4234234232',
        //         Validators.compose([Validators.minLength(10), Validators.maxLength(10)])),
        //     orgEmail: new FormControl('sdf@lkj.com', Validators.pattern(this.mailFormat)),
        //     orgManufacturer: new FormControl('Moderna'),
        //     orgDose1: new FormControl(new Date('2021-04-01')),
        //     orgDose2: new FormControl(new Date('2021-05-05')),
        //     travelDateToHawaii: new FormControl(''),
        //     consent: new FormControl(true),
        //     apptEmailConf: new FormControl('test')
        // });

        this.patientForm = this.fb1.group({
            id: new FormControl(''),
            firstName: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[ A-Za-z-.,]*$')])),
            middleName: new FormControl('', Validators.pattern('^[ A-Za-z-.,]*$')),
            lastName: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[ A-Za-z-.,]*$')])),
            dob: new FormControl('', Validators.required),
            email: new FormControl('', Validators.compose([Validators.required, Validators.pattern(this.mailFormat)])),
            gender: new FormControl('', Validators.required),
            address1: new FormControl('', Validators.required),
            address2: new FormControl(''),
            city: new FormControl('', Validators.required),
            zipcode: new FormControl('', Validators.required),
            state: new FormControl('', Validators.required),
            resedenceItem: new FormControl(''),
            islandItem: new FormControl(''),
            contactNumber: new FormControl('',
                Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])),
            contactNumber2: new FormControl('',
                Validators.compose([Validators.minLength(10), Validators.maxLength(10)])),
            contactOption: new FormControl('', Validators.required),
            orgName: new FormControl(''),
            orgAddress1: new FormControl(''),
            orgAddress2: new FormControl(''),
            orgCity: new FormControl(''),
            orgZipcode: new FormControl(''),
            orgState: new FormControl(''),
            orgContactNumber: new FormControl('',
                Validators.compose([Validators.minLength(10), Validators.maxLength(10)])),
            orgEmail: new FormControl('', Validators.pattern(this.mailFormat)),
            orgManufacturer: new FormControl(''),
            orgDose1: new FormControl(),
            orgDose2: new FormControl(),
            travelDateToHawaii: new FormControl(''),
            consent: new FormControl(),
            apptEmailConf: new FormControl(''),
            lotNumber1: new FormControl(''),
            lotNumber2: new FormControl(''),
        });

        // this.stateItem = this.constants.STATES;
        // console.log('storage data:', storageData);
        // localStorage.clear();
        this.preFilledForm(this.loginResponse);
        // console.log('this.org options:', this.orgOptions);
        this.subscribeValueChanges();
        // this.initGroupedForm();
    }

    preFilledForm(data) {
        console.log('data in prefilled form', data);
        const profiles: IProfile = data.profiles;
        this.isCorporalteUser = true;
        this.patientForm.controls.firstName.setValue(profiles.name.first_name);
        this.patientForm.controls.middleName.setValue(profiles.name.middle_name);
        this.patientForm.controls.lastName.setValue(profiles.name.last_name);
        this.patientForm.controls.dob.setValue(moment(profiles.date_of_birth, 'YYYY-MM-DD').format('MM-DD-YYYY'));
        this.patientForm.controls.address1.setValue(profiles.address.street_address);
        this.patientForm.controls.address2.setValue(profiles.address?.street_address2);
        this.patientForm.controls.city.setValue(profiles.address.city);
        if (this.stateList.map((x: any) => x.value).includes(profiles.address.state)) {
            this.patientForm.controls.state.setValue(profiles.address.state);
        }
        this.patientForm.controls.zipcode.setValue(profiles.address.zip_code);
        this.patientForm.controls.email.setValue(profiles.email_address);
        this.patientForm.controls.contactNumber.setValue(profiles.mobile_number);
        this.patientForm.controls.contactNumber2.setValue(profiles.mobile_number2);
        this.patientForm.controls.gender.setValue(profiles.sex);

        this.patientForm.controls.travelDateToHawaii.setValue(profiles.travel_date ? moment(profiles.travel_date, 'YYYY-MM-DD').format('MM-DD-YYYY') : null);
        this.patientForm.controls.islandItem.setValue(profiles.traveler_type);
        this.patientForm.controls.resedenceItem.setValue(profiles.residency_state);

        if (data.travelerExists.vaccination_skyflow_id) {
            this.fillVaccinationDetails(data.vaccinations);
        }
        this.patientForm.updateValueAndValidity();
    }

    fillVaccinationDetails(dt) {
        const data: IVaccinations = dt;
        this.patientForm.controls.orgName.setValue(data.provider?.provider_org_name);
        this.patientForm.controls.orgAddress1.setValue(data.provider?.provider_address.street_address);
        this.patientForm.controls.orgAddress2.setValue(data.provider?.provider_address.street_address2);
        this.patientForm.controls.orgCity.setValue(data.provider?.provider_address.city);
        this.patientForm.controls.orgState.setValue(data.provider?.provider_address.state);
        this.patientForm.controls.orgZipcode.setValue(data.provider?.provider_address.zip_code);
        this.patientForm.controls.orgEmail.setValue(data.provider?.provider_email);
        this.patientForm.controls.orgContactNumber.setValue(data.provider?.provider_mobile_number);
        this.patientForm.controls.orgAddress1.setValue(data.provider?.provider_address.street_address);

        // vaccine info
        this.patientForm.controls.orgManufacturer.setValue(data.vaccine_manufacturer_name);
        this.patientForm.controls.orgDose1.setValue(data.vaccine_dose_1.date ? moment(data.vaccine_dose_1.date, 'YYYY-MM-DD').format('MM-DD-YYYY') : null);
        this.patientForm.controls.lotNumber1.setValue(data.vaccine_dose_1.lot_number);
        this.patientForm.controls.orgDose2.setValue(data.vaccine_dose_2.date ? moment(data.vaccine_dose_2.date, 'YYYY-MM-DD').format('MM-DD-YYYY') : null);
        this.patientForm.controls.lotNumber2.setValue(data.vaccine_dose_2.lot_number);

        this.patientForm.controls.apptEmailConf.setValue(data.appointment_email_confirmation);
    }

    showImageOnTab3(media: IMedia[]) {
        console.log('fill tab 3:', media);
        setTimeout(() => {

            const evidenceUrl = this.wizardService.findFilePath(media, 'VAX_CARD');
            console.log('evidenceURL:', evidenceUrl);
            if (evidenceUrl) {
                this.imgRenderer.nativeElement.src = evidenceUrl;
            }
        }, 1000);
    }

    updateFirstName(firstName: string) {
        // console.log('in first name update', firstName);
        this.firstInputText = firstName;
    }

    updateLastName(lastName: string) {
        // console.log('in lastName update', lastName);
        this.lastInputText = lastName;
    }

    updateFirstClinic(clinicName: string) {
        // console.log('in first clinicName update', clinicName);
        this.firstClinicName = clinicName;
    }

    updateSecondClinic(clinicName: string) {
        // console.log('in secpmd clinicName update', clinicName);
        this.secondClinicName = clinicName;
    }

    fetchToken() {
        // create an XHR object
        const xhr = new XMLHttpRequest();

        // listen for `onload` event
        xhr.onload = () => {
            const resp = JSON.parse(xhr.response);

            // process response
            if (xhr.status === 200) {
                // parse JSON data
                this.token = resp.session_token || resp;
                this.cd.markForCheck();

            } else {
                console.error('Error!');
            }
        };

        // create a `GET` request
        xhr.open('POST', environment.api_url + '/create-humanapi-token');

        // send request
        xhr.send();
    }


    confirm2() {
        this.confirmationService.confirm({
            message: `You have selected <b>${this.patientForm.get('orgName').value.name}.</b><br><br>
			<b>Do you have <b>${this.patientForm.get('orgName').value.name}.</b>'s online access account?</b>`,
            header: 'Account confirmation',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.messageSeverity = 'success';
                this.messageContent = `Please have your <b>${this.patientForm.get('orgName').value.name}</b> credentials available. You will be prompted to input the credentials shortly.`;
            },
            reject: (type) => {
                const content = `Online access to <b>${this.patientForm.get('orgName').value.name}</b> may be required. If you do not have access, please visit their website to create an account.`;
                switch (type) {
                    case ConfirmEventType.REJECT:
                        this.messageSeverity = 'info';
                        this.messageContent = content;
                        break;
                    case ConfirmEventType.CANCEL:
                        this.messageSeverity = 'info';
                        this.messageContent = content;
                        break;
                }
            }
        });
    }

    showDialog() {
        this.display = true;
        // setTimeout(() => {
        // this.initiateStripe();
        // }, 500);
    }

    async checkout() {
        // Call your backend to create the Checkout session.
        const getSession: any = await this.http.post(`${environment.api_url}/stripe/session/create`,
            {
                successUrl: `${environment.local_url}/success`,
                cancelUrl: `${environment.local_url}/failure`,
                orderAmount: 2000,
                profiles_skyflow_id: this.skyflowId,
                travelerEmail: this.patientForm.get('email').value
            }).toPromise();
        // console.log('session:', getSession);
        // When the customer clicks on the button, redirect them to Checkout.
        const stripe = await loadStripe(environment.stripe_key);
        const { error } = await stripe.redirectToCheckout({
            sessionId: getSession.sessionId,
        });
        if (error) {
            // console.log(error);
        }

    }

    changeGuidMe() {
        this.shepherdService.start();
    }

    ngAfterViewInit(): void {
        this.shepherdService.defaultStepOptions = defaultStepOptions;
        this.shepherdService.modal = true;
        this.shepherdService.confirmCancel = false;
        this.shepherdService.addSteps(defaultSteps);
        // this.shepherdService.start();

        // Initialize form wizard
        const wizard = new KTWizard(this.el.nativeElement, {
            startStep: 1
        });

        // var wizardEl = document.querySelector('#wizard');
        const prevButton = document.querySelector('[data-wizard-type="action-prev"]');
        prevButton.addEventListener('click', (wizardObj: any) => {
            // Go back to the previouse step
            if (this.changeStep === 2) {
                this.patientForm.get('firstName').setValue(this.firstInputText ?
                    this.firstInputText : this.patientForm.get('firstName').value);
                this.patientForm.get('lastName').setValue(this.lastInputText ?
                    this.lastInputText : this.patientForm.get('lastName').value);
            }
            // wizard.goPrev();
        });
        // Validation before going to next page

        wizard.on('beforeNext', async (wizardObj) => {
            wizardObj.stop();

            // console.log('before next', this.patientForm.value);
            this.isFormSubmitted = true;
            // console.log('patient form:', this.patientForm.value);
            const controls = this.patientForm.controls;
            Object.keys(controls).forEach(controlName => {
                controls[controlName].markAsTouched();
                controls[controlName].markAsDirty();
            });
            Object.keys(this.patientForm.controls).forEach(key => {
                const controlErrors: ValidationErrors = this.patientForm.get(key).errors;
                if (controlErrors != null) {
                    Object.keys(controlErrors).forEach(keyError => {
                        // console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
                    });
                }
            });
            // console.log('wizard obj in before next:', wizardObj, wizardObj.getStep());
            this.showWebcam = false;
            this.isLoadingNext = true;
            if (wizardObj.currentStep === 1) {
                this.stepOne = true;
                this.stepTwo = false;

                this.patientForm.get('orgName').clearValidators();
                this.patientForm.get('orgName').setValidators(null);
                this.patientForm.get('orgName').setErrors(null);

                this.patientForm.get('orgAddress1').clearValidators();
                this.patientForm.get('orgAddress1').setValidators(null);
                this.patientForm.get('orgAddress1').setErrors(null);

                this.patientForm.get('orgCity').clearValidators();
                this.patientForm.get('orgCity').setValidators(null);
                this.patientForm.get('orgCity').setErrors(null);

                this.patientForm.get('orgEmail').clearValidators();
                this.patientForm.get('orgEmail').setValidators(null);
                this.patientForm.get('orgEmail').setErrors(null);

                this.patientForm.get('orgState').clearValidators();
                this.patientForm.get('orgState').setValidators(null);
                this.patientForm.get('orgState').setErrors(null);

                this.patientForm.get('orgManufacturer').clearValidators();
                this.patientForm.get('orgManufacturer').setValidators(null);
                this.patientForm.get('orgManufacturer').setErrors(null);

                this.patientForm.get('orgDose1').clearValidators();
                this.patientForm.get('orgDose1').setValidators(null);
                this.patientForm.get('orgDose1').setErrors(null);

                this.patientForm.get('orgDose2').clearValidators();
                this.patientForm.get('orgDose2').setValidators(null);
                this.patientForm.get('orgDose2').setErrors(null);

                this.patientForm.get('consent').clearValidators();
                this.patientForm.get('consent').setValidators(null);
                this.patientForm.get('consent').setErrors(null);

                this.patientForm.get('lotNumber1').clearValidators();
                this.patientForm.get('lotNumber1').setValidators(null);
                this.patientForm.get('lotNumber1').setErrors(null);

                this.patientForm.get('lotNumber2').clearValidators();
                this.patientForm.get('lotNumber2').setValidators(null);
                this.patientForm.get('lotNumber2').setErrors(null);

                if (this.patientForm.valid) {
                    if (!this.isCorporalteUser) {
                        // console.log('in check curretn step: 1');
                        this.wizardService.isExists({
                            firstName: this.patientForm.get('firstName').value,
                            lastName: this.patientForm.get('lastName').value,
                            middleName: this.patientForm.get('middleName').value,
                            dateOfBirth: Utils.formatToUSStandared(this.patientForm.get('dob').value),

                        }).subscribe((resp: ITravelerExists) => {
                            // console.log('in subscribe: resp : ', resp);
                            if (resp.isTravelerExists) {
                                if (resp.isPaymentDone) {
                                    alert('Traveler is already registered. Payment has been done successfully for this traveler!');
                                } else {
                                    try {
                                        this.skyflowId = resp.profiles_skyflow_id;
                                        this.checkout();
                                    } catch (error) {
                                        this.isLoadingNext = true;
                                        // console.log('in check out error');
                                        alert('Something went wrong, please try again.');
                                    }
                                }
                            } else {
                                this.isLoadingNext = false;
                                wizard.goNext();
                            }
                            this.cd.markForCheck();
                        }, error => {
                            this.isLoadingNext = false;
                            wizard.goNext();

                        });
                    } else {
                        this.isLoadingNext = false;
                        wizard.goNext();
                    }
                } else {
                    this.isLoadingNext = false;
                    // wizard.goNext();
                }
                // console.log('after if of validate form');
            } else if (wizardObj.currentStep === 2) {
                this.stepTwo = true;
                this.isLoadingNext = false;
                if (this.patientForm.valid) {
                    wizard.goNext();
                }
            } else if (wizardObj.currentStep === 3) {
                this.tab3Pressed = true;
                if (!this.firstInputText || !this.lastInputText || !this.firstClinicName || !this.patientForm.valid
                    || (this.patientForm.get('orgDose2').value && !this.secondClinicName)
                    || ((!this.webcamImage && !this.imageSrc))) {
                    this.cd.markForCheck();
                    this.isLoadingNext = false;
                    return;
                } else {
                    this.tab3Pressed = false;
                    this.isLoadingNext = false;
                    wizard.goNext();
                }
            } else if (wizardObj.currentStep === 4) {
                this.showWebcam = false;
                wizard.goNext();
                this.isLoadingNext = false;
            }
            this.patientForm.updateValueAndValidity();
            this.cd.markForCheck();
        });

        // Change event
        wizard.on('change', (wizardObj) => {
            // console.log('Change', this.patientForm.value);
            // console.log('wizardObj--> ', wizardObj);

            setTimeout(() => {
                KTUtil.scrollTop();
            }, 500);
            this.changeStep = wizardObj.currentStep;
            // console.log('before check steps');
            if (wizardObj.currentStep === 1) {
            }
            else if (wizardObj.currentStep === 2) {
                // console.log('after setting first and last name:', this.lastInputText, this.firstInputText);
                this.stepOne = true;
                this.stepTwo = false;

                this.patientForm.get('consent').clearValidators();
                this.patientForm.get('consent').setValidators(null);
                this.patientForm.get('consent').setErrors(null);

                this.patientForm.get('orgName').setValidators(Validators.required);
                this.patientForm.get('orgName').markAsPristine();
                this.patientForm.get('orgName').updateValueAndValidity({ emitEvent: false, onlySelf: true });

                this.patientForm.get('orgAddress1').setValidators(Validators.required);
                this.patientForm.get('orgAddress1').updateValueAndValidity();
                this.patientForm.get('orgAddress1').markAsPristine();

                this.patientForm.get('orgCity').setValidators(Validators.required);
                this.patientForm.get('orgCity').updateValueAndValidity();
                this.patientForm.get('orgCity').markAsPristine();

                // this.patientForm.get('orgEmail').setValidators(Validators.email);
                // this.patientForm.get('orgEmail').updateValueAndValidity();

                this.patientForm.get('orgState').setValidators(Validators.required);
                this.patientForm.get('orgState').updateValueAndValidity();
                this.patientForm.get('orgState').markAsPristine();

                // this.patientForm.get('orgContactNumber').setValidators(Validators.required);
                // this.patientForm.get('orgContactNumber').updateValueAndValidity();
                this.patientForm.get('orgZipcode').setValidators(Validators.pattern('^\\d{5}'));
                this.patientForm.get('orgZipcode').updateValueAndValidity();
                this.patientForm.get('orgZipcode').markAsPristine();

                this.patientForm.get('orgManufacturer').setValidators(Validators.required);
                this.patientForm.get('orgManufacturer').updateValueAndValidity();
                this.patientForm.get('orgManufacturer').markAsPristine();

                this.patientForm.get('orgDose1').setValidators(Validators.required);
                this.patientForm.get('orgDose1').updateValueAndValidity();
                this.patientForm.get('orgDose1').markAsPristine();

                this.patientForm.get('lotNumber1').setValidators(Validators.required);
                this.patientForm.get('lotNumber1').updateValueAndValidity();
                this.patientForm.get('lotNumber1').markAsPristine();

                this.patientForm.get('orgDose2').setValidators((this.patientForm.get('orgManufacturer').value && this.patientForm.get('orgManufacturer').value !== 'Johnson \& Johnson') ? Validators.required : null);
                this.patientForm.get('orgDose2').updateValueAndValidity();
                this.patientForm.get('orgDose2').markAsPristine();

                this.patientForm.get('lotNumber2').setValidators((this.patientForm.get('orgManufacturer').value && this.patientForm.get('orgManufacturer').value !== 'Johnson \& Johnson') ? Validators.required : null);
                this.patientForm.get('lotNumber2').updateValueAndValidity();
                this.patientForm.get('lotNumber2').markAsPristine();

                this.patientForm.get('orgEmail').setValidators(Validators.compose([Validators.pattern(this.mailFormat), Validators.email]));
                this.patientForm.get('orgEmail').updateValueAndValidity();
                this.patientForm.get('orgEmail').markAsPristine();
                this.cd.markForCheck();
            }
            else if (wizardObj.currentStep === 3) {
                // if (!this.webcamImage && !this.imageSrc) {
                //     this.showImageOnTab3(this.loginResponse.media);

                // }
                this.lastInputText = this.patientForm.get('lastName').value;
                this.lastNameInputControl.setValue(this.lastInputText);

                this.firstInputText = this.patientForm.get('firstName').value;
                this.firstNameInputControl.setValue(this.firstInputText);
                this.patientForm.get('consent').setErrors(null);
                this.patientForm.get('consent').setValidators(Validators.requiredTrue);
                this.patientForm.get('consent').updateValueAndValidity();
                this.patientForm.get('consent').markAsPristine();
                if (!this.firstClinicName) {
                    const orgVal = this.patientForm.get('orgName').value;
                    if (orgVal) {
                        if (orgVal.name) {
                            this.firstClinicName = orgVal.name;
                        } else {
                            this.firstClinicName = orgVal;
                        }
                    } else {
                        this.firstClinicName = '';
                    }
                }

                // this.firstClinicName = this.firstClinicName ? this.firstClinicName :
                //     (this.patientForm.get('orgDose1').value ? this.patientForm.get('orgName').value.name : '');
                this.firstClinicNameInputControl.setValue(this.firstClinicName);

                if (!this.secondClinicName) {
                    const orgVal = this.patientForm.get('orgName').value;
                    if (orgVal) {
                        if (orgVal.name) {
                            this.secondClinicName = orgVal.name;
                        } else {
                            this.secondClinicName = orgVal;
                        }
                    } else {
                        this.secondClinicName = '';
                    }
                }
                // this.secondClinicName = this.secondClinicName ? this.secondClinicName :
                //     (this.patientForm.get('orgDose2').value ? this.patientForm.get('orgName').value.name : '');
                this.secondClinicNameInputControl.setValue(this.secondClinicName);

                this.doseReceived = this.patientForm.get('orgDose2').value ? 2 : 1;
                this.seriesComplete = (this.patientForm.get('orgManufacturer').value !== 'Johnson \& Johnson' && this.doseReceived === 2) ? 'YES' : 'NO';
                const doseDate = this.patientForm.get('orgDose2').value ? this.patientForm.get('orgDose2').value : this.patientForm.get('orgDose1').value;
                let effectiveAddDays = 0;
                let expirationAddDays = 0;
                if (this.patientForm.get('orgManufacturer').value === 'Johnson \& Johnson') {
                    effectiveAddDays = 15;
                    expirationAddDays = 85;
                } else if (this.patientForm.get('orgManufacturer').value !== 'Johnson \& Johnson') {
                    effectiveAddDays = 15;
                    expirationAddDays = 85;
                } else {
                    effectiveAddDays = 15;
                    expirationAddDays = 85;
                }
                // console.log('10 days', moment(doseDate, 'YYYY-MM-DD').add(10, 'days'))
                // console.log('10 weeks', moment(doseDate, 'YYYY-MM-DD').add(10, 'weeks'))
                this.effectiveDate = Utils.addDays(moment(doseDate, 'MM-DD-YYYY').toDate(), effectiveAddDays);
                this.expirationDate = Utils.addDays(moment(this.effectiveDate, 'MM-DD-YYYY').toDate(), expirationAddDays);

                this.imageToTextResponse = {} as IImageToText;

                this.imageToTextResponse.firstDoseDate = this.patientForm.get('orgDose1').value ?
                    moment(this.patientForm.get('orgDose1').value, 'MM-DD-YYYY').toDate() : null;
                this.imageToTextResponse.secondDoseDate = this.patientForm.get('orgDose2').value ?
                    moment(this.patientForm.get('orgDose2').value, 'MM-DD-YYYY').toDate() : null;

                this.imageToTextResponse.firstDose = this.patientForm.get('orgManufacturer').value;
                this.imageToTextResponse.secondDose = this.patientForm.get('orgManufacturer').value;
            }
            else if (wizardObj.currentStep === 4) {
                this.showWebcam = false;
                this.patientForm.get('firstName').setValue(this.firstInputText ?
                    this.firstInputText : this.patientForm.get('firstName').value);
                this.patientForm.get('lastName').setValue(this.lastInputText ?
                    this.lastInputText : this.patientForm.get('lastName').value);
            }
            // console.log('after check step done');
            this.cd.markForCheck();
        });
    }

    subscribeValueChanges() {
        this.patientForm.get('orgState').valueChanges.subscribe(selectedValue => {
            this.listenToOrgStateChange(selectedValue);
        });

        this.patientForm.get('orgManufacturer').valueChanges.subscribe(selectedValue => {
            this.listenToOrgManufacturerChange(selectedValue);
        });

        this.patientForm.get('orgName').valueChanges.subscribe((selectedValue: any) => {
            this.listenToOrgChange(selectedValue);
        });

        this.patientForm.get('orgState').valueChanges.subscribe(selectedValue => {
            this.listenToOrgStateChange(selectedValue);
        });
        this.cd.markForCheck();
    }

    listenToOrgManufacturerChange(selectedValue) {
        if (selectedValue === 'Johnson \& Johnson' || !selectedValue) {
            this.patientForm.controls.orgDose2.setValue(null);
            this.patientForm.controls.orgDose2.setErrors(null);
            this.patientForm.controls.orgDose2.setValidators(null);
            this.patientForm.controls.orgDose2.updateValueAndValidity();

            this.patientForm.controls.lotNumber2.setValue(null);
            this.patientForm.controls.lotNumber2.setErrors(null);
            this.patientForm.controls.lotNumber2.setValidators(null);
            this.patientForm.controls.lotNumber2.updateValueAndValidity();
        } else {
            this.patientForm.get('orgDose2').setValidators(Validators.required);
            this.patientForm.get('orgDose2').updateValueAndValidity();

            this.patientForm.get('lotNumber2').setValidators(Validators.required);
            this.patientForm.get('lotNumber2').updateValueAndValidity();
        }
    }

    listenToOrgChange(selectedValue) {
        // console.log('listen to org change:', selectedValue);
        this.submitButton = { id: 1, value: 'Submit' };
        this.messageSeverity = '';
        this.messageContent = '';
        if (!selectedValue) {
            this.patientForm.get('orgName').setValidators(Validators.required);
            this.patientForm.get('orgName').updateValueAndValidity({ emitEvent: false, onlySelf: true });
        } else if (selectedValue.type?.toUpperCase() === 'EXTERNAL') {
            this.submitButton = { id: 1, value: 'Submit' };
        } else if (selectedValue.type?.toUpperCase() === 'HAPI') {
            this.submitButton = { id: 2, value: 'Start Verification' };
        }
        // else {
        //     this.submitButton = { id: 3, value: `Verify with ${selectedValue.name}` };
        // }
        if (this.submitButton.id === 2) {
            this.confirm2();
        }
        // console.log('this.submit button on listentoorg change:', this.submitButton)
    }
    orgNameTextChange(val) {
        let lookupType = '';
        if (val?.trim()) {
            lookupType = 'External';
            if (val.toUpperCase().includes('CVS')) {
                lookupType = 'HAPI';
            }
            // else if (val.toUpperCase().includes('HPH')) {
            //     lookupType = 'Direct';
            // }
            this.patientForm.controls.orgName.setValue({ name: val, type: lookupType });
            this.listenToOrgChange({ name: val, type: lookupType });
        } else {
            this.patientForm.controls.orgName.setValue(null);
            this.listenToOrgChange(null);
        }
        // this.patientForm.controls.orgName.updateValueAndValidity({ emitEvent: false, onlySelf: true });

    }
    listenToOrgStateChange(selectedValue) {
        if (selectedValue === 'HI') {
            this.patientForm.get('orgEmail')
                .setValidators(Validators.compose([Validators.required, Validators.pattern(this.mailFormat)]));
            this.patientForm.get('orgEmail').updateValueAndValidity();
        } else {
            // this.patientForm.controls.orgEmail.setValue(null);
            this.patientForm.controls.orgEmail.setErrors(null);
            this.patientForm.controls.orgEmail.setValidators(null);
            this.patientForm.get('orgEmail')
                .setValidators(Validators.compose([Validators.pattern(this.mailFormat)]));
            this.patientForm.controls.orgEmail.updateValueAndValidity();
        }
    }

    // orgChange(selectedValue){
    //     if (!selectedValue || selectedValue.toUpperCase().includes('QUEENS')){
    //         this.submitButton = 'Submit'
    //     } else if(selectedValue.toUpperCase() === ('TIMES PHARMACY')) {
    //         this.submitButton = 'Start Verification'
    //     } else this.submitButton = `Verify with ${selectedValue}`
    // }

    hasFormError(formGroup, isFormSubmitted, fieldName, errorType) {
        const formControl = formGroup.get(fieldName);
        const controlChanged = (formControl.touched || isFormSubmitted);
        if (controlChanged && errorType instanceof Array) {
            let orCondition = false;
            errorType.forEach(element => {
                orCondition = orCondition || formControl.hasError(element);
                if (orCondition) { return; }
            });
            return controlChanged && orCondition;
        }
        return controlChanged && (formControl.hasError(errorType));
    }

    isControlHasError = (controlName: string, validationType: string): boolean => {
        const control = this.patientForm.controls[controlName];
        if (!control) {
            return false;
        }
        const result = control.hasError(validationType) && (control.dirty || control.touched);
        return result;
    }
    // isFutureDate(controlName: string): boolean {
    //     return this.patientForm.controls[controlName].value > new Date();
    // }

    // tslint:disable-next-line: indent
    async onSubmit() {
        const formData = this.patientForm.value;
        // console.log('Form Data:', formData);
        this.submitted = true;
        // console.log('webcamImage:', this.webcamImage, 'imgsrc', this.imageSrc);
        // console.log('this.supportingDocFile:', this.supportingDocFile);
        let webcamPath;
        let srcPath;
        let supplementPath;
        if (this.patientForm.valid) {
            this.isLoading = true;
            this.submitButton.value = 'Processing';
            if (this.imageSrc) {
                // console.log('inside imgsrc found');
                srcPath = await this.wizardService
                    .uploadFile(this.imageSrc, this.constants.API_URI.SNAPSHOT_UPLOAD, 'snapshot').toPromise();
            }
            if (this.webcamImage) {
                // console.log('inside webcam foudn');
                webcamPath = await this.wizardService
                    .uploadFile(this.webcamImage, this.constants.API_URI.SNAPSHOT_UPLOAD, 'snapshot').toPromise();
            }
            if (this.supportingDocFile) {
                // console.log('inside supplient found');
                supplementPath = await this.wizardService
                    .uploadFile(this.supportingDocFile, this.constants.API_URI.SUPPLIMENT_DOC_UPLOAD, 'supplementDoc').toPromise();
            }
            console.log('srcpath', srcPath);
            console.log('webPath:', webcamPath);
            console.log('supplementPath', supplementPath);
            // return false;
            const media: IMedia[] = [];
            const existingVaxCard = this.loginResponse.media.find((x: any) => x.document_type === 'VAX_CARD');
            if (webcamPath) {
                let vaxSkyflowId = null;
                if (this.loginResponse.media && this.loginResponse.media.length > 0) {
                    if (existingVaxCard) {
                        vaxSkyflowId = existingVaxCard.skyflow_id;
                    }
                }
                media.push({
                    document_type: 'VAX_CARD',
                    file_path: webcamPath,
                    skyflow_id: vaxSkyflowId
                });
            } else if (srcPath) {
                let vaxSkyflowId = null;
                if (this.loginResponse.media && this.loginResponse.media.length > 0) {
                    if (existingVaxCard) {
                        vaxSkyflowId = existingVaxCard.skyflow_id;
                    }
                }
                media.push({
                    document_type: 'VAX_CARD',
                    file_path: srcPath,
                    skyflow_id: vaxSkyflowId
                });
            } else {
                if (existingVaxCard) {
                    media.push({
                        document_type: 'VAX_CARD',
                        file_path: null,
                        skyflow_id: existingVaxCard.skyflow_id
                    });
                }
            }

            const existingSuppliment = this.loginResponse.media.find((x: any) => x.document_type === 'SUPPLEMENT_DOC');
            if (supplementPath) {
                let supplementSkyflowId = null;
                if (this.loginResponse.media && this.loginResponse.media.length > 0) {
                    if (existingSuppliment) {
                        supplementSkyflowId = existingSuppliment.skyflow_id;
                    }
                }
                media.push({
                    document_type: 'SUPPLEMENT_DOC',
                    file_path: supplementPath,
                    skyflow_id: supplementSkyflowId
                });
            } else {
                if (existingSuppliment) {
                    media.push({
                        document_type: 'SUPPLEMENT_DOC',
                        file_path: null,
                        skyflow_id: existingSuppliment.skyflow_id
                    });
                }
            }

            const profiles: IProfile = {
                skyflow_id: this.loginResponse.travelerExists.profiles_skyflow_id,
                name: {
                    first_name: formData.firstName,
                    middle_name: formData.middleName,
                    last_name: formData.lastName
                },
                // unique_identifier: 'test',
                address: {
                    city: formData.city,
                    state: formData.state,
                    street_address: formData.address1,
                    street_address2: formData.address2,
                    zip_code: formData.zipcode
                },
                consent: {
                    given: formData.consent,
                },
                date_of_birth: Utils.formatToUSStandared(formData.dob),
                email_address: formData.email,
                sex: formData.gender,
                mobile_number: formData.contactOption === 'YES' ? formData.contactNumber : formData.contactOption2,
                mobile_number2: formData.contactOption === 'NO' ? formData.contactNumber2 : formData.contactNumber,
                travel_date: formData.travelDateToHawaii ? Utils.formatToUSStandared(formData.travelDateToHawaii) : null,
                traveler_type: formData.islandItem ? formData.islandItem : null,
                residency_state: formData.resedenceItem ? formData.resedenceItem : null,
            };
            const providerAddress: IAddress2 = {
                street_address: formData.orgAddress1,
                street_address2: formData.orgAddress2,
                state: formData.orgState,
                zip_code: formData.orgZipcode,
                city: formData.orgCity,
            };

            const provider: IProvider = {
                provider_org_name: formData.orgName,
                provider_email: formData.orgEmail,
                provider_address: providerAddress,
                provider_mobile_number: formData.orgContactNumber
            };

            const vaccineDose1: IVaccineDosing = {
                date: Utils.formatToUSStandared(formData.orgDose1),
                site_name: this.firstClinicName,
                site_address: providerAddress,
                lot_number: formData.lotNumber1
            };

            let vaccineDose2: IVaccineDosing;
            if (formData.orgDose2) {
                vaccineDose2 = {
                    date: Utils.formatToUSStandared(formData.orgDose2),
                    site_name: this.secondClinicName,
                    site_address: providerAddress,
                    lot_number: formData.lotNumber2
                };
            } else {
                vaccineDose2 = {
                    date: null,
                    site_name: null,
                    site_address: null
                };
            }

            const vaccination: IVaccinations = {
                skyflow_id: this.loginResponse.travelerExists.vaccination_skyflow_id,
                effective_date: Utils.formatToUSStandared(moment(this.effectiveDate).toDate()),
                expiration_date: Utils.formatToUSStandared(moment(this.expirationDate).toDate()),
                vaccine_manufacturer_name: formData.orgManufacturer,
                appointment_email_confirmation: formData.apptEmailConf,
                provider,
                vaccine_dose_1: vaccineDose1,
                vaccine_dose_2: vaccineDose2,
            };

            const postObject = {
                profiles, vaccination, media
            };
            localStorage.setItem('travelerData', JSON.stringify(this.patientForm.value));
            localStorage.removeItem(LOCAL_STORAGE_KEYS[LOCAL_STORAGE_KEYS.LOGIN_RESPONSE_DATA]);
            console.log('postObject:', postObject);
            this.wizardService.registerTraveller(postObject).subscribe((data: any) => {
                // console.log('result after save:', data);
                this.skyflowId = 'test';
                if (data.msg) {
                    // console.log('data.msg:', data);
                } else {
                    this.skyflowId = data.profileResponse.responses[0].records[0].skyflow_id;
                }
                this.router.navigate(['/success']);
            },
                error => {
                    // console.log('Error while processing data:', postObject);
                    // this.router.navigate(['/success']);
                }
            );
        }
    }

    onFileSelect(file) {
        // console.log('onFileSelect: ', file);
        this.supportingDocFile = file;
    }

    updateImageSrc(data) {
        // console.log('in update image src:', data);
        this.webcamImage = '';
        this.imageSrc = data;
    }

    updateWebcamImage(data) {
        // console.log('in update web cam image', data);
        this.imageSrc = '';
        this.webcamImage = data;
    }
    dataURLtoFile(dataurl, filename) {

        const arr = dataurl.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    }
    // uploadSnapshot(isFromFile = true) {
    //     const formData = new FormData();
    //     const file = isFromFile ? this.selectedFiles[0] : this.dataURLtoFile(this.webcamImage.imageAsDataUrl, 'temp.jpeg');
    //     formData.append('snapshot', file);
    //     const url = `${BASE_URL}/snapshot/upload`;
    //     this.http.post(url, formData)
    //         .subscribe((success: any) => {
    //             console.log(success);
    //             this.imageToTextResponse = success.text.responseObj as IImageToText;
    //             this.lastInputText = this.imageToTextResponse.lastName;
    //             this.lastNameInputControl.setValue(this.lastInputText);

    //             this.firstInputText = this.imageToTextResponse.firstName;
    //             this.firstNameInputControl.setValue(this.firstInputText);

    //             this.firstClinicName = this.imageToTextResponse.firstClinicName;
    //             this.firstClinicNameInputControl.setValue(this.firstClinicName);

    //             this.secondClinicName = this.imageToTextResponse.secondClinicName;
    //             this.secondClinicNameInputControl.setValue(this.secondClinicName);
    //         }, (error) => {
    //             console.log('err-->', error);
    //         });


    // }

    // registerElements(elements, exampleName) {
    //     var formClass = '.' + exampleName;
    //     var example = document.querySelector(formClass);

    //     var form = example.querySelector('form');
    //     var resetButton = example.querySelector('a.reset');
    //     var error = form.querySelector('.error');
    //     var errorMessage = error.querySelector('.message');

    //     function enableInputs() {
    //       Array.prototype.forEach.call(
    //         form.querySelectorAll(
    //           "input[type='text'], input[type='email'], input[type='tel']"
    //         ),
    //         function(input) {
    //           input.removeAttribute('disabled');
    //         }
    //       );
    //     }
    // }
}
