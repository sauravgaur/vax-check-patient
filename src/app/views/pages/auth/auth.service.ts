// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// RxJS
import { Observable, BehaviorSubject } from 'rxjs';
// CRUD
import { HttpUtilsService, QueryParamsModel, QueryResultsModel } from '../../../core/_base/crud';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';
// Models
import { AppConstants } from '../../../app.constants';
import { ITravelerExists } from '../../../interface/record.interface';
// Real REST API
@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private httpUtils: HttpUtilsService, private constants: AppConstants) {
  }

  public sendOTP(data): Observable<ITravelerExists> {
    return this.http.post<any>(environment.api_url + this.constants.API_URI.LOGIN.SEND_OTP, data);
  }

  public verifyOTP(otp: string): Observable<ITravelerExists> {
    return this.http.post<any>(environment.api_url + this.constants.API_URI.LOGIN.VERIFY_OTP + otp, {});
  }

}
