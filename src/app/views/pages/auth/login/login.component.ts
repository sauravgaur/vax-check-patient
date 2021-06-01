// Angular
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// RxJS
import { Observable, Subject } from 'rxjs';
import { finalize, takeUntil, tap } from 'rxjs/operators';
// Translate
import { TranslateService } from '@ngx-translate/core';
// Store
import { Store } from '@ngrx/store';
import { AppState } from '../../../../core/reducers';
// Auth
import { AuthNoticeService, AuthService, Login } from '../../../../core/auth';
import { WizardService } from '../../wizard/wizard2/wizard.service';
import Utils from '../../../../../app/utils';
import { IDateProperties } from '../../../../interface/date.properties';
import { IProfile, ITravelerExists, IVaccinations, LOCAL_STORAGE_KEYS } from '../../../../interface/record.interface';
import { IPatientAddress } from '../../../../interface/record.interface';
import { EmpData } from '../../../../../app/employee-data';
import moment from 'moment';
/**
 * ! Just example => Should be removed in development
 */
const DEMO_PARAMS = {
	EMAIL: 'admin@demo.com',
	PASSWORD: 'demo'
};

@Component({
	selector: 'kt-login',
	templateUrl: './login.component.html',
	encapsulation: ViewEncapsulation.None,
	providers: [WizardService]
})
export class LoginComponent implements OnInit, OnDestroy {
	// Public params
	loginForm: FormGroup;
	loading = false;
	isLoggedIn$: Observable<boolean>;
	errors: any = [];
	message = '';
	type = '';
	private unsubscribe: Subject<any>;

	private returnUrl: any;

	corporateForm: FormGroup;
	mailFormat = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
	errorUtils = Utils;
	isSubmitted = false;
	buttonLabel = 'Login';
	dateProperties: IDateProperties;
	tooltipJson: any = {
		contactNumber: 'Prefered mobile phone number',
		resedenceItem: 'Are you a permanent Hawaii resident?',
		orgName: `Who organized the vaccination?<br> Type at least 1 alphabet.`,
		orgAddress1: 'Address of the Organization',
		takeSnapShot: 'Take a picture of you vaccination card',
		travelDateToHawaii: 'Trip date in Safe Travels'
	};
	empData: any;

	// Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

	/**
	 * Component constructor
	 *
	 * @param router: Router
	 * @param auth: AuthService
	 * @param authNoticeService: AuthNoticeService
	 * @param translate: TranslateService
	 * @param store: Store<AppState>
	 * @param fb: FormBuilder
	 * @param cdr
	 * @param route
	 */
	constructor(
		private router: Router,
		private auth: AuthService,
		private authNoticeService: AuthNoticeService,
		private translate: TranslateService,
		private store: Store<AppState>,
		private fb: FormBuilder,
		private cdr: ChangeDetectorRef,
		private route: ActivatedRoute,
		private fb1: FormBuilder, private wizardService: WizardService,
		private empConstants: EmpData
	) {
		this.unsubscribe = new Subject();
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit(): void {
		this.initLoginForm();
		this.empData = this.empConstants.JSON_DATA;
		this.dateProperties = {
			dateFormat: 'mm-dd-yy',
			maxDate: new Date(),
			minDate: Utils.addDays(new Date(), 1),
			yearRange: `1930:${new Date().getFullYear()}`
		};

		this.corporateForm = this.fb1.group({
			firstName: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[ A-Za-z-.,]*$')])),
			middleName: new FormControl('', Validators.pattern('^[ A-Za-z-.,]*$')),
			lastName: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[ A-Za-z-.,]*$')])),
			dob: new FormControl('', Validators.required),
			email: new FormControl('', Validators.compose([Validators.required, Validators.pattern(this.mailFormat)])),
			contactNumber: new FormControl('',
				Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])),
			corporateId: new FormControl('', Validators.required)
		});

		// redirect back to the returnUrl before login
		this.route.queryParams.subscribe(params => {
			this.returnUrl = params.returnUrl || '/traveler/registration';
		});
	}

	/**
	 * On destroy
	 */
	ngOnDestroy(): void {
		this.authNoticeService.setNotice(null);
		this.unsubscribe.next();
		this.unsubscribe.complete();
		this.loading = false;
	}

	/**
	 * Form initalization
	 * Default params, validators
	 */
	initLoginForm() {
		// demo message to show
		if (!this.authNoticeService.onNoticeChanged$.getValue()) {
			const initialNotice = `Use account
			<strong>${DEMO_PARAMS.EMAIL}</strong> and password
			<strong>${DEMO_PARAMS.PASSWORD}</strong> to continue.`;
			// this.authNoticeService.setNotice(initialNotice, 'info');
		}

		this.loginForm = this.fb.group({
			email: [DEMO_PARAMS.EMAIL, Validators.compose([
				Validators.required,
				Validators.email,
				Validators.minLength(3),
				Validators.maxLength(320) // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
			])
			],
			password: [DEMO_PARAMS.PASSWORD, Validators.compose([
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(100)
			])
			]
		});
	}

	/**
	 * Form Submit
	 */
	submit() {
		const controls = this.loginForm.controls;
		/** check form */
		if (this.loginForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}

		this.loading = true;

		const authData = {
			email: controls.email.value,
			password: controls.password.value
		};
		this.auth
			.login(authData.email, authData.password)
			.pipe(
				tap(user => {
					if (user) {
						this.store.dispatch(new Login({ authToken: user.accessToken }));
						this.router.navigateByUrl(this.returnUrl); // Main page
					} else {
						this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.INVALID_LOGIN'), 'danger');
					}
				}),
				takeUntil(this.unsubscribe),
				finalize(() => {
					this.loading = false;
					this.cdr.markForCheck();
				})
			)
			.subscribe();
	}

	async onSubmit() {
		// this.authNoticeService.setNotice('');
		this.message = '';
		this.type = '';
		if (this.corporateForm.valid) {
			localStorage.removeItem(LOCAL_STORAGE_KEYS[LOCAL_STORAGE_KEYS.LOGIN_FORM_DATA]);
			localStorage.removeItem(LOCAL_STORAGE_KEYS[LOCAL_STORAGE_KEYS.LOGIN_RESPONSE_DATA]);
			this.isSubmitted = true;
			this.buttonLabel = 'Logging In';
			const formObj = {
				firstName: this.corporateForm.get('firstName').value,
				lastName: this.corporateForm.get('lastName').value,
				middleName: this.corporateForm.get('middleName').value,
				dateOfBirth: Utils.formatToUSStandared(this.corporateForm.get('dob').value),
				contactNumber: this.corporateForm.get('contactNumber').value,
				email: this.corporateForm.get('email').value
			};
			localStorage.setItem(LOCAL_STORAGE_KEYS[LOCAL_STORAGE_KEYS.LOGIN_FORM_DATA], JSON.stringify(this.corporateForm.value));
			console.log('Utils.formatToUSStandared(x.dateOfBirth):', formObj.dateOfBirth);
			const findEmp = this.empData.find((x: any) => formObj.firstName == x.firstName && formObj.lastName == x.lastName
				&& formObj.dateOfBirth == Utils.formatToUSStandared(x.dateOfBirth)
				&& formObj.contactNumber == x.contactNumber
				&& formObj.email == x.email);
			if (findEmp) {
				const address: IPatientAddress = {
					street_address: findEmp.address1,
					street_address2: findEmp.address2,
					state: findEmp.state,
					zip_code: findEmp.zipcode,
					city: findEmp.city
				};

				const profiles: IProfile = {
					name: {
						first_name: findEmp.firstName,
						middle_name: findEmp.middleName ? findEmp.middleName : this.corporateForm.get('middleName').value,
						last_name: findEmp.lastName
					},
					sex: findEmp.gender,
					email_address: findEmp.email,
					date_of_birth: moment(findEmp.dateOfBirth, 'MM-DD-YYYY').format('YYYY-MM-DD'),
					access_code: this.corporateForm.get('corporateId').value,
					address, mobile_number: findEmp.contactNumber,
					mobile_number2: findEmp.contactNumber2
				};
				localStorage.setItem(LOCAL_STORAGE_KEYS[LOCAL_STORAGE_KEYS.LOGIN_RESPONSE_DATA], JSON.stringify({ profiles }));
				setTimeout(() => {
					this.router.navigateByUrl('/corporate/profile');
				}, 1000);
			} else {
				setTimeout(() => {
					this.message = 'Employee not found !';
					this.type = 'danger';
					this.isSubmitted = false;
					this.buttonLabel = 'Log In';
					this.cdr.markForCheck();
				}, 1000);
			}


			// this.wizardService.isExists(formObj).subscribe((res: ITravelerExists) => {
			// 	res.profile_skyflow_id = 'f4a90203-c091-11eb-afac-6e8fbbfa3e7b';
			// 	if (res.profile_skyflow_id) {
			// 		this.wizardService.patientById(res.profile_skyflow_id).subscribe((resp: any) => {
			// 			if (resp.records.length > 0) {
			// 				const profiles: IProfile = resp.records[0].profiles;
			// 				const vaccinations: IVaccinations = resp.records[0].vaccinations;
			// 				console.log('profile:', profiles);
			// 				console.log('vaccinations: ', vaccinations);
			// 				localStorage.setItem(LOCAL_STORAGE_KEYS[LOCAL_STORAGE_KEYS.LOGIN_RESPONSE_DATA], JSON.stringify({ profiles, vaccinations }));
			// 				this.router.navigateByUrl('/corporate/profile');
			// 			} else {
			// 				this.message = 'Employee exists, but details not found !';
			// 				this.type = 'danger';
			// 				this.isSubmitted = false;
			// 				this.buttonLabel = 'Log In';
			// 				this.cdr.markForCheck();
			// 			}
			// 		},
			// 			error => {
			// 				this.message = 'Something went wrong, please try again.';
			// 				this.type = 'danger';
			// 				this.isSubmitted = false;
			// 				this.buttonLabel = 'Log In';
			// 				this.cdr.markForCheck();
			// 			});
			// 	} else {
			// 		// this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.EMPLOYEE_NOT_FOUND'), 'danger');
			// 		this.message = 'Employee not found !';
			// 		this.type = 'danger';
			// 		this.isSubmitted = false;
			// 		this.buttonLabel = 'Log In';
			// 		this.cdr.markForCheck();
			// 	}
			// },
			// 	error => {
			// 		this.message = 'Something went wrong, please try again.';
			// 		this.type = 'danger';
			// 		this.isSubmitted = false;
			// 		this.buttonLabel = 'Log In';
			// 		this.cdr.markForCheck();
			// 	});
		}
	}

	/**
	 * Checking control validation
	 *
	 * @param controlName: string => Equals to formControlName
	 * @param validationType: string => Equals to valitors name
	 */
	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.loginForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}
}
