import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import * as HumanConnect from "humanapi-connect-client";
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {

  constructor(private cd: ChangeDetectorRef) { }

  token = '';
  connectClosed = false;
  buttonHumanFlg = false;
  button = 'Please wait...';
  isLoading = true;
  ngOnInit(): void {
    const travelerData = JSON.parse(localStorage.getItem('travelerData'));
    console.log('travel data:', travelerData);
    this.buttonHumanFlg = travelerData.orgName.value.toUpperCase().includes('CVS') ? true : false;

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
    const xhr = new XMLHttpRequest();

    // listen for `onload` event
    xhr.onload = () => {
      let resp = JSON.parse(xhr.response);

      // process response
      if (xhr.status === 200) {
        // parse JSON data
        this.token = resp.session_token || resp;
        this.cd.markForCheck();

      } else {
        console.error('Error!');
      }
      this.isLoading = false;
      this.button = 'Connect your Health Data';
    };

    // create a `GET` request
    xhr.open('POST', environment.api_url1 + '/humanapi/create-token');

    // send request
    xhr.send();
  }

}
