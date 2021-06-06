import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import * as HumanConnect from 'humanapi-connect-client';
import { environment } from '../../../../environments/environment';
import { WizardService } from '../wizard/wizard2/wizard.service';
@Component({
  selector: 'kt-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss'],
  providers: [WizardService]
})
export class SuccessComponent implements OnInit {

  constructor(private cd: ChangeDetectorRef, private wizardService: WizardService) { }

  token = '';
  connectClosed = false;
  buttonHumanFlg = false;
  button = 'Please wait...';
  isLoading = true;
  ngOnInit(): void {
    const travelerData = JSON.parse(localStorage.getItem('travelerData'));
    console.log('travel data:', travelerData);
    this.buttonHumanFlg = travelerData.orgName.type.toUpperCase() === 'HAPI' ? true : false;

    if (!this.token && this.buttonHumanFlg) {
      this.fetchToken();
    }
    if (HumanConnect) {
      HumanConnect.on('connect', response => {
        // this.connectClosed = true;
        // this.cd.markForCheck();
        console.log('response connect:', response);
      });
      HumanConnect.on('disconnect', response => {
        this.connectClosed = true;
        this.cd.markForCheck();
        console.log('response disconnect:', response);
      });
      HumanConnect.on('close', response => {
        this.connectClosed = true;
        this.cd.markForCheck();
        console.log('response close:', response);
      });
    }
  }

  fetchToken() {
    // create an XHR object
    this.token = '';

    this.wizardService.createToken().subscribe((resp: any) => {
      if (resp.error) {
        this.wizardService.createAccessToken().subscribe((res: any) => {
          console.log('response from create access token:', res);
          this.token = res.id_token;
          setTimeout(() => {
            const event = document.createEvent('Event');
            event.initEvent('load', true, true);
            window.dispatchEvent(event);
          }, 0);
          this.isLoading = false;
          this.button = 'Connect your Health Data';
          this.cd.markForCheck();
        },
          error => {
            console.log('some error');
          });
      } else {
        this.token = resp.session_token;
        setTimeout(() => {
          const event = document.createEvent('Event');
          event.initEvent('load', true, true);
          window.dispatchEvent(event);
        }, 0);
        this.isLoading = false;
        this.button = 'Connect your Health Data';
        this.cd.markForCheck();
      }
      console.log('token:', this.token);
    },
      error => {
        console.log('Some error');
      });
    // const xhr = new XMLHttpRequest();
    // xhr.onload = () => {
    //   const resp = JSON.parse(xhr.response);
    //   if (xhr.status === 200) {
    //     if (resp.error) {
    //       console.log('in resp.error:', resp);
    //       this.wizardService.createAccessToken().subscribe((res: any) => {
    //         console.log('response from create access token:', res);
    //         this.token = res.accessToken;
    //         this.cd.markForCheck();
    //       });
    //     } else {
    //       this.token = resp.session_token ? resp.session_token : '';
    //       console.log('token:', this.token);
    //       this.cd.markForCheck();
    //     }
    //   } else {
    //     console.error('Error!');
    //   }
    //   this.isLoading = false;
    //   this.button = 'Connect your Health Data';
    // };
    // xhr.open('POST', environment.api_url + '/humanapi/create-token');
    // xhr.send();
  }

}
