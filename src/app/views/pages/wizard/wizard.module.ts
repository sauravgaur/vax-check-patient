// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// Metronic
import { PartialsModule } from '../../partials/partials.module';
import { CoreModule } from '../../../core/core.module';
import { WizardComponent } from './wizard.component';
import { Wizard2Component } from './wizard2/wizard2.component';

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
import {WebcamModule} from 'ngx-webcam';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
	declarations: [
		WizardComponent,
		Wizard2Component,
	],
	imports: [
		CommonModule,
		WebcamModule,
		FormsModule,
		PartialsModule,
		CoreModule,
		RouterModule.forChild([
			{
				path: '',
				component: WizardComponent,
				children: [
					{
						path: 'request-report',
						component: Wizard2Component,
					}
				],
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
		MatTabsModule
	],
})
export class WizardModule {
}
