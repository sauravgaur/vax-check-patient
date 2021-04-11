import { BaseModel } from '../../_base/crud';

export class Course extends BaseModel {
  coursesName: any;
  coursesCode: any;
  pendingAction: any;
  totalIssued: any;
  lastUpdated: any;  

  clear(): void {
    this.coursesCode = '';
    this.coursesName = '';
    this.pendingAction = '';
    this.totalIssued = '';
    this.lastUpdated = '';
  }
}
