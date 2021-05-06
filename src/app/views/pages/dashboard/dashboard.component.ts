// Angular
import { Component, ElementRef, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StripeService, Elements, StripeCardComponent, Element as StripeElement, ElementsOptions, ElementOptions } from "ngx-stripe";
import {ActivatedRoute} from "@angular/router";
@Component({
  selector: 'kt-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChild(StripeCardComponent) card: StripeCardComponent;
  @ViewChild('cardInfo') cardInfo: ElementRef;
  elements: Elements;
  card1: StripeElement;

  stripeElement: StripeElement[] = [];
  creditCard: StripeElement;
  expiry: StripeElement;
  cvv: StripeElement;

  cardOptions: ElementOptions = {
    style: {
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
  constructor(private stripeService: StripeService,
    private fb: FormBuilder, private cd: ChangeDetectorRef,
    private route: ActivatedRoute) {
      this.stripeTest = this.fb.group({
        stripe_firstName: ['', [Validators.required]],
        stripe_lastName: ['', [Validators.required]],
        stripe_amount: ['', [Validators.required]],
        stripe_city: ['', [Validators.required]],
        stripe_state: ['', [Validators.required]],
        stripe_zipcode: ['', [Validators.required]],
        stripe_address1: ['', [Validators.required]]
      });

      this.route.queryParams.subscribe(params => {
        this.stripeTest.controls.stripe_firstName.setValue(params["firstName"])
        this.stripeTest.controls.stripe_lastName.setValue(params["lastName"])
        this.stripeTest.controls.stripe_address1.setValue(params["address1"])
        this.stripeTest.controls.stripe_city.setValue(params["city"])
        this.stripeTest.controls.stripe_state.setValue(params["state"])
        this.stripeTest.controls.stripe_zipcode.setValue(params["zipcode"])
    });
     }
  inputs: any;
  error: any;
  errorMessage: any;
  creditErrorFlg: boolean = false;
  expiryErrorFlg: boolean = false;
  cvvErrorFlg: boolean = false;
  ngOnInit(): void {
    var formClass = '.example2';
    var example = document.querySelector(formClass);

    var form = example.querySelector('form');
    var resetButton = example.querySelector('a.reset');
    this.error = form.querySelector('.error');
    this.errorMessage = this.error.querySelector('.message');

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

    this.initiateStripe();

      // this.stripeElement.forEach(function (element) {
        
      // });
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
          this.stripeElement = [this.creditCard, this.expiry, this.cvv]
          // this.stripeTest.controls.stripe_firstName.setValue('test')
          // this.stripeTest.controls.stripe_lastName.setValue('test')
          // this.stripeTest.controls.stripe_address1.setValue('test')
          // this.stripeTest.controls.stripe_city.setValue('test')
          // this.stripeTest.controls.stripe_state.setValue('test')
          // this.stripeTest.controls.stripe_zipcode.setValue('test')

          // this.creditCard.on('change', function (event) {
          //   console.log('event:', event)
          //   if (event.error) {
          //     this.error.classList.add('visible');
          //     this.errorMessage.innerText = event.error.message;
          //     this.creditErrorFlg = true;
          //   } else {
          //     this.creditErrorFlg = false;
          //     (!this.expiryErrorFlg && !this.cvvErrorFlg) ? this.error.classList.remove('visible'): '';
          //   }
          // });
  
          // this.expiry.on('change', function (event) {
          //   if (event.error) {
          //     this.error.classList.add('visible');
          //     this.errorMessage.innerText = event.error.message;
          //     this.expiryErrorFlg = true;
          //   } else {
          //     this.expiryErrorFlg = false;
          //     (!this.creditErrorFlg && !this.cvvErrorFlag) ? this.error.classList.remove('visible'): '';
          //   }
          // });
  
          // this.cvv.on('change', function (event) {
          //   if (event.error) {
          //     this.error.classList.add('visible');
          //     this.errorMessage.innerText = event.error.message;
          //     this.cvvErrorFlag = true;
          //   } else {
          //     this.cvvErrorFlag = false;
          //     (!this.expiryError && !this.creditErrorFlg) ? this.error.classList.remove('visible'): '';
          //   }
          // });

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
    this.error.classList.remove('visible');
    const name = this.stripeTest.get('stripe_firstName').value + " " + this.stripeTest.get('stripe_lastName').value;
    console.log('this.card1:', this.card1)
    this.stripeService
      .createToken(this.creditCard, { name })
      .subscribe(result => {
        if (result.token) {
          // Use the token to create a charge or a customer
          // https://stripe.com/docs/charges
          console.log(result.token.id);
          alert('Payment successfully done, Thank you!')
        } else if (result.error) {
          // Error creating the token
            this.error.classList.add('visible');
            this.errorMessage.innerText = result.error.message;
          } else {
            this.error.classList.remove('visible');
          }
      });
  }
}
