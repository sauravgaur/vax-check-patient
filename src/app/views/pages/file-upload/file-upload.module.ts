// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload.component';
import { FileUploadModule } from 'ng2-file-upload';

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
  ],
  providers: []
})
export class CustomFileUploadModule {
}
