// Angular
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// RxJS
import { Observable, Subject, Subscription, timer } from 'rxjs';
import { finalize, takeUntil, tap } from 'rxjs/operators';
// Translate
import { TranslateService } from '@ngx-translate/core';
// Store
import { Store } from '@ngrx/store';
import { AppState } from '../../../../core/reducers';
// Auth
import { AuthNoticeService, AuthService, Login } from '../../../../core/auth';
import { IMedia, IProfile, ITravelerExists, IVaccinations, LOCAL_STORAGE_KEYS } from 'src/app/interface/record.interface';
import { WizardService } from '../../wizard/wizard2/wizard.service';

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
	providers: [AuthService, WizardService],
	encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit, OnDestroy {
	// Public params
	loginForm: FormGroup;
	loading = false;
	isLoggedIn$: Observable<boolean>;
	errors: any = [];
	countDown: Subscription;
	private unsubscribe: Subject<any>;

	private returnUrl: any;
	public otpSent = false;
	private resendOtp = false;
	// Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
	public counter = 30;
	loading1 = false;
	disableLogin = false;
	mailFormat = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$';
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
		private route: ActivatedRoute, private wizardService: WizardService
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
		localStorage.removeItem(LOCAL_STORAGE_KEYS[LOCAL_STORAGE_KEYS.LOGIN_RESPONSE_DATA]);
		// redirect back to the returnUrl before login
		this.route.queryParams.subscribe(params => {
			this.returnUrl = params.returnUrl || '/';
		});
	}

	changeCase() {
		this.loginForm.controls.email.setValue(this.loginForm.controls.email.value.toLowerCase());
	}

	/**
	 * On destroy
	 */
	ngOnDestroy(): void {
		this.authNoticeService.setNotice(null);
		this.unsubscribe.next();
		this.unsubscribe.complete();
		this.loading = false;
		this.countDown.unsubscribe();
		this.countDown = null;
	}

	/**
	 * Form initalization
	 * Default params, validators
	 */
	initLoginForm() {
		// demo message to show
		// if (!this.authNoticeService.onNoticeChanged$.getValue()) {
		// 	const initialNotice = `Use account
		// 	<strong>${DEMO_PARAMS.EMAIL}</strong> and password
		// 	<strong>${DEMO_PARAMS.PASSWORD}</strong> to continue.`;
		// 	this.authNoticeService.setNotice(initialNotice, 'info');
		// }

		this.loginForm = this.fb.group({
			email: ['', Validators.compose([
				Validators.required,
				Validators.pattern(this.mailFormat),
				Validators.minLength(3),
				Validators.maxLength(320) // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
			])
			],
			password: [DEMO_PARAMS.PASSWORD]
		});
	}

	/**
	 * Form Submit
	 */
	submit1() {
		this.authNoticeService.setNotice(null);
		const controls = this.loginForm.controls;
		/** check form */
		if (this.loginForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}

		this.loading1 = true;

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
					this.loading1 = false;
					this.cdr.markForCheck();
				})
			)
			.subscribe();
	}

	submit() {
		this.authNoticeService.setNotice(null);
		const controls = this.loginForm.controls;
		/** check form */
		if (this.loginForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}
		this.loading1 = true;
		this.disableLogin = true;
		this.auth.verifyOTP(this.loginForm.controls.password.value).subscribe((res: any) => {
			if (res.profiles_skyflow_id) {
				const travelerExists: ITravelerExists = res;
				this.wizardService.patientById(res.profiles_skyflow_id).subscribe((resp: any) => {
					if (resp.records.length > 0) {
						const profiles: IProfile = resp.records[0].profiles;
						const vaccinations: IVaccinations = resp.records[0].vaccinations;
						const media: IMedia = resp.records[0].media;
						localStorage.setItem(LOCAL_STORAGE_KEYS[LOCAL_STORAGE_KEYS.LOGIN_RESPONSE_DATA],
							JSON.stringify({ profiles, vaccinations, media, travelerExists }));
						this.loading1 = false;
						this.disableLogin = false;
						this.router.navigateByUrl('/corporate/profile');
					} else {
						this.authNoticeService.setNotice('Employee exists, but details not found !', 'danger');
						this.loading1 = false;
						this.disableLogin = false;
						this.cdr.markForCheck();
					}
				},
					error => {
						this.authNoticeService.setNotice('Something went wrong, please try again.', 'danger');
						this.loading1 = false;
						this.disableLogin = false;
						this.cdr.markForCheck();
					});
			} else {
				// this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.EMPLOYEE_NOT_FOUND'), 'danger');
				this.authNoticeService.setNotice('User not found !', 'danger');
				this.loading1 = false;
				this.disableLogin = false;
				this.cdr.markForCheck();
			}
		},
			error => {
				if (error.error && error.error.msg) {
					this.authNoticeService.setNotice(error.error.msg, 'danger');
				} else {
					this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.TRY_AGAIN'), 'danger');
				}
				this.loading1 = false;
				this.disableLogin = false;
				this.cdr.markForCheck();
			});


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

	sendOTP() {
		this.authNoticeService.setNotice(null);
		// this.loginForm.controls.email.setValue(this.loginForm.controls.email.value.toLowerCase());
		if (this.loginForm.valid) {
			this.loading = true;
			this.auth.sendOTP({ email_address: this.loginForm.controls.email.value, org_id: '7890' }).subscribe((data: any) => {
				this.otpSent = true;
				this.disableLogin = false;
				this.startCounter();
				this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.OTP_SENT'), 'info');
				this.updateValidation();
				this.loading = false;
				this.cdr.markForCheck();
			}, error => {
				if (error.error && error.error.msg) {
					this.authNoticeService.setNotice(error.error.msg, 'danger');
				} else {
					this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.TRY_AGAIN'), 'danger');
				}
				this.loading = false;
				this.cdr.markForCheck();
			})
			// if (this.loginForm.controls.email.value === 'admin@demo.com') {
			// 	this.otpSent = true;
			// 	this.disableLogin = false;
			// 	this.startCounter();
			// 	this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.OTP_SENT'), 'info');
			// 	this.updateValidation();
			// 	this.loading = false;
			// 	this.cdr.markForCheck();
			// } else {
			// 	this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.EMAIL_NOT_FOUND'), 'danger');
			// 	this.loading = false;
			// 	this.cdr.markForCheck();
			// }
		}
	}

	resedOTP() {
		this.loginForm.controls.password.setValue(null);
		this.loginForm.controls.password.markAsPristine();
		this.authNoticeService.setNotice(null);
		this.disableLogin = true;
		this.resendOtp = false;
		this.loading = true;
		this.cdr.markForCheck();
		// this.updateValidation();
		this.auth.sendOTP({ email_address: this.loginForm.controls.email.value, org_id: '7890' }).subscribe((data: any) => {
			this.resendOtp = true;
			this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.OTP_SENT'), 'info');
			// this.updateValidation();
			this.loading = false;
			this.disableLogin = false;
			this.startCounter();
			this.cdr.markForCheck();
		}, error => {
			if (error.error && error.error.msg) {
				this.authNoticeService.setNotice(error.error.msg, 'danger');
			} else {
				this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.TRY_AGAIN'), 'danger');
			}
			this.startCounter();

		});
	}

	resedOTP1() {
		this.disableLogin = true;
		this.resendOtp = false;
		this.loading = true;
		this.cdr.markForCheck();
		// this.updateValidation();
		setTimeout(() => {
			this.resendOtp = true;
			this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.OTP_SENT'), 'info');
			// this.updateValidation();
			this.loading = false;
			this.disableLogin = false;
			this.cdr.markForCheck();
		}, 2000);
		this.startCounter();
	}

	startCounter() {
		this.counter = 30;
		this.countDown = timer(0, 1000).subscribe(() => {
			if (this.counter === 0) {
				this.countDown.unsubscribe();
			} else {
				--this.counter;
				this.cdr.markForCheck();
			}
		});
	}
	updateValidation() {
		if (this.otpSent) {
			this.loginForm.controls.password.setValue(null);
			this.loginForm.controls.password.markAsPristine();
			this.loginForm.controls.password.setValidators(Validators.compose([
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(100)
			]));
		} else {
			this.loginForm.get('password').clearValidators();
			this.loginForm.get('password').setValidators(null);
			this.loginForm.get('password').setErrors(null);
		}
		this.loginForm.controls.password.updateValueAndValidity();
	}
}
