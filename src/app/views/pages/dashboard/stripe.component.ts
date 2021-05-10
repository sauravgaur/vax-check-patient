import { Component, ElementRef, Inject, OnInit, ViewChild, ChangeDetectorRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import thId from "src/assets/plugins/formvalidation/src/js/validators/id/thId";
import Swal from "sweetalert2";

@Component({
    selector: 'kt-stripe',
    templateUrl: './stripe.component.html',
    // styleUrls: ['./stripe.component.css']
})
export class StripeComponent implements OnInit {

    form: FormGroup;
    // description: string;
    // @ViewChild(StripeCardComponent) card: StripeCardComponent;
    // @ViewChild('cardInfo') cardInfo: ElementRef;
    // elements: Elements;
    // card1: StripeElement;

    // stripeElement: StripeElement[] = [];
    // creditCard: StripeElement;
    // expiry: StripeElement;
    // cvv: StripeElement;

    // cardOptions: ElementOptions = {
    //     style: {
    //         base: {
    //             color: '#32325D',
    //             fontWeight: 500,
    //             fontFamily: 'Source Code Pro, Consolas, Menlo, monospace',
    //             fontSize: '16px',
    //             fontSmoothing: 'antialiased',

    //             '::placeholder': {
    //                 color: '#CFD7DF',
    //             },
    //             ':-webkit-autofill': {
    //                 color: '#e39f48',
    //             },
    //         },
    //         invalid: {
    //             color: '#E25950',

    //             '::placeholder': {
    //                 color: '#FFCCA5',
    //             },
    //         }
    //     }
    // };
    // elementsOptions: ElementsOptions = {
    //     locale: 'auto',
    //     fonts: [
    //         {
    //             cssSrc: 'https://fonts.googleapis.com/css?family=Source+Code+Pro',
    //         },
    //     ]
    // };

    stripeTest: FormGroup;
    // inputs: any;
    // error: any;
    // errorMessage: any;
    // creditErrorFlg: boolean = false;
    // expiryErrorFlg: boolean = false;
    // cvvErrorFlg: boolean = false;
    // data: any;
    constructor(
        private fb: FormBuilder,
        private cd: ChangeDetectorRef,
        private dialogRef: MatDialogRef<StripeComponent>,
        // private stripeService: StripeService,
        private router: Router,
        @Inject(MAT_DIALOG_DATA) params
        ) {
        // this.data = params;
    }

    ngOnInit() {

        var formClass = '.example2';
        var example = document.querySelector(formClass);

        var form = example.querySelector('form');
        var resetButton = example.querySelector('a.reset');
        // this.error = form.querySelector('.error');
        // this.errorMessage = this.error.querySelector('.message');

        // this.inputs = document.querySelectorAll('.cell.example.example2 .input');
        // Array.prototype.forEach.call(this.inputs, function (input) {
        //     input.addEventListener('focus', function () {
        //         input.classList.add('focused');
        //     });
        //     input.addEventListener('blur', function () {
        //         input.classList.remove('focused');
        //     });
        //     input.addEventListener('keyup', function () {
        //         if (input.value.length === 0) {
        //             input.classList.add('empty');
        //         } else {
        //             input.classList.remove('empty');
        //         }
        //     });
        // });
        this.stripeTest = this.fb.group({
            stripe_firstName: ['', [Validators.required]],
            stripe_lastName: ['', [Validators.required]],
            stripe_amount: ['', [Validators.required]],
            stripe_city: ['', [Validators.required]],
            stripe_state: ['', [Validators.required]],
            stripe_zipcode: ['', [Validators.required]],
            stripe_address1: ['', [Validators.required]]
        }); 

        // console.log("data in stripe component:", this.data)

        // this.stripeTest.controls.stripe_firstName.setValue(this.data.firstName)
        // this.stripeTest.controls.stripe_lastName.setValue(this.data.lastName)
        // this.stripeTest.controls.stripe_address1.setValue(this.data.address1)
        // this.stripeTest.controls.stripe_city.setValue(this.data.city)
        // this.stripeTest.controls.stripe_state.setValue(this.data.state)
        // this.stripeTest.controls.stripe_zipcode.setValue(this.data.zipcode)
        // this.initiateStripe();

    }

    // initiateStripe() {
    //     this.stripeService.elements(this.elementsOptions)
    //         .subscribe((elements: any) => {
    //             this.elements = elements;
    //             // Only mount the element the first time
    //             if (!this.card1) {
    //                 var elementStyles = {
    //                     base: {
    //                         color: '#3F4254',
    //                         fontWeight: 600,
    //                         fontFamily: 'Quicksand, Open Sans, Segoe UI, sans-serif',
    //                         fontSize: '16px',
    //                         fontSmoothing: 'antialiased',

    //                         ':focus': {
    //                             color: '#424770',
    //                         },

    //                         '::placeholder': {
    //                             color: '#9BACC8',
    //                         },

    //                         ':focus::placeholder': {
    //                             color: '#CFD7DF',
    //                         },
    //                     },
    //                     invalid: {
    //                         //color: '#3F4254',
    //                         ':focus': {
    //                             color: '#FA755A',
    //                         },
    //                         '::placeholder': {
    //                             color: '#FFCCA5',
    //                         },
    //                     },
    //                 };

    //                 var elementClasses = {
    //                     focus: 'focused',
    //                     empty: 'empty',
    //                     invalid: 'invalid',
    //                 };

    //                 this.creditCard = elements.create('cardNumber', {
    //                     style: elementStyles,
    //                     classes: elementClasses,
    //                 });
    //                 this.creditCard.mount('#example2-card-number');

    //                 this.expiry = elements.create('cardExpiry', {
    //                     style: elementStyles,
    //                     classes: elementClasses,
    //                 });
    //                 this.expiry.mount('#example2-card-expiry');

    //                 this.cvv = elements.create('cardCvc', {
    //                     style: elementStyles,
    //                     classes: elementClasses,
    //                     type: 'password'
    //                 });
    //                 this.cvv.mount('#example2-card-cvc');
    //                 this.stripeElement = [this.creditCard, this.expiry, this.cvv]

    //                 this.cd.markForCheck();
    //             }
    //         });
    // }

    // save() {
    //     this.dialogRef.close(this.form.value);
    // }

    // close() {
    //     this.dialogRef.close();
    // }

    buy() {
    //     this.error.classList.remove('visible');
    //     const name = this.stripeTest.get('stripe_firstName').value + " " + this.stripeTest.get('stripe_lastName').value;
    //     console.log('this.card1:', this.card1)
    //     this.stripeService
    //         .createToken(this.creditCard, { name })
    //         .subscribe(result => {
    //             if (result.token) {
    //                 // Use the token to create a charge or a customer
    //                 // https://stripe.com/docs/charges
    //                 console.log(result.token.id);
    //                 this.showMessage('Success');
    //             } else if (result.error) {
    //                 // Error creating the token
    //                 this.error.classList.add('visible');
    //                 this.errorMessage.innerText = result.error.message;
    //                 this.showMessage('Fail');
    //             } else {
    //                 this.error.classList.remove('visible');
    //                 this.showMessage('Fail');
    //             }
    //         });
    }

    // showMessage(val) {
    //     this.close();
    //     const swalWithBootstrapButtons = Swal.mixin({
    //         customClass: {
    //             confirmButton: 'btn btn-success',
    //         },
    //         buttonsStyling: false,
    //         allowOutsideClick: false,
    //         allowEscapeKey: false,
    //         showCloseButton: false,
    //         willClose: () => {
    //             this.router.navigateByUrl('/patient/request-report');
    //         }
    //     })
    //     if (val == 'Success') {
    //         swalWithBootstrapButtons.fire(
    //             'Payment successfull!',
    //             'Thank you.',
    //             'success'
    //         )
    //     } else {
    //         swalWithBootstrapButtons.fire(
    //             'Payment failed !',
    //             'Please come again after some time. Thank you.',
    //             'error'
    //         )
    //     }

    // }
}