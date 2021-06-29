// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUpload1Component } from './file-upload1.component';
import { FileUploadModule } from 'ng2-file-upload';
import {BadgeModule} from 'primeng/badge';
@NgModule({
  declarations: [
    FileUpload1Component,
  ],
  exports: [
    FileUpload1Component
  ],
  imports: [
    CommonModule,
    FileUploadModule,
    BadgeModule
  ],
  providers: []
})
export class CustomFileUpload1Module {
}
