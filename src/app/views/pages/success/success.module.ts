// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// Metronic
import { PartialsModule } from '../../partials/partials.module';
import { CoreModule } from '../../../core/core.module';
import { SuccessComponent } from './success.component';
import {CardModule} from 'primeng/card';
import { ButtonModule } from 'primeng/button';
ButtonModule
@NgModule({
	declarations: [SuccessComponent],
	imports: [
		CommonModule,
		PartialsModule,
		CoreModule,
		CardModule,
		ButtonModule,
		RouterModule.forChild([
			{
				path: '',
				component: SuccessComponent,
			},
		]),
	],
})
export class SuccessModule {
}
