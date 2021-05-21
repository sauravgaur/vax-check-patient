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
import { IProfile, IPatientAddress, IVaccinations } from '../../../../interface/record.interface';
import Utils from '../../../../utils';
import { WizardService } from './wizard.service';
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

    isHawaiiState = false;
    showWebcam = false;
    stateList: SelectItem[];

    tooltipJson: any = {
        contactNumber: 'Prefered mobile phone number',
        resedenceItem: 'Are you a permanent Hawaii resident?',
        orgName: `Who organized the vaccination?<br> This is autocomplete text.<br> Type at least 1 alphabet.`,
        orgAddress1: 'Address of the Organization',
        takeSnapShot: 'Take a picture of you vaccination card',
        travelDateToHawaii: 'Trip date in Safe Travels'
    };
    model: any = {
        fname: 'John',
        lname: 'Wick',
        phone: '+61412345678',
        email: 'john.wick@reeves.com',
        address1: 'Address Line 1',
        address2: 'Address Line 2',
        postcode: '3000',
        city: 'Melbourne',
        state: 'VIC',
        country: 'AU',
        delivery: 'overnight',
        packaging: 'regular',
        preferreddelivery: 'morning',
        locaddress1: 'Address Line 1',
        locaddress2: 'Address Line 2',
        locpostcode: '3072',
        loccity: 'Preston',
        locstate: 'VIC',
        loccountry: 'AU',
        ccname: 'John Wick',
        ccnumber: '4444 3333 2222 1111',
        ccmonth: '01',
        ccyear: '21',
        cccvv: '123',
    };
    submitted = false;

    ndcItem: SelectItem[];
    selectedNDC: any;

    states: any[] = [];
    // selectedState: any;
    items: MenuItem[];

    // stateItem: SelectItem[];
    // selectedState: any;
    // selectedStateUser: any;

    // cityItem: SelectItem[];
    // selectedCity: any;

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
    stripePromise = loadStripe(environment.stripe_key);
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
        this.stateList = this.constants.STATES;
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
    ngOnInit() {

        localStorage.removeItem('travelerData');
        // this.patientForm = this.fb1.group({
        //     id: new FormControl(''),
        //     firstName: new FormControl('a'),
        //     middleName: new FormControl('a'),
        //     lastName: new FormControl('a'),
        //     dob: new FormControl(new Date('2021-04-01')),
        //     email: new FormControl('a@a.com'),
        //     gender: new FormControl('MALE'),
        //     address1: new FormControl('a'),
        //     address2: new FormControl(''),
        //     city: new FormControl('a'),
        //     zipcode: new FormControl('12312'),
        //     state: new FormControl('AK'),
        //     resedenceItem: new FormControl(''),
        //     islandItem: new FormControl(''),
        //     contactNumber: new FormControl('2342342342'),
        //     contactNumber2: new FormControl(''),
        //     contactOption: new FormControl('YES'),
        //     orgName: new FormControl({ name: 'CVS/Long Drugs', value: 'CVS/Long Drugs' }),
        //     orgAddress1: new FormControl('a'),
        //     orgAddress2: new FormControl(''),
        //     orgCity: new FormControl('a'),
        //     orgZipcode: new FormControl('23423'),
        //     orgState: new FormControl('AK'),
        //     orgContactNumber: new FormControl('223423423'),
        //     orgEmail: new FormControl(''),
        //     orgManufacturer: new FormControl('Moderna'),
        //     orgDose1: new FormControl(new Date('2021-04-01')),
        //     orgDose2: new FormControl(new Date('2021-05-05')),
        //     travelDateToHawaii: new FormControl(''),
        //     consent: new FormControl(true)
        // });

        // this.patientForm.get('firstName').setValidators(Validators.compose([Validators.required, Validators.pattern('^[ A-Za-z-.,]*$')]));
        //         this.patientForm.get('lastName').setValidators(Validators.required);
        //         this.patientForm.get('dob').setValidators(Validators.required);
        //         this.patientForm.get('email').setValidators(Validators.compose([Validators.required, Validators.pattern(this.mailFormat)]));
        //         this.patientForm.get('gender').setValidators(Validators.required);
        //         this.patientForm.get('address1').setValidators(Validators.required);
        //         this.patientForm.get('city').setValidators(Validators.required);
        //         this.patientForm.get('state').setValidators(Validators.required);
        //         this.patientForm.get('zipcode').setValidators(Validators.compose([Validators.required, Validators.pattern('^\\d{5}')]));
        //         this.patientForm.get('contactNumber').
        //             setValidators(Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)]));
        //         this.patientForm.get('contactOption').setValidators(Validators.required);

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
            consent: new FormControl()
        });

        // this.stateItem = this.constants.STATES;

        // console.log('this.org options:', this.orgOptions);
        this.subscribeValueChanges();
        // this.initGroupedForm();

        if (!this.token) {
            // this.fetchToken();
        }

        // if (HumanConnect) {
        //     HumanConnect.on('connect', response => {
        //         console.log('response connect:', response)
        //     });
        //     HumanConnect.on('disconnect', response => {
        //         console.log('response disconnect:', response)
        //     });
        //     HumanConnect.on('close', response => {
        //         this.connectClosed = true;
        //         console.log('response close:', response)
        //     });
        // }

    }

    updateFirstName(firstName: string) {
        console.log('in first name update', firstName);
        this.firstInputText = firstName;
    }

    updateLastName(lastName: string) {
        console.log('in lastName update', lastName);
        this.lastInputText = lastName;
    }

    updateFirstClinic(clinicName: string) {
        console.log('in first clinicName update', clinicName);
        this.firstClinicName = clinicName;
    }

    updateSecondClinic(clinicName: string) {
        console.log('in secpmd clinicName update', clinicName);
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
                masterId: 1, travelerEmail: this.patientForm.get('email').value
            }).toPromise();
        console.log('session:', getSession);
        // When the customer clicks on the button, redirect them to Checkout.
        const stripe = await this.stripePromise;
        const { error } = await stripe.redirectToCheckout({
            sessionId: getSession.sessionId,
            // mode: 'payment',
            // lineItems: [{ price: this.priceId, quantity: this.quantity }],
            // successUrl: `${window.location.href}/success`,
            // cancelUrl: `${window.location.href}/failure`,
        });
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `error.message`.
        if (error) {
            console.log(error);
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
            console.log('before next', this.patientForm.value);
            this.isFormSubmitted = true;
            console.log('wizard obj in before next:', wizardObj, wizardObj.getStep());
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

                // if (wizardObj.currentStep === 2) {
                // if (!this.lastInputText && !this.firstInputText) {
               

                // } else {
                //     this.patientForm.get('firstName').setValue(this.firstInputText);
                //     this.patientForm.get('lastName').setValue(this.lastInputText);
                // }

                // }
                if (this.patientForm.valid) {
                    // const checkTravelerExists: any = await this.http.post(`${environment.api_url}/batch/check-patient`, {
                    //     firstName: this.patientForm.get('firstName').value,
                    //     lastName: this.patientForm.get('lastName').value,
                    //     middleName: this.patientForm.get('middleName').value,
                    //     dateOfBirth: this.patientForm.get('dob').value
                    // }).toPromise();
                    // console.log('checkTravelerExists: ', checkTravelerExists)
                    // if (checkTravelerExists.isUserExist) {
                    //     console.log('in user exists')
                    //     wizardObj.stop();
                    //     this.cd.markForCheck();
                    //     return;

                    // } else console.log('in user not exists')
                }

            } else if (wizardObj.currentStep === 2) {
                this.stepTwo = true;
            } else if (wizardObj.currentStep === 3) {
                // this.patientForm.get('consent').setValidators(Validators.required);
                // this.patientForm.get('consent').updateValueAndValidity();
                this.showWebcam = false;
                // this.tab3Pressed == true;
                if (!this.firstInputText || !this.lastInputText || !this.firstClinicName || !this.patientForm.valid
                    || (this.patientForm.get('orgDose2').value && !this.secondClinicName)
                    || ((!this.webcamImage && !this.imageSrc))) {
                    this.tab3Pressed = true;
                    wizardObj.stop();
                    this.cd.markForCheck();
                    return;
                }
            } else if (wizardObj.currentStep === 4) {
                this.showWebcam = false;
            }
            this.tab3Pressed = false;
            this.patientForm.updateValueAndValidity();
            console.log('patient form:', this.patientForm.value);
            const controls = this.patientForm.controls;
            // if (this.patientForm.invalid) {
            Object.keys(controls).forEach(controlName => {
                controls[controlName].markAsTouched();
                controls[controlName].markAsDirty();
            }
            );
            // }
            this.cd.markForCheck();
            Object.keys(this.patientForm.controls).forEach(key => {
                const controlErrors: ValidationErrors = this.patientForm.get(key).errors;
                if (controlErrors != null) {
                    Object.keys(controlErrors).forEach(keyError => {
                        console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
                    });
                }
            });
            // return;
            // }
            if (this.patientForm.valid) {
                wizardObj.goNext();
            } else { wizardObj.stop(); }
            // https://angular.io/guide/forms
            // https://angular.io/guide/form-validation

            // validate the form and use below function to stop the wizard's step
            // wizardObj.stop();
        });

        // Change event
        wizard.on('change', (wizardObj) => {
            console.log('Change', this.patientForm.value);
            console.log('wizardObj--> ', wizardObj);

            setTimeout(() => {
                KTUtil.scrollTop();
                // if(wizardObj.currentStep==3 && !this.isCameraSet){
                //   this.isCameraSet=true;
                //   if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                //     navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
                //         this.video.nativeElement.src = window.URL.createObjectURL(stream);
                //         this.video.nativeElement.play();
                //     });
                // }
                // }
            }, 500);
            this.changeStep = wizardObj.currentStep;
            if (wizardObj.currentStep === 2) {

                this.lastInputText = this.patientForm.get('lastName').value;
                this.lastNameInputControl.setValue(this.lastInputText);

                this.firstInputText = this.patientForm.get('firstName').value;
                this.firstNameInputControl.setValue(this.firstInputText);

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

                this.patientForm.get('orgDose2').setValidators((this.patientForm.get('orgManufacturer').value && this.patientForm.get('orgManufacturer').value !== 'Johnson \& Johnson') ? Validators.required : null);
                this.patientForm.get('orgDose2').updateValueAndValidity();
                this.patientForm.get('orgDose2').markAsPristine();

                this.patientForm.get('orgEmail').setValidators(Validators.compose([Validators.pattern(this.mailFormat), Validators.email]));
                this.patientForm.get('orgEmail').updateValueAndValidity();
                this.patientForm.get('orgEmail').markAsPristine();
            }
            else if (wizardObj.currentStep === 3) {
                this.patientForm.get('consent').setValidators(Validators.required);
                this.patientForm.get('consent').updateValueAndValidity();

                this.firstClinicName = this.firstClinicName ? this.firstClinicName :
                    (this.patientForm.get('orgDose1').value ? this.patientForm.get('orgName').value.name : '');
                this.firstClinicNameInputControl.setValue(this.firstClinicName);

                this.secondClinicName = this.secondClinicName ? this.secondClinicName :
                    (this.patientForm.get('orgDose2').value ? this.patientForm.get('orgName').value.name : '');
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
            if (wizardObj.currentStep === 4) {
                this.patientForm.get('firstName').setValue(this.firstInputText ?
                    this.firstInputText : this.patientForm.get('firstName').value);
                this.patientForm.get('lastName').setValue(this.lastInputText ?
                    this.lastInputText : this.patientForm.get('lastName').value);
            }
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
        } else {
            this.patientForm.get('orgDose2').setValidators(Validators.required);
            this.patientForm.get('orgDose2').updateValueAndValidity();
        }
    }
    listenToOrgChange(selectedValue) {
        this.messageSeverity = '';
        this.messageContent = '';
        if (!selectedValue) {
            this.patientForm.get('orgName').setValidators(Validators.required);
            this.patientForm.get('orgName').updateValueAndValidity({ emitEvent: false, onlySelf: true });
        } else if (selectedValue.value.toUpperCase().includes('HPH')) {
            this.submitButton = { id: 1, value: 'Submit' };
        } else if (selectedValue.value.toUpperCase().includes('CVS')) {
            this.submitButton = { id: 2, value: 'Start Verification' };
        } else {
            this.submitButton = { id: 3, value: `Verify with ${selectedValue.value}` };
        }
        if (this.submitButton.id === 2) {
            this.confirm2();
        }
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
    onSubmit() {
        // var cardNumberEle : any = document.querySelector('[data-elements-stable-field-name="cardNumber"]');
        // console.log('card number ele', cardNumberEle)
        // console.log('card number:', cardNumberEle.defaultValue)
        const formData = this.patientForm.value;
        console.log('Form Data:', formData);
        this.submitted = true;
        const profile: IProfile = {
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
                given: this.consent,
            },
            date_of_birth: Utils.formatToUSStandared(formData.dob),
            email_address: formData.email,
            sex: formData.gender,
            mobile_number: formData.contactOption === 'YES' ? formData.contactNumber : formData.contactOption2,
            mobile_number2: formData.contactOption === 'NO' ? formData.contactNumber2 : formData.contactNumber,
            travel_date: formData.travelDateToHawaii ? Utils.formatToUSStandared(formData.travelDateToHawaii) : null
        };
        const vaccination: IVaccinations = {
            profiles_skyflow_id: null, //Math.random().toString(36).substr(2, 5),
            effective_date: Utils.formatToUSStandared(moment(this.effectiveDate).toDate()),
            expiration_date: Utils.formatToUSStandared(moment(this.expirationDate).toDate()),
            vaccine_manufacturer_name: formData.orgManufacturer,
            provider: {
                provider_org_name: formData.orgName.value,
                provider_email: formData.orgEmail,
                provider_address: {
                    street_address: formData.orgAddress1,
                    street_address2: formData.orgAddress2,
                    state: formData.orgState,
                    zip_code: formData.orgZipcode,
                    city: formData.orgCity,
                }
            }
        };
        const postObject = {
            profile, vaccination
        };
        if (this.patientForm.valid) {
            this.isLoading = true;
            this.button = 'Processing';

            localStorage.setItem('travelerData', JSON.stringify(this.patientForm.value));
            this.wizardService.registerTraveller(postObject).subscribe((data: any) => {
                console.log('result after save:', data);
                this.isLoading = false;
                this.button = 'Submit';
                this.checkout();
            },
                error => {
                    console.log('Error while processing data:' + postObject);
                    this.isLoading = false;
                    this.button = 'Submit';
                    this.checkout();
                }
            );
        }
        // this.showDialog();

        // this.stripeTest.controls.stripe_firstName.setValue(this.patientForm.controls.firstName.value)
        // this.stripeTest.controls.stripe_lastName.setValue(this.patientForm.controls.lastName.value)
        // this.stripeTest.controls.stripe_address1.setValue(this.patientForm.controls.address1.value)
        // this.stripeTest.controls.stripe_city.setValue(this.patientForm.controls.city.value)
        // this.stripeTest.controls.stripe_state.setValue(this.patientForm.controls.state.value)
        // this.stripeTest.controls.stripe_zipcode.setValue(this.patientForm.controls.zipcode.value)
        // console.log('stripe console:', this.stripeTest.value)
        // this.stripeTest.updateValueAndValidity();

        // let navigationExtras: NavigationExtras = {
        //     queryParams: this.patientForm.value
        // };
        // this.router.navigate(["payment"], navigationExtras);

        // this.router.navigateByUrl('/dashboard');
    }
    updateImageSrc(data) {
        console.log('in update image src:', data);
        this.imageSrc = data;
    }

    updateWebcamImage(data) {
        console.log('in update web cam image', data);
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
