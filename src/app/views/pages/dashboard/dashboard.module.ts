// Angular
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule, NgbTabsetModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
// Core Module
import { CoreModule } from '../../../core/core.module';
import { PartialsModule } from '../../partials/partials.module';
import { DashboardComponent } from './dashboard.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { InlineSVGModule } from 'ng-inline-svg';

import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {CardModule} from 'primeng/card';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ButtonModule} from 'primeng/button';
import {InputMaskModule} from 'primeng/inputmask';
import {CalendarModule} from 'primeng/calendar';
import {SelectButtonModule} from 'primeng/selectbutton';
import {MultiSelectModule} from 'primeng/multiselect';
import {ChipsModule} from 'primeng/chips';
import { MatTabsModule } from '@angular/material/tabs';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { EditableModule } from '@ngneat/edit-in-place';
import { TooltipModule } from 'ng2-tooltip-directive';
import {FieldsetModule} from 'primeng/fieldset';
import {DividerModule} from 'primeng/divider';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { MatButtonModule } from '@angular/material/button';
import {CheckboxModule} from 'primeng/checkbox';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {DialogModule} from 'primeng/dialog';
import { StripeComponent } from './stripe.component';
import { MatDialogModule } from '@angular/material/dialog';
@NgModule({
  imports: [
    CommonModule,
    PartialsModule,
    CoreModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent
      },
    ]),
    // ng-bootstrap modules
    NgbDropdownModule,
    NgbTabsetModule,
    NgbTooltipModule,
    FormsModule,
		ReactiveFormsModule,
    MatSelectModule,
		MatInputModule,
		InlineSVGModule,
		InputTextModule,
		DropdownModule,
		CardModule,
		InputTextareaModule,
		ButtonModule,
		InputMaskModule,
		CalendarModule,
		SelectButtonModule,
		MultiSelectModule,
		ChipsModule,
		MatTabsModule,
		AutoCompleteModule,
		EditableModule,
		TooltipModule,
		FieldsetModule,
		DividerModule,
		MatFileUploadModule,
		MatButtonModule,
		CheckboxModule,
		MatCheckboxModule,
		DialogModule,
		MatDialogModule
  ],
  providers: [],
  declarations: [
    DashboardComponent, StripeComponent
  ],
  entryComponents: [StripeComponent]
})
export class DashboardModule {
}
