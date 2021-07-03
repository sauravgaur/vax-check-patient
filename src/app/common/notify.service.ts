import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class NotifyService {

    private showLoader = new Subject<boolean>();
    showLoader$ = this.showLoader.asObservable();

    constructor() { }

    setShowLoader(show: boolean) {
        this.showLoader.next(show);
    }

}
