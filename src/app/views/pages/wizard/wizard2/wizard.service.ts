// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// RxJS
import { Observable, BehaviorSubject } from 'rxjs';
// CRUD
import { HttpUtilsService, QueryParamsModel, QueryResultsModel } from '../../../../core/_base/crud';
import { environment } from '../../../../../environments/environment';
import { map } from 'rxjs/operators';
// Models
import { AppConstants } from '../../../../app.constants';
import { ITravelerExists } from '../../../../interface/record.interface';
// Real REST API
@Injectable()
export class WizardService {

  constructor(private http: HttpClient, private httpUtils: HttpUtilsService, private constants: AppConstants) {
  }

  // CREATE =>  POST: add a new product to the server
  registerTraveller(data): Observable<any> {
    const API_REGISTER_TRAVELER_URL = `${environment.api_url}/batch/patient-vax`;
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    return this.http.post<any>(API_REGISTER_TRAVELER_URL, data, { headers: httpHeaders });
  }

  public uploadFile(file, apiRoute, paramName): Observable<any> {
    const formData = new FormData();
    formData.append(paramName, file);
    return this.http.post<any>(environment.api_url + apiRoute, formData).pipe(map(res => res.msg === 'success' ? res.path : ''));
  }

  public isExists(formData: any): Observable<ITravelerExists> {
    return this.http.post<any>(environment.api_url + this.constants.API_URI.PAYMENT_STATUS, formData);
  }

  public patientById(patientId: string): Observable<ITravelerExists> {
    return this.http.get<any>(environment.api_url + this.constants.API_URI.PATIENT_BY_ID + '/' + patientId);
  }

  public createAccessToken(): Observable<ITravelerExists> {
    return this.http.post<any>(environment.api_url + this.constants.API_URI.HUMAN_API.CREATE_ACCESS_TOKEN, {});
  }

  public createToken(): Observable<ITravelerExists> {
    return this.http.post<any>(environment.api_url + this.constants.API_URI.HUMAN_API.CREATE_TOKEN, {});
  }

  public getOrgByState(stateId): Observable<ITravelerExists> {
    return this.http.get<any>(environment.api_url + this.constants.API_URI.ORG_BY_STATE + '/' + stateId);
  }

  // public uploadSupplementDoc(file): Observable<any> {
  //   const formData = new FormData();
  //   formData.append('supplementDoc', file);
  //   return this.http.post<any>('media/supplement-doc', formData).pipe(map(res => res.path));
  // }

}
