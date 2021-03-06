// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PartialsModule } from '../../partials/partials.module';
import { CoreModule } from '../../../core/core.module';
import { FailureComponent } from './failure.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
@NgModule({
	declarations: [FailureComponent],
	imports: [
		CommonModule,
		PartialsModule,
		CoreModule,
		CardModule,
		ButtonModule,
		RouterModule.forChild([
			{
				path: '',
				component: FailureComponent,
			},
		]),
	],
})
export class FailureModule {
}
