// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload.component';
import { FileUploadModule } from 'ng2-file-upload';
import {BadgeModule} from 'primeng/badge';
@NgModule({
  declarations: [
    FileUploadComponent,
  ],
  exports: [
    FileUploadComponent
  ],
  imports: [
    CommonModule,
    FileUploadModule,
    BadgeModule
  ],
  providers: []
})
export class CustomFileUploadModule {
}
