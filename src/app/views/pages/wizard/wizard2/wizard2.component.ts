import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { WebcamImage } from 'ngx-webcam';
import { ConfirmEventType, MenuItem, SelectItem } from 'primeng/api';
import { Observable, Subject } from 'rxjs';
import { ShepherdService } from 'angular-shepherd';
import { steps as defaultSteps, defaultStepOptions } from './tour';
import moment from 'moment';
import { StripeService, Elements, StripeCardComponent, Element as StripeElement, ElementsOptions, ElementOptions } from "ngx-stripe";
import { ConfirmationService } from 'primeng/api';
import { Message } from 'primeng//api';
import { MessageService } from 'primeng/api';
import { CdkRow } from '@angular/cdk/table';
import { countBy } from 'lodash';
import { Router, NavigationExtras } from '@angular/router';
// label: 'Hispanic or Latino', value: '2186-5'
interface IImageToText {
    firstName?: string;
    middleName?: string;
    lastName?: string;
    mi?: string;
    patientNumber?: string;
    firstDose?: string;
    firstDoseDate?: Date;
    firstClinicName?: string;
    secondDose?: string;
    secondDoseDate?: Date;
    secondClinicName?: string;
    doseRecieved?: number;
    isVaXCompleted?: boolean;
    secondDoseEffectiveDate?: Date;
    firstDoseEffectiveDate?: Date;
    firstDoseExpireDate?: Date;
    secondDoseExpireDate?: Date;

    // {
    //     "firstName": "Coulombe", "middleName": "", "lastName": "Annette",
    //     "mi": "", "dob": "", "patientNumber": "", "firstDose": "Moderna oll L 20A",
    //     "firstDoseDate": "112 29,20 ", "firstClinicName": "NEERH", "secondDose": "Moderna oll L 20A",
    //     "secondDoseDate": '04 20 21', "secondClinicName": "NEERH"
    // }
}

const BASE_URL = 'http://localhost:3000/api';
const MANUFACTURER: SelectItem[] = [
    {
        label: 'Moderna',
        value: 'Moderna'
    },
    {
        label: 'Pfizer',
        value: 'Pfizer'
    },
    {
        label: 'Johnson \& Johnson',
        value: 'Johnson \& Johnson'
    }
];
const STATES: SelectItem[] = [
    {
        label: 'Alabama',
        value: 'AL'
    },
    {
        label: 'Alaska',
        value: 'AK'
    },
    {
        label: 'American Samoa',
        value: 'AS'
    },
    {
        label: 'Arizona',
        value: 'AZ'
    },
    {
        label: 'Arkansas',
        value: 'AR'
    },
    {
        label: 'California',
        value: 'CA'
    },
    {
        label: 'Colorado',
        value: 'CO'
    },
    {
        label: 'Connecticut',
        value: 'CT'
    },
    {
        label: 'Delaware',
        value: 'DE'
    },
    {
        label: 'District Of Columbia',
        value: 'DC'
    },
    {
        label: 'Federated States Of Micronesia',
        value: 'FM'
    },
    {
        label: 'Florida',
        value: 'FL'
    },
    {
        label: 'Georgia',
        value: 'GA'
    },
    {
        label: 'Guam',
        value: 'GU'
    },
    {
        label: 'Hawaii',
        value: 'HI'
    },
    {
        label: 'Idaho',
        value: 'ID'
    },
    {
        label: 'Illinois',
        value: 'IL'
    },
    {
        label: 'Indiana',
        value: 'IN'
    },
    {
        label: 'Iowa',
        value: 'IA'
    },
    {
        label: 'Kansas',
        value: 'KS'
    },
    {
        label: 'Kentucky',
        value: 'KY'
    },
    {
        label: 'Louisiana',
        value: 'LA'
    },
    {
        label: 'Maine',
        value: 'ME'
    },
    {
        label: 'Marshall Islands',
        value: 'MH'
    },
    {
        label: 'Maryland',
        value: 'MD'
    },
    {
        label: 'Massachusetts',
        value: 'MA'
    },
    {
        label: 'Michigan',
        value: 'MI'
    },
    {
        label: 'Minnesota',
        value: 'MN'
    },
    {
        label: 'Mississippi',
        value: 'MS'
    },
    {
        label: 'Missouri',
        value: 'MO'
    },
    {
        label: 'Montana',
        value: 'MT'
    },
    {
        label: 'Nebraska',
        value: 'NE'
    },
    {
        label: 'Nevada',
        value: 'NV'
    },
    {
        label: 'New Hampshire',
        value: 'NH'
    },
    {
        label: 'New Jersey',
        value: 'NJ'
    },
    {
        label: 'New Mexico',
        value: 'NM'
    },
    {
        label: 'New York',
        value: 'NY'
    },
    {
        label: 'North Carolina',
        value: 'NC'
    },
    {
        label: 'North Dakota',
        value: 'ND'
    },
    {
        label: 'Northern Mariana Islands',
        value: 'MP'
    },
    {
        label: 'Ohio',
        value: 'OH'
    },
    {
        label: 'Oklahoma',
        value: 'OK'
    },
    {
        label: 'Oregon',
        value: 'OR'
    },
    {
        label: 'Palau',
        value: 'PW'
    },
    {
        label: 'Pennsylvania',
        value: 'PA'
    },
    {
        label: 'Puerto Rico',
        value: 'PR'
    },
    {
        label: 'Rhode Island',
        value: 'RI'
    },
    {
        label: 'South Carolina',
        value: 'SC'
    },
    {
        label: 'South Dakota',
        value: 'SD'
    },
    {
        label: 'Tennessee',
        value: 'TN'
    },
    {
        label: 'Texas',
        value: 'TX'
    },
    {
        label: 'Utah',
        value: 'UT'
    },
    {
        label: 'Vermont',
        value: 'VT'
    },
    {
        label: 'Virgin Islands',
        value: 'VI'
    },
    {
        label: 'Virginia',
        value: 'VA'
    },
    {
        label: 'Washington',
        value: 'WA'
    },
    {
        label: 'West Virginia',
        value: 'WV'
    },
    {
        label: 'Wisconsin',
        value: 'WI'
    },
    {
        label: 'Wyoming',
        value: 'WY'
    }
];
@Component({
    selector: 'kt-wizard2',
    templateUrl: './wizard2.component.html',
    styleUrls: ['./wizard2.component.scss'],
    providers: [ConfirmationService, MessageService]
})
export class Wizard2Component implements OnInit, AfterViewInit {
    @ViewChild(StripeCardComponent) card: StripeCardComponent;
    @ViewChild('cardInfo') cardInfo: ElementRef;
    elements: Elements;
    card1: StripeElement;

    creditCard: StripeElement;
    expiry: StripeElement;
    cvv: StripeElement;

    cardOptions: ElementOptions = {
        style: {
            // base: {
            //     iconColor: '#666EE8',
            //     color: '#31325F',
            //     lineHeight: '40px',
            //     fontWeight: 300,
            //     fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            //     fontSize: '18px',
            //     '::placeholder': {
            //         color: '#CFD7E0'
            //     }
            // }
            base: {
                color: '#32325D',
                fontWeight: 500,
                fontFamily: 'Source Code Pro, Consolas, Menlo, monospace',
                fontSize: '16px',
                fontSmoothing: 'antialiased',

                '::placeholder': {
                    color: '#CFD7DF',
                },
                ':-webkit-autofill': {
                    color: '#e39f48',
                },
            },
            invalid: {
                color: '#E25950',

                '::placeholder': {
                    color: '#FFCCA5',
                },
            }
        }
    };
    elementsOptions: ElementsOptions = {
        locale: 'auto',
        fonts: [
            {
                cssSrc: 'https://fonts.googleapis.com/css?family=Source+Code+Pro',
            },
        ]
    };

    stripeTest: FormGroup;
    @ViewChild('wizard', { static: true }) el: ElementRef;

    isHawaiiState = false;
    tabIndex = 0;
    showWebcam = false;
    selectedFiles: any;
    stateList: SelectItem[] = STATES;
    manufacturerList: SelectItem[] = MANUFACTURER;
    imageSrc: any;
    public webcamImage: WebcamImage = null;
    private trigger: Subject<void> = new Subject<void>();
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

    cvx_item: SelectItem[];
    selectedCVX: any;

    contact_item: SelectItem[];
    selectedConatctOption: any;

    resedence_item: SelectItem[];
    selectedresedenceOption: any;

    island_item: SelectItem[];

    ndc_item: SelectItem[];
    selectedNDC: any;

    site_item: SelectItem[];
    selectedSite: any;

    states: any[] = [];
    // selectedState: any;
    items: MenuItem[];

    extract_item: SelectItem[];
    selectedExtractType: any;

    ethnicity_item: SelectItem[];
    selectedEthnicity: any;

    country_item: SelectItem[];
    selectedCountry: any;

    state_item: SelectItem[];
    selectedState: any;
    selectedStateUser: any;

    city_item: SelectItem[];
    selectedCity: any;

    sex_item: SelectItem[];
    selectedSex: any;

    race_item: SelectItem[];
    selectedRace: any;

    series_item: SelectItem[];
    selectedSeries: any;

    location_item: SelectItem[];
    selectedLocation: any;

    provider_item: SelectItem[];
    selectedProvider: any;

    refusal_item: SelectItem[];
    selectedRefusal: any;

    comorbidity_item: SelectItem[];
    selectedComorbidity: any;

    missed_item: SelectItem[];
    selectedMissed: any;

    serology_item: SelectItem[];
    selectedSerology: any;
    stepOne = false;
    stepTwo = false;
    patientForm: FormGroup;
    isFormSubmitted = false;

    orgs: any[];

    filteredOrgs: any[];
    groupedForm: FormGroup;
    public mode: 'view' | 'edit' = 'view';
    public identity = {
        name: 'John Doe',
        city: 'London',
        country: 'England',
    };
    public firstInputText: any;
    public lastNameInputControl: FormControl = new FormControl();

    public lastInputText: any;
    public firstNameInputControl: FormControl = new FormControl();
    // public productInputText = 'Estragen';
    // public productNameControl: FormControl = new FormControl(this.productInputText);
    // public productOptions = ['Estragen', 'Johnson & Johnson', 'Neptura'];

    public firstClinicNameInputControl: FormControl = new FormControl();
    public firstClinicName: any;
    public secondClinicNameInputControl: FormControl = new FormControl();
    public secondClinicName: any;

    imageToTextResponse: IImageToText;
    yearRange: any;
    consent = false;
    consentNotChecked = false;
    maxDate = new Date();
    minDate = this.addDays(new Date(), 1);
    gapDays = 0;
    submitButton = { id: 1, value: 'Submit' }
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
    constructor(
        private cd: ChangeDetectorRef,
        private http: HttpClient,
        private _fb: FormBuilder,
        private shepherdService: ShepherdService,
        private stripeService: StripeService,
        private fb: FormBuilder,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private router: Router,
    ) {
    }

    // public capture() {
    //     var context = this.canvas.nativeElement.getContext("2d").drawImage(this.video.nativeElement, 0, 0, 640, 480);
    //     this.captures.push(this.canvas.nativeElement.toDataURL("image/png"));
    // }
    inputs: any;
    ngOnInit() {
        this.inputs = document.querySelectorAll('.cell.example.example2 .input');
        Array.prototype.forEach.call(this.inputs, function (input) {
            input.addEventListener('focus', function () {
                input.classList.add('focused');
            });
            input.addEventListener('blur', function () {
                input.classList.remove('focused');
            });
            input.addEventListener('keyup', function () {
                if (input.value.length === 0) {
                    input.classList.add('empty');
                } else {
                    input.classList.remove('empty');
                }
            });
        });
        // this.imageToTextResponse=null;
        this.yearRange = `1930:${new Date().getFullYear()}`;
        this.patientForm = this._fb.group({
            id: new FormControl(''),
            firstName: new FormControl('a'),
            middleName: new FormControl('a'),
            lastName: new FormControl('a'),
            dob: new FormControl(new Date('2021-04-01')),
            email: new FormControl(''),
            gender: new FormControl('M'),
            address1: new FormControl('a'),
            address2: new FormControl(''),
            city: new FormControl('a'),
            zipcode: new FormControl('12312'),
            state: new FormControl('AK'),
            resedenceItem: new FormControl(''),
            islandItem: new FormControl(''),
            contactNumber: new FormControl('2342342342'),
            contactOption: new FormControl(''),
            orgName: new FormControl(''),
            orgAddress1: new FormControl('a'),
            orgAddress2: new FormControl(''),
            orgCity: new FormControl('a'),
            orgZipcode: new FormControl('23423'),
            orgState: new FormControl('AK'),
            orgContactNumber: new FormControl('223423423'),
            orgEmail: new FormControl(''),
            orgManufacturer: new FormControl('Moderna'),
            orgDose1: new FormControl(new Date('2021-04-01')),
            orgDose2: new FormControl(new Date('2021-05-05')),
            travelDateToHawaii: new FormControl('')
        });
        // this.patientForm = this._fb.group({
        //     id: new FormControl(''),
        //     firstName: new FormControl(''),
        //     middleName: new FormControl(''),
        //     lastName: new FormControl(''),
        //     dob: new FormControl(),
        //     email: new FormControl(''),
        //     gender: new FormControl(''),
        //     address1: new FormControl(''),
        //     address2: new FormControl(''),
        //     city: new FormControl(''),
        //     zipcode: new FormControl(''),
        //     state: new FormControl(''),
        //     resedenceItem: new FormControl(''),
        //     islandItem: new FormControl(''),
        //     contactNumber: new FormControl(''),
        //     contactOption: new FormControl(''),
        //     orgName: new FormControl(''),
        //     orgAddress1: new FormControl(''),
        //     orgAddress2: new FormControl(''),
        //     orgCity: new FormControl(''),
        //     orgZipcode: new FormControl(''),
        //     orgState: new FormControl(''),
        //     orgContactNumber: new FormControl(''),
        //     orgEmail: new FormControl(''),
        //     orgManufacturer: new FormControl(''),
        //     orgDose1: new FormControl(),
        //     orgDose2: new FormControl(),
        //     travelDateToHawaii: new FormControl('')
        // });
        // this.captures = [];

        this.extract_item = [{ label: 'Deidentified', value: 'D' },
        { label: 'PPRL', value: 'P' },
        { label: 'Identified', value: 'I' }];


        this.ethnicity_item = [{ label: 'Hispanic or Latino', value: '2135-2' },
        { label: 'Hispanic or Latino', value: '2186-5' },
        { label: 'Unknown ehnicity', value: 'UNK' },
        { label: 'Unable to report to do policy/law', value: 'POL' }];

        this.country_item = [{ label: 'County name 1', value: '1' },
        { label: 'County name 2', value: '2' },
        { label: 'County name 3', value: '3' }];
        this.contact_item = [{ label: 'Yes', value: 'YES' },
        { label: 'No', value: 'NO' }];

        this.resedence_item = [{ label: 'Yes', value: 'YES' },
        { label: 'No', value: 'NO' }];

        this.island_item = [{ label: 'O\'ahu', value: 'O\'ahu' },
        { label: 'Maui', value: 'Maui' },
        { label: 'Hawai\'i Island', value: 'Hawai\'i Island' },
        { label: 'Kaua\'i', value: 'Kaua\'i' },
        { label: 'Moloka\'i', value: 'Moloka\'i' },
        { label: 'Lana\'i', value: 'Lana\'i' }];

        this.state_item = [{ label: 'State name 1', value: '1' },
        { label: 'State name 2', value: '2' },
        { label: 'State name 3', value: '3' }];

        this.city_item = [{ label: 'City name 1', value: '1' },
        { label: 'City name 2', value: '2' },
        { label: 'City name 3', value: '3' }];

        this.sex_item = [{ label: 'Male', value: 'M' },
        { label: 'Female', value: 'F' },
        { label: 'Non-Binary', value: 'U' }];

        this.series_item = [{ label: 'Yes', value: 'YES' },
        { label: 'No', value: 'NO' },
        { label: 'Unknown', value: 'UNKNOWN' }];

        this.location_item = [{ label: 'Clinic', value: 'CL' },
        { label: 'Health Dept.', value: 'HD' },
        { label: 'Pharmacy', value: 'PH' }];

        this.provider_item = [{ label: 'Registered Nurse', value: 'CL' },
        { label: 'Medical Doctor', value: 'HD' },
        { label: 'Nurse Practitioner', value: 'PH' }];

        this.refusal_item = [{ label: 'Yes', value: 'CL' },
        { label: 'No', value: 'PH' }];

        this.comorbidity_item = [{ label: 'Yes', value: 'CL' },
        { label: 'No', value: 'PH' },
        { label: 'Unknown', value: 'UNKNOWN' }];

        this.missed_item = [{ label: 'Yes', value: 'CL' },
        { label: 'No', value: 'PH' }];

        this.serology_item = [{ label: 'Yes', value: 'CL' },
        { label: 'No', value: 'PH' },
        { label: 'Unknown', value: 'UNKNOWN' }];

        this.race_item = [{ label: 'American Indian or Alaska Native', value: '1002-5' },
        { label: 'Asian', value: '2028-9' },
        { label: 'Native Haw aiian or Other Pacific Islander', value: '2076-8' },
        { label: 'Black or African American', value: '2028-5' },
        { label: 'White', value: '2028-1' },
        { label: 'Other race', value: '2028-2' },
        { label: 'Unknown', value: '2028-3' },
        { label: 'Unable to report due to policy/law', value: '2028-4' }];

        this.cvx_item = [{ label: 'COVID 19 Vaccine A', value: '900' },
        { label: 'COVID 19 Vaccine B', value: '901' },
        { label: 'COVID 19 Vaccine C', value: '902' }];

        this.site_item = [{ label: 'Intradermal', value: '900' },
        { label: 'Intramuscular', value: '901' },
        { label: 'Intravenous', value: '901' },
        { label: 'Oral', value: '901' },
        { label: 'Percutaneous', value: '901' },
        { label: 'Nasal', value: '902' }];

        this.orgs = [{ name: 'Adventist Health Castle', value: 'Adventist Health Castle' },
        { name: 'Costco', value: 'Costco ' },
        { name: 'CVS/Long Drugs', value: 'CVS/Long Drugs' },

        { name: 'Hamakua Kohala Health', value: 'Hamakua Kohala Health' },
        { name: 'Hana Health Clinic', value: 'Hana Health Clinic' },
        { name: 'Hawai\'i - Bay Clinic, Inc.', value: 'Hawai\'i - Bay Clinic, Inc.' },
        { name: 'Hawaii Pacific Health (HPH)', value: 'Hawaii Pacific Health (HPH)' },
        { name: 'Hilo - Prince Kuhio Plaza  - CVS/ Longs Drugs ', value: 'Hilo - Prince Kuhio Plaza  - CVS/ Longs Drugs ' },
        { name: 'Hilo - Safeway', value: 'Hilo - Safeway' },
        { name: 'Hilo - Target - CVS/Longs Drugs', value: 'Hilo - Target - CVS/Longs Drugs' },
        { name: 'Hilo Kilauea Av- CVS/Longs Drugs', value: 'Hilo Kilauea Av- CVS/Longs Drugs' },
        { name: 'Hilo Medical Center', value: 'Hilo Medical Center' },
        { name: 'Hui No Ke Ola Pono - J. Walter Cameron Center', value: 'Hui No Ke Ola Pono - J. Walter Cameron Center' },
        { name: 'Kahului - CVS Pharmacy', value: 'Kahului - CVS Pharmacy' },

        { name: 'Kahului - Safeway Pharmacy ', value: 'Other' },
        { name: 'Kahului - Walmart Inc', value: 'Kahului - Walmart Inc' },
        { name: 'Kailua-Kona  CVS/Long Drugs - Keauhou Shopping ', value: 'Kailua-Kona  CVS/Long Drugs - Keauhou Shopping ' },
        { name: 'Kailua-Kona  CVS/Long Drugs - Kuakini', value: 'Kailua-Kona  CVS/Long Drugs - Kuakini' },
        { name: 'Kailua-Kona  CVS/Long Drugs - Target', value: 'Kailua-Kona  CVS/Long Drugs - Target' },
        { name: 'Kailua-Kona Safeway', value: 'Kailua-Kona Safeway' },
        { name: 'Kaiser Permanente', value: 'Kaiser Permanente' },
        { name: 'Kihei - Safeway Pharmacy ', value: 'Kihei - Safeway Pharmacy ' },
        { name: 'Kona Community Hospital', value: 'Kona Community Hospital' },
        { name: 'KTA Super Stores', value: 'KTA Super Stores' },

        { name: 'Leeward Community College Clinic', value: 'Leeward Community College Clinic' },
        { name: 'Lahaina - CVS Pharmacy', value: 'Lahaina - CVS Pharmacy' },
        { name: 'Longs Drugs (CVS) - Kahului', value: 'Longs Drugs (CVS) - Kahului' },
        { name: 'Longs Drugs (CVS) - Kihei', value: 'Longs Drugs (CVS) - Kihei' },
        { name: 'Longs Drugs (CVS) - Lahaina', value: 'Longs Drugs (CVS) - Lahaina' },
        { name: 'Longs Drugs (CVS) - Pukalani', value: 'Longs Drugs (CVS) - Pukalani' },
        { name: 'Maderna Vaccine Clinics - UH Maui College', value: 'Maderna Vaccine Clinics - UH Maui College' },
        { name: 'Makawao Town Pharmacy', value: 'Makawao Town Pharmacy' },
        { name: 'Maui - Costco Wholesale', value: 'Maui - Costco Wholesale' },
        { name: 'Maui Clinic Pharmacy', value: 'Maui Clinic Pharmacy' },
        { name: 'Maui District Health Office', value: 'Maui District Health Office' },
        { name: 'Maui Health – Kaiser Permanente', value: 'Maui Health – Kaiser Permanente' },
        { name: 'Maui Health – Maui Memorial Medical Center', value: 'Maui Health – Maui Memorial Medical Center' },
        { name: 'Maui Lani Medical Office', value: 'Maui Lani Medical Office' },
        { name: 'Maui Medical Group', value: 'Maui Medical Group' },
        { name: 'Mauliola Pharmacy', value: 'Mauliola Pharmacy' },
        { name: 'Mililani Town Association', value: 'Mililani Town Association' },
        { name: 'Minit Medical', value: 'Minit Medical' },
        { name: 'Moloka‘i Community Health Center2', value: 'Moloka‘i Community Health Center2' },
        { name: 'Moloka‘i General Hospital', value: 'Moloka‘i General Hospital' },
        { name: 'On Lāna‘i - Lana‘i Community Health Center', value: 'On Lāna‘i - Lana‘i Community Health Center' },
        { name: 'On Lāna‘i - Lana‘i Community Hospital', value: 'On Lāna‘i - Lana‘i Community Hospital' },
        { name: 'Other', value: 'Other' },
        { name: 'Pahala  CVS/Long Drugs - Pikaka St', value: 'Pahala  CVS/Long Drugs - Pikaka St' },
        { name: 'Pahoa - CVS/Long Drugs', value: 'Pahoa - CVS/Long Drugs' },
        { name: 'Queen’s Health Systems', value: 'Queen’s Health Systems' },
        { name: 'Queen’s North Hawai‘i Community Hospital', value: 'Queen’s North Hawai‘i Community Hospital' },
        { name: 'Safeway (Albertsons)', value: 'Safeway (Albertsons)' },
        { name: 'Sam’s Club', value: 'Sam’s Club' },
        { name: 'Shiigi Drug', value: 'Shiigi Drug' },
        { name: 'Times Pharmacy', value: 'Times Pharmacy' },
        { name: 'University of Hawaii, Maui College', value: 'University of Hawaii, Maui College' },
        { name: 'Veterans Affairs', value: 'Veterans Affairs' },
        { name: 'Wailuku - Malama I Ke Ola Health Center', value: 'Wailuku - Malama I Ke Ola Health Center' },
        { name: 'Wailuku - Safeway Pharmacy ', value: 'Wailuku - Safeway Pharmacy ' },
        { name: 'Walgreens', value: 'Walgreens' },
        { name: 'Walmart', value: 'Walmart' },
        { name: 'Windward POD at Windward Community College', value: 'Windward POD at Windward Community College' },
        ];
        this.orgOptions = this.orgs.map((x) => x.name);
        // console.log('this.org options:', this.orgOptions);
        this.subscribeValueChanges();
        // this.initGroupedForm();

        this.stripeTest = this.fb.group({
            stripe_firstName: ['', [Validators.required]],
            stripe_lastName: ['', [Validators.required]],
            stripe_amount: ['', [Validators.required]],
            stripe_city: ['', [Validators.required]],
            stripe_state: ['', [Validators.required]],
            stripe_zipcode: ['', [Validators.required]],
            stripe_address1: ['', [Validators.required]]
        });
    }

    confirm2() {
        this.confirmationService.confirm({
            message: `You have selected <b>${this.patientForm.get('orgName').value.name}</b> which is linked with "HumanAPI" portal.<br><br>
			<b>Do you have an account for "HumanAPI" ?</b>`,
            header: 'HumanAPI account confirmation',
            icon: 'pi pi-info-circle',
            accept: () => {
                console.log("in accept")
                this.messageSeverity = 'success'
                this.messageContent = `Please keep the credentials handy. You will be prompted to input the credentials shortly. Thank You.`;
                // this.messageService.add({severity:'success', summary:'Please keep the credentials handy. You will be asking for it shortly.', detail:'Thank you !'});
                // this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
            },
            reject: (type) => {
                let content = `Click &nbsp; <a href='https://www.timespharmacyhawaii.com/' target="_blank" class="link_class">here</a> &nbsp; to create an account for HumanAPI and keep the credentials handy. You will be prompted to input the credentials shortly. Thank You.`
                switch (type) {
                    case ConfirmEventType.REJECT:
                        console.log("in reject")
                        this.messageSeverity = 'info'
                        this.messageContent = content;
                        // this.messageService.add({ severity: 'error', summary: `Click <a href='www.google.com' target="_blank">here</a> to create an account for HumanAPI and keep the credentials handy. You will be asking for it shortly.`, detail: 'Thank you !' });
                        // this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
                        break;
                    case ConfirmEventType.CANCEL:
                        console.log("in cancel")
                        this.messageSeverity = 'info'
                        this.messageContent = content;
                        // this.messageService.add({ severity: 'error', summary: `Click <a href='www.google.com' target="_blank">here</a> to create an account for HumanAPI and keep the credentials handy. You will be asking for it shortly.`, detail: `Click <a href='www.google.com' target="_blank">here</a> to create an account for HumanAPI and keep the credentials handy. You will be asking for it shortly.` });
                        // this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
                        break;
                }
            }
        });
    }

    showDialog() {
        this.display = true;
        setTimeout(() => {
            this.initiateStripe();
        }, 500);

    }

    initiateStripe() {
        this.stripeService.elements(this.elementsOptions)
            .subscribe((elements: any) => {
                this.elements = elements;
                // Only mount the element the first time
                if (!this.card1) {
                    var elementStyles = {
                        base: {
                            color: '#3F4254',
                            fontWeight: 600,
                            fontFamily: 'Quicksand, Open Sans, Segoe UI, sans-serif',
                            fontSize: '16px',
                            fontSmoothing: 'antialiased',

                            ':focus': {
                                color: '#424770',
                            },

                            '::placeholder': {
                                color: '#9BACC8',
                            },

                            ':focus::placeholder': {
                                color: '#CFD7DF',
                            },
                        },
                        invalid: {
                            //color: '#3F4254',
                            ':focus': {
                                color: '#FA755A',
                            },
                            '::placeholder': {
                                color: '#FFCCA5',
                            },
                        },
                    };

                    var elementClasses = {
                        focus: 'focused',
                        empty: 'empty',
                        invalid: 'invalid',
                      };
                      
                    // this.card1 = elements.create('card');

                    this.creditCard = elements.create('cardNumber', {
                        style: elementStyles,
                        classes: elementClasses,
                    });
                    this.creditCard.mount('#example2-card-number');

                    this.expiry = elements.create('cardExpiry', {
                        style: elementStyles,
                        classes: elementClasses,
                    });
                    this.expiry.mount('#example2-card-expiry');

                    this.cvv = elements.create('cardCvc', {
                        style: elementStyles,
                        classes: elementClasses,
                        type: 'password'
                    });
                    this.cvv.mount('#example2-card-cvc');
                    this.cd.markForCheck();
                }
            });
    }

    // buy(){
    //     this.stripeData = this.stripeTest.value;
    //     const name = this.stripeTest.get('name').value;
    //     this.stripeService.createToken(this.card1, {name}).subscribe((result: any) =>{
    //         if(result.token) {
    //             this.stripeData['token'] = result.token;
    //             this.dataService.stripePament(this.stripeData).subscribe((res) => {
    //                 //if susscess
    //                 //else error
    //             })
    //         }
    //     })
    // }

    buy() {
        const name = this.stripeTest.get('stripe_firstName').value + " " + this.stripeTest.get('stripe_lastName').value;
        console.log('this.card1:', this.card1)
        this.stripeService
            .createToken(this.creditCard, { name })
            .subscribe(result => {
                if (result.token) {
                    // Use the token to create a charge or a customer
                    // https://stripe.com/docs/charges
                    console.log(result.token.id);
                } else if (result.error) {
                    // Error creating the token
                    console.log(result.error.message);
                }
            });
    }
    changeGuidMe() {
        this.shepherdService.start();
    }

    updateSingleField(prop: any, control: any): void {
        this[prop] = this[control].value;
    }


    cancelSingleField(prop: string, control: any): void {
        (this[control] as AbstractControl).setValue(this[prop]);
    }

    // initGroupedForm(): void {
    //     this.groupedForm = new FormGroup({
    //         name: new FormControl(this.identity.name),
    //         city: new FormControl(this.identity.city),
    //         country: new FormControl(this.identity.country),
    //     });
    // }

    updateGroupedEdition(): void {
        this.identity = this.groupedForm.value;
    }

    cancelGroupedEdition(): void {
        this.groupedForm.setValue(this.identity);
    }

    handleModeChange(mode: 'view' | 'edit'): void {
        this.mode = mode;
    }

    filterOrg(event) {
        const filtered: any[] = [];
        const query = event.query.toLowerCase();
        for (let i = 0; i < this.orgs.length; i++) {
            const org = this.orgs[i];
            if (org.name.toLowerCase().indexOf(query) > -1) {
                filtered.push(org);
            }
        }
        this.filteredOrgs = filtered;
    }

    onStateChange(event) {
        console.log('event-->', event);

        // TODO isHawaiiState =true;
    }

    public triggerSnapshot(): void {
        this.trigger.next();
    }
    public get triggerObservable(): Observable<void> {
        return this.trigger.asObservable();
    }
    public handleImage(webcamImage: WebcamImage): void {
        console.info('received webcam image', webcamImage);
        this.webcamImage = webcamImage;
        this.cd.markForCheck();
    }
    ngAfterViewInit(): void {
        this.shepherdService.defaultStepOptions = defaultStepOptions;
        this.shepherdService.modal = true;
        this.shepherdService.confirmCancel = false;
        this.shepherdService.addSteps(defaultSteps);
        this.shepherdService.start();

        // Initialize form wizard
        const wizard = new KTWizard(this.el.nativeElement, {
            startStep: 1
        });

        // var wizardEl = document.querySelector('#wizard');
        var prevButton = document.querySelector('[data-wizard-type="action-prev"]');
        prevButton.addEventListener('click', (wizardObj: any) => {
            // Go back to the previouse step
            if (this.changeStep === 2) {
                this.patientForm.get('firstName').setValue(this.firstInputText ? this.firstInputText : this.patientForm.get('firstName').value);
                this.patientForm.get('lastName').setValue(this.lastInputText ? this.lastInputText : this.patientForm.get('lastName').value);

                // this.patientForm.get('orgName').setValue(this.firstClinicName ? { name: this.firstClinicName, value: this.firstClinicName } : this.patientForm.get('orgName').value);
            }

            // wizard.goPrev();
        });
        // Validation before going to next page

        wizard.on('beforeNext', (wizardObj) => {
            console.log('before next', this.patientForm.value)
            this.isFormSubmitted = true;
            console.log('wizard obj in before next:', wizardObj, wizardObj.getStep());
            if (wizardObj.currentStep === 1) {
                this.stepOne = true;
                this.stepTwo = false;
                this.patientForm.get('firstName').setValidators([Validators.required, Validators.pattern('^[ A-Za-z-.,]*$')]);
                this.patientForm.get('lastName').setValidators(Validators.required);
                this.patientForm.get('dob').setValidators(Validators.required);
                this.patientForm.get('email').setValidators([Validators.required, Validators.email]);
                this.patientForm.get('gender').setValidators(Validators.required);
                this.patientForm.get('address1').setValidators(Validators.required);
                this.patientForm.get('city').setValidators(Validators.required);
                this.patientForm.get('state').setValidators(Validators.required);
                this.patientForm.get('zipcode').setValidators([Validators.required, Validators.pattern('^\\d{5}(?:\\-\\d{4})?$')]);
                this.patientForm.get('contactNumber').setValidators([Validators.required, Validators.minLength(10), Validators.maxLength(10)]);
                this.patientForm.get('contactOption').setValidators(Validators.required);

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

                this.patientForm.get('orgContactNumber').clearValidators();
                this.patientForm.get('orgContactNumber').setValidators(null);
                this.patientForm.get('orgContactNumber').setErrors(null);

                this.patientForm.get('orgZipcode').clearValidators();
                this.patientForm.get('orgZipcode').setValidators(null);
                this.patientForm.get('orgZipcode').setErrors(null);

                this.patientForm.get('orgManufacturer').clearValidators();
                this.patientForm.get('orgManufacturer').setValidators(null);
                this.patientForm.get('orgManufacturer').setErrors(null);

                this.patientForm.get('orgDose1').clearValidators();
                this.patientForm.get('orgDose1').setValidators(null);
                this.patientForm.get('orgDose1').setErrors(null);

                this.patientForm.get('orgDose2').clearValidators();
                this.patientForm.get('orgDose2').setValidators(null);
                this.patientForm.get('orgDose2').setErrors(null);

                // if (wizardObj.currentStep === 2) {
                // if (!this.lastInputText && !this.firstInputText) {
                this.lastInputText = this.patientForm.get('lastName').value;
                this.lastNameInputControl.setValue(this.lastInputText);

                this.firstInputText = this.patientForm.get('firstName').value;
                this.firstNameInputControl.setValue(this.firstInputText);

                // } else {
                //     this.patientForm.get('firstName').setValue(this.firstInputText);
                //     this.patientForm.get('lastName').setValue(this.lastInputText);
                // }

                // }

            } else if (wizardObj.currentStep === 2) {
                this.stepOne = false;
                this.stepTwo = true;
                // this.patientForm.get('orgName').setValidators(this.patientForm.get('resedenceItem').value === 'YES' ? Validators.required : null);
                this.patientForm.get('orgName').setValidators(Validators.required);
                this.patientForm.get('orgName').updateValueAndValidity({ emitEvent: false, onlySelf: true });
                this.patientForm.get('orgAddress1').setValidators(Validators.required);
                this.patientForm.get('orgAddress1').updateValueAndValidity();
                this.patientForm.get('orgCity').setValidators(Validators.required);
                this.patientForm.get('orgCity').updateValueAndValidity();
                this.patientForm.get('orgEmail').setValidators(Validators.email);
                this.patientForm.get('orgEmail').updateValueAndValidity();
                this.patientForm.get('orgState').setValidators(Validators.required);
                this.patientForm.get('orgState').updateValueAndValidity();
                this.patientForm.get('orgContactNumber').setValidators(Validators.required);
                this.patientForm.get('orgContactNumber').updateValueAndValidity();
                this.patientForm.get('orgZipcode').setValidators([Validators.required, Validators.pattern('^\\d{5}(?:\\-\\d{4})?$')]);
                this.patientForm.get('orgZipcode').updateValueAndValidity();

                this.patientForm.get('orgManufacturer').setValidators(Validators.required);
                this.patientForm.get('orgManufacturer').updateValueAndValidity();

                this.patientForm.get('orgDose1').setValidators(Validators.required);
                this.patientForm.get('orgDose1').updateValueAndValidity();

                this.patientForm.get('orgDose2').setValidators((this.patientForm.get('orgManufacturer').value && this.patientForm.get('orgManufacturer').value != 'Johnson \& Johnson') ? Validators.required : null);
                this.patientForm.get('orgDose2').updateValueAndValidity();

                this.firstClinicName = this.firstClinicName ? this.firstClinicName : (this.patientForm.get('orgDose1').value ? this.patientForm.get('orgName').value.name : '');
                this.firstClinicNameInputControl.setValue(this.firstClinicName);

                this.secondClinicName = this.secondClinicName ? this.secondClinicName : (this.patientForm.get('orgDose2').value ? this.patientForm.get('orgName').value.name : '');
                this.secondClinicNameInputControl.setValue(this.secondClinicName);
                // const orgName = this.patientForm.get('orgName').value;
                // if (!orgName || orgName.toUpperCase().includes('QUEENS')){
                //     this.submitButton = 'Submit'
                // } else if(orgName.toUpperCase() === ('TIMES PHARMACY')) {
                //     this.submitButton = 'Start Verification'
                // } else this.submitButton = `Verify with ${orgName}`
            } else if (wizardObj.currentStep === 3) {
                this.showWebcam = false;
                // this.consentNotChecked == true;
                if (!this.firstInputText || !this.lastInputText || !this.firstClinicName || !this.consent 
                    || (this.patientForm.get('orgDose2').value && !this.secondClinicName)
                    || ((!this.webcamImage && !this.imageSrc ))) {
                    this.consentNotChecked = true;
                    wizardObj.stop();
                    this.cd.markForCheck();
                    return;
                }
                // if (this.consent === false) {
                //     this.consentNotChecked = true;
                //     wizardObj.stop();
                //     this.cd.markForCheck();
                //     return;
                // }
            }
            this.consentNotChecked = false;
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
            console.log('Change', this.patientForm.value)
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
            if (wizardObj.currentStep === 3) {

                this.doseReceived = this.patientForm.get('orgDose2').value ? 2 : 1
                this.seriesComplete = (this.patientForm.get('orgManufacturer').value !== 'Johnson \& Johnson' && this.doseReceived === 2) ? 'YES' : 'NO';
                const doseDate = this.patientForm.get('orgDose2').value ? this.patientForm.get('orgDose2').value : this.patientForm.get('orgDose1').value;
                let effectiveAddDays = 0;
                let expirationAddDays = 0;
                if (this.patientForm.get('orgManufacturer').value === 'Johnson \& Johnson') {
                    effectiveAddDays = 10;
                    expirationAddDays = 70;
                } else if (this.patientForm.get('orgManufacturer').value !== 'Johnson \& Johnson') {
                    effectiveAddDays = 10;
                    expirationAddDays = 70;
                } else {
                    effectiveAddDays = 10;
                    expirationAddDays = 70;
                }
                // console.log('10 days', moment(doseDate, 'YYYY-MM-DD').add(10, 'days'))
                // console.log('10 weeks', moment(doseDate, 'YYYY-MM-DD').add(10, 'weeks'))
                this.effectiveDate = this.addDays(moment(doseDate, 'YYYY-MM-DD').toDate(), effectiveAddDays);
                this.expirationDate = this.addDays(moment(this.effectiveDate, 'YYYY-MM-DD').toDate(), expirationAddDays);

                this.imageToTextResponse = {} as IImageToText;

                this.imageToTextResponse.firstDoseDate = this.patientForm.get('orgDose1').value ? moment(this.patientForm.get('orgDose1').value, 'YYYY-MM-DD').toDate() : null;
                this.imageToTextResponse.secondDoseDate = this.patientForm.get('orgDose2').value ? moment(this.patientForm.get('orgDose2').value, 'YYYY-MM-DD').toDate() : null;

                this.imageToTextResponse.firstDose = this.patientForm.get('orgManufacturer').value;
                this.imageToTextResponse.secondDose = this.patientForm.get('orgManufacturer').value;
            }
            if (wizardObj.currentStep === 4) {
                this.patientForm.get('firstName').setValue(this.firstInputText ? this.firstInputText : this.patientForm.get('firstName').value);
                this.patientForm.get('lastName').setValue(this.lastInputText ? this.lastInputText : this.patientForm.get('lastName').value);
                // this.patientForm.get('orgName').setValue(this.firstClinicName ? { name: this.firstClinicName, value: this.firstClinicName } : this.patientForm.get('orgName').value);
            }
            this.cd.markForCheck();
        });
    }

    subscribeValueChanges() {
        this.patientForm.get('state').valueChanges.subscribe(selectedValue => {
            console.log('firstname value changed');
            console.log(selectedValue);                              // latest value of firstname
            if (selectedValue !== 'HI') {
                this.patientForm.get('resedenceItem').setValue('');
                this.patientForm.get('resedenceItem').clearValidators();
                this.patientForm.get('resedenceItem').setValidators(null);
                this.patientForm.get('resedenceItem').setErrors(null);
                this.patientForm.get('resedenceItem').updateValueAndValidity();

                this.patientForm.get('islandItem').setValue('');
                this.patientForm.get('islandItem').clearValidators();
                this.patientForm.get('islandItem').setValidators(null);
                this.patientForm.get('islandItem').setErrors(null);
                this.patientForm.get('islandItem').updateValueAndValidity();

                this.patientForm.get('travelDateToHawaii').setValue('');
                this.patientForm.get('travelDateToHawaii').clearValidators();
                this.patientForm.get('travelDateToHawaii').setValidators(null);
                this.patientForm.get('travelDateToHawaii').setErrors(null);
                this.patientForm.get('travelDateToHawaii').updateValueAndValidity();

                // this.patientForm.get('orgName').clearValidators();
                // this.patientForm.get('orgName').setValidators(null);
                // this.patientForm.get('orgName').setErrors(null);
                // this.patientForm.get('orgName').updateValueAndValidity();
            } else {
                this.patientForm.get('resedenceItem').setValidators(Validators.required);
                this.patientForm.get('resedenceItem').updateValueAndValidity();

                this.patientForm.get('islandItem').setValidators(Validators.required);
                this.patientForm.get('islandItem').updateValueAndValidity();

                this.patientForm.get('travelDateToHawaii').setValidators(Validators.required);
                this.patientForm.get('travelDateToHawaii').updateValueAndValidity();

                // this.patientForm.get('orgName').setValidators(Validators.required);
                // this.patientForm.get('orgName').updateValueAndValidity();
            }
            this.patientForm.updateValueAndValidity();
        });

        this.patientForm.get('orgManufacturer').valueChanges.subscribe(selectedValue => {
            if (selectedValue == 'Johnson \& Johnson' || !selectedValue) {
                this.patientForm.controls.orgDose2.setValue(null);
                this.patientForm.controls.orgDose2.setErrors(null);
                this.patientForm.controls.orgDose2.setValidators(null);
                this.patientForm.controls.orgDose2.updateValueAndValidity();
            } else {
                this.patientForm.get('orgDose2').setValidators(Validators.required);
                this.patientForm.get('orgDose2').updateValueAndValidity();
            }
        });

        this.patientForm.get('orgName').valueChanges.subscribe((selectedValue: any) => {
            this.messageSeverity = '';
            this.messageContent = ''
            if (!selectedValue || selectedValue.value.toUpperCase().includes('HPH')) {
                this.submitButton = { id: 1, value: 'Submit' }
            } else if (selectedValue.value.toUpperCase() === ('TIMES PHARMACY')) {
                this.submitButton = { id: 2, value: 'Start Verification' }
            } else this.submitButton = { id: 3, value: `Verify with ${selectedValue.value}` }

            if (this.submitButton.id === 2) {
                this.confirm2();
            }
        });

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

    isControlHasError(controlName: string, validationType: string): boolean {
        const control = this.patientForm.controls[controlName];
        if (!control) {
            return false;
        }

        const result = control.hasError(validationType) && (control.dirty || control.touched);
        return result;
    }
    isFutureDate(controlName: string): boolean {
        return this.patientForm.controls[controlName].value > new Date();
    }
    isgreatedThan(controlName: string, compareCtrlName: string): boolean {
        return this.patientForm.controls[controlName].value < this.patientForm.controls[compareCtrlName].value;
    }
    isMinimumGap(controlName: string, compareCtrlName: string): boolean {
        if (this.patientForm.get('orgManufacturer').value === 'Moderna') {
            this.gapDays = 26;
        } else if (this.patientForm.get('orgManufacturer').value === 'Pfizer') {
            this.gapDays = 20;
        }
        // console.log('moment:', moment(this.patientForm.get('orgDose1').value, 'YYYY-MM-DD'))
        // console.log('moment:', moment(this.patientForm.get('orgDose1').value).add(this.gapDays, 'day'))
        console.log('moment add days:', this.addDays(moment(this.patientForm.get('orgDose1').value, 'YYYY-MM-DD').toDate(), this.gapDays))
        return this.patientForm.controls[controlName].value < this.addDays(moment(this.patientForm.controls[compareCtrlName].value, 'YYYY-MM-DD').toDate(), this.gapDays);
    }

    addDays(date: Date, days: number): Date {
        date.setDate(date.getDate() + days);
        return date;
    }

    onFileSelect(event) {
        console.log(event.target.files);
        this.selectedFiles = event.target.files;
        const reader = new FileReader();
        reader.onload = e => {
            console.log('reader.result-->', reader.result);
            this.imageSrc = reader.result;
            this.cd.markForCheck();
            console.log('imageSrc-->', this.imageSrc);
            // tslint:disable-next-line: no-string-literal
            document.getElementById('img_preview')['src'] = reader.result;
        };
        reader.readAsDataURL(event.target.files[0]);
        // this.selectedFiles.source = window.URL.createObjectURL(event.target.files[0]);
    }
    // tslint:disable-next-line: indent
    onSubmit() {
        // var cardNumberEle : any = document.querySelector('[data-elements-stable-field-name="cardNumber"]');
        // console.log('card number ele', cardNumberEle)
        // console.log('card number:', cardNumberEle.defaultValue)
        this.submitted = true;
        // this.showDialog();
        // this.stripeTest.controls.stripe_firstName.setValue(this.patientForm.controls.firstName.value)
        // this.stripeTest.controls.stripe_lastName.setValue(this.patientForm.controls.lastName.value)
        // this.stripeTest.controls.stripe_address1.setValue(this.patientForm.controls.address1.value)
        // this.stripeTest.controls.stripe_city.setValue(this.patientForm.controls.city.value)
        // this.stripeTest.controls.stripe_state.setValue(this.patientForm.controls.state.value)
        // this.stripeTest.controls.stripe_zipcode.setValue(this.patientForm.controls.zipcode.value)
        // console.log('stripe console:', this.stripeTest.value)
        // this.stripeTest.updateValueAndValidity();

        let navigationExtras: NavigationExtras = {
            queryParams: this.patientForm.value
        };
        this.router.navigate(["payment"], navigationExtras);

        // this.router.navigateByUrl('/dashboard'); 
    }
    dataURLtoFile(dataurl, filename) {

        let arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, { type: mime });
    }
    uploadSnapshot(isFromFile = true) {
        const formData = new FormData();
        const file = isFromFile ? this.selectedFiles[0] : this.dataURLtoFile(this.webcamImage.imageAsDataUrl, 'temp.jpeg');
        formData.append('snapshot', file);
        const url = `${BASE_URL}/snapshot/upload`;
        this.http.post(url, formData)
            .subscribe((success: any) => {
                console.log(success);
                this.imageToTextResponse = success.text.responseObj as IImageToText;
                // this.lastInputText = this.imageToTextResponse.lastName;
                // this.lastNameInputControl.setValue(this.lastInputText);

                // this.firstInputText = this.imageToTextResponse.firstName;
                // this.firstNameInputControl.setValue(this.firstInputText);

                // this.firstClinicName = this.imageToTextResponse.firstClinicName;
                // this.firstClinicNameInputControl.setValue(this.firstClinicName);

                // this.secondClinicName = this.imageToTextResponse.secondClinicName;
                // this.secondClinicNameInputControl.setValue(this.secondClinicName);
            }, (error) => {
                console.log('err-->', error);
            });


    }
    onTabChanged(event) {
        console.log(event);
        this.tabIndex = event.index;
    }

    toggleWebCam(e) {
        if (e.keyCode === 13) {
            return;
        }
        this.showWebcam = !this.showWebcam;
    }

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
