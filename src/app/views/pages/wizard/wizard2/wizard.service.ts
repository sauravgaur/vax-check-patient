// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// RxJS
import { Observable, BehaviorSubject } from 'rxjs';
// CRUD
import { HttpUtilsService, QueryParamsModel, QueryResultsModel } from '../../../../core/_base/crud';
import { environment } from '../../../../../environments/environment';
// Models

// Real REST API
@Injectable()
export class WizardService {

  constructor(private http: HttpClient, private httpUtils: HttpUtilsService) {
  }

  // CREATE =>  POST: add a new product to the server
  registerTraveller(data): Observable<any> {
    const API_REGISTER_TRAVELER_URL = `${environment.api_url}/batch/patient-vax`;
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    return this.http.post<any>(API_REGISTER_TRAVELER_URL, data, { headers: httpHeaders });
  }

}
