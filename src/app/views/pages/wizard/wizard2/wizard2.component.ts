import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WebcamImage } from 'ngx-webcam';
import { MenuItem, SelectItem } from 'primeng/api';
import { Observable, Subject } from 'rxjs';

//label: 'Hispanic or Latino', value: '2186-5'

const BASE_URL='http://localhost:3000/api'
const STATES:SelectItem[]=[
  {
      "label":"Alabama",
      "value": "AL"
  },
  {
      "label":"Alaska",
      "value": "AK"
  },
  {
      "label":"American Samoa",
      "value": "AS"
  },
  {
      "label":"Arizona",
      "value": "AZ"
  },
  {
      "label":"Arkansas",
      "value": "AR"
  },
  {
      "label":"California",
      "value": "CA"
  },
  {
      "label":"Colorado",
      "value": "CO"
  },
  {
      "label":"Connecticut",
      "value": "CT"
  },
  {
      "label":"Delaware",
      "value": "DE"
  },
  {
      "label":"District Of Columbia",
      "value": "DC"
  },
  {
      "label":"Federated States Of Micronesia",
      "value": "FM"
  },
  {
      "label":"Florida",
      "value": "FL"
  },
  {
      "label":"Georgia",
      "value": "GA"
  },
  {
      "label":"Guam",
      "value": "GU"
  },
  {
      "label":"Hawaii",
      "value": "HI"
  },
  {
      "label":"Idaho",
      "value": "ID"
  },
  {
      "label":"Illinois",
      "value": "IL"
  },
  {
      "label":"Indiana",
      "value": "IN"
  },
  {
      "label":"Iowa",
      "value": "IA"
  },
  {
      "label":"Kansas",
      "value": "KS"
  },
  {
      "label":"Kentucky",
      "value": "KY"
  },
  {
      "label":"Louisiana",
      "value": "LA"
  },
  {
      "label":"Maine",
      "value": "ME"
  },
  {
      "label":"Marshall Islands",
      "value": "MH"
  },
  {
      "label":"Maryland",
      "value": "MD"
  },
  {
      "label":"Massachusetts",
      "value": "MA"
  },
  {
      "label":"Michigan",
      "value": "MI"
  },
  {
      "label":"Minnesota",
      "value": "MN"
  },
  {
      "label":"Mississippi",
      "value": "MS"
  },
  {
      "label":"Missouri",
      "value": "MO"
  },
  {
      "label":"Montana",
      "value": "MT"
  },
  {
      "label":"Nebraska",
      "value": "NE"
  },
  {
      "label":"Nevada",
      "value": "NV"
  },
  {
      "label":"New Hampshire",
      "value": "NH"
  },
  {
      "label":"New Jersey",
      "value": "NJ"
  },
  {
      "label":"New Mexico",
      "value": "NM"
  },
  {
      "label":"New York",
      "value": "NY"
  },
  {
      "label":"North Carolina",
      "value": "NC"
  },
  {
      "label":"North Dakota",
      "value": "ND"
  },
  {
      "label":"Northern Mariana Islands",
      "value": "MP"
  },
  {
      "label":"Ohio",
      "value": "OH"
  },
  {
      "label":"Oklahoma",
      "value": "OK"
  },
  {
      "label":"Oregon",
      "value": "OR"
  },
  {
      "label":"Palau",
      "value": "PW"
  },
  {
      "label":"Pennsylvania",
      "value": "PA"
  },
  {
      "label":"Puerto Rico",
      "value": "PR"
  },
  {
      "label":"Rhode Island",
      "value": "RI"
  },
  {
      "label":"South Carolina",
      "value": "SC"
  },
  {
      "label":"South Dakota",
      "value": "SD"
  },
  {
      "label":"Tennessee",
      "value": "TN"
  },
  {
      "label":"Texas",
      "value": "TX"
  },
  {
      "label":"Utah",
      "value": "UT"
  },
  {
      "label":"Vermont",
      "value": "VT"
  },
  {
      "label":"Virgin Islands",
      "value": "VI"
  },
  {
      "label":"Virginia",
      "value": "VA"
  },
  {
      "label":"Washington",
      "value": "WA"
  },
  {
      "label":"West Virginia",
      "value": "WV"
  },
  {
      "label":"Wisconsin",
      "value": "WI"
  },
  {
      "label":"Wyoming",
      "value": "WY"
  }
]
@Component({
  selector: 'kt-wizard2',
  templateUrl: './wizard2.component.html',
  styleUrls: ['./wizard2.component.scss']
})
export class Wizard2Component implements OnInit, AfterViewInit {

  @ViewChild('wizard', { static: true }) el: ElementRef;

  isHawaiiState:boolean=false
  tabIndex = 0;
  selectedFiles: any;
  stateList:SelectItem[]=STATES
  imageSrc: any;
  public webcamImage: WebcamImage = null;
  private trigger: Subject<void> = new Subject<void>();
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

  contact_item: SelectItem[]
  selectedConatctOption: any;

  resedence_item:SelectItem[]
  selectedresedenceOption: any;

  ndc_item: SelectItem[];
  selectedNDC: any;

  site_item: SelectItem[];
  selectedSite: any;

  states: any[] = []
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

  constructor(
    private cd:ChangeDetectorRef,
    private http:HttpClient
    ) {
  }

  // public capture() {
  //     var context = this.canvas.nativeElement.getContext("2d").drawImage(this.video.nativeElement, 0, 0, 640, 480);
  //     this.captures.push(this.canvas.nativeElement.toDataURL("image/png"));
  // }

  ngOnInit() {
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

    this.state_item = [{ label: 'State name 1', value: '1' },
    { label: 'State name 2', value: '2' },
    { label: 'State name 3', value: '3' }];

    this.city_item = [{ label: 'City name 1', value: '1' },
    { label: 'City name 2', value: '2' },
    { label: 'City name 3', value: '3' }];

    this.sex_item = [{ label: 'Male', value: 'M' },
    { label: 'Female', value: 'F' },
    { label: 'Unknown', value: 'U' }];

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
  }

  onStateChange(event){
    console.log('event-->',event);

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
  }
  ngAfterViewInit(): void {

    // Initialize form wizard
    const wizard = new KTWizard(this.el.nativeElement, {
      startStep: 1
    });

    // Validation before going to next page
    wizard.on('beforeNext', (wizardObj) => {
      // https://angular.io/guide/forms
      // https://angular.io/guide/form-validation

      // validate the form and use below function to stop the wizard's step
      // wizardObj.stop();
    });

    // Change event
    wizard.on('change', (wizardObj) => {
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
    });
  }

  onFileSelect(event) {
    console.log(event.target.files);
    this.selectedFiles = event.target.files;
    const reader = new FileReader();
    reader.onload = e => {
      console.log('reader.result-->', reader.result);
      this.imageSrc = reader.result;
      console.log('imageSrc-->', this.imageSrc);
      // tslint:disable-next-line: no-string-literal
      document.getElementById('img_preview')['src'] = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
    // this.selectedFiles.source = window.URL.createObjectURL(event.target.files[0]);
  }
  // tslint:disable-next-line: indent
  onSubmit() {
    this.submitted = true;
  }
  dataURLtoFile(dataurl, filename) {
 
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
        
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    
    return new File([u8arr], filename, {type:mime});
}
  uploadSnapshot(isFromFile=true){
    let formData = new FormData();
    let file=isFromFile?this.selectedFiles[0]:this.dataURLtoFile(this.webcamImage.imageAsDataUrl,"temp.jpeg") 
    formData.append('snapshot',file)
    let url=`${BASE_URL}/snapshot/upload`
    this.http.post(url,formData)
    .subscribe((success)=>{
        console.log(success)
    },(error)=>{
        console.log("err-->",error);
    })
  }
  onTabChanged(event){
    console.log(event);
    this.tabIndex = event.index;
  }
}
