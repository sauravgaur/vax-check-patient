// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PartialsModule } from '../../partials/partials.module';
import { CoreModule } from '../../../core/core.module';
import { WizardComponent } from './wizard.component';
import { Wizard2Component } from './wizard2/wizard2.component';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { InlineSVGModule } from 'ng-inline-svg';

import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { CalendarModule } from 'primeng/calendar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { MultiSelectModule } from 'primeng/multiselect';
import { ChipsModule } from 'primeng/chips';
import { WebcamModule } from 'ngx-webcam';
import { MatTabsModule } from '@angular/material/tabs';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { EditableModule } from '@ngneat/edit-in-place';
import { TooltipModule } from 'ng2-tooltip-directive';
import { FieldsetModule } from 'primeng/fieldset';
import { DividerModule } from 'primeng/divider';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { MatButtonModule } from '@angular/material/button';
import { CheckboxModule } from 'primeng/checkbox';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DialogModule } from 'primeng/dialog';
// import { NgxStripeModule } from 'ngx-stripe';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { TravelerInfoComponent } from './wizard2/traveler.info.component';
import { VaccinatorComponent } from './wizard2/vaccinator.component';
import { UploadCardComponent } from './wizard2/upload.card.component';
import { CustomFileUploadModule } from '../file-upload/file-upload.module';
import { EditorModule } from 'primeng/editor';
import { KeyFilterModule } from 'primeng/keyfilter';
import { CustomFileUpload1Module } from '../file-upload copy/file-upload1.module';
import { SafePipe } from '../../../core/_base/layout';
import { TitleCasePipe } from '@angular/common';
import {ProgressBarModule} from 'primeng/progressbar';
@NgModule({
	declarations: [
		WizardComponent,
		Wizard2Component,
		TravelerInfoComponent,
		VaccinatorComponent,
		UploadCardComponent,
		// SafePipe
	],
	imports: [
		CommonModule,
		WebcamModule,
		FormsModule,
		ReactiveFormsModule,
		PartialsModule,
		CoreModule,
		RouterModule.forChild([
			{
				path: '',
				component: Wizard2Component
				// component: WizardComponent,
				// children: [
				// 	{
				// 		path: 'registration',
				// 		component: Wizard2Component,
				// 	}
				// ],
			},
		]),
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
		ConfirmDialogModule,
		MessagesModule,
		MessageModule,
		CustomFileUploadModule,
		CustomFileUpload1Module,
		EditorModule,
		KeyFilterModule,
		ProgressBarModule
		// NgxStripeModule.forChild('pk_test_aeUUjYYcx4XNfKVW60pmHTtI')
	],
	providers: [TitleCasePipe]
})
export class WizardModule {
}
