// Angular
import { Component, ElementRef, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { StripeService, Elements, StripeCardComponent, Element as StripeElement, ElementsOptions, ElementOptions } from "ngx-stripe";
import { ActivatedRoute } from "@angular/router";
import Swal from 'sweetalert2';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
// import { StripeComponent } from './stripe.component';

@Component({
  selector: 'kt-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  
  constructor(
    // private stripeService: StripeService,
    private fb: FormBuilder, private cd: ChangeDetectorRef,
    private route: ActivatedRoute, private dialog: MatDialog) {
    
    // this.showPayment();
  }
  
  ngOnInit(): void {
    setTimeout(() => {
      this.route.queryParams.subscribe(params => {
        // this.stripeTest.controls.stripe_firstName.setValue(params["firstName"])
        // this.stripeTest.controls.stripe_lastName.setValue(params["lastName"])
        // this.stripeTest.controls.stripe_address1.setValue(params["address1"])
        // this.stripeTest.controls.stripe_city.setValue(params["city"])
        // this.stripeTest.controls.stripe_state.setValue(params["state"])
        // this.stripeTest.controls.stripe_zipcode.setValue(params["zipcode"])
        this.openDialog(params);
      });
    }, 500);



    // this.stripeElement.forEach(function (element) {

    // });
  }

  openDialog(params) {
    console.log('params', params)
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = false;
    dialogConfig.data = params
    dialogConfig.width = '50%'
    // this.dialog.open(StripeComponent, dialogConfig);
}

  showPayment() {
    Swal.fire({
      title: '<strong>Secure Payment</strong>',
      width: '50%',
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      showClass: {
        popup: 'swal2-noanimation',
        backdrop: 'swal2-noanimation'
      },
      html:
        ``,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText:
        '<i class="fa fa-thumbs-up"></i> Great!',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      cancelButtonText:
        '<i class="fa fa-thumbs-down"></i>',
      cancelButtonAriaLabel: 'Thumbs down'
    })
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

}
