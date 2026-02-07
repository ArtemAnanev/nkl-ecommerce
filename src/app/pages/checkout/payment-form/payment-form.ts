import {Component} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {ViewPanel} from '../../../directives/view-panel';

@Component({
  selector: 'app-payment-form',
  imports: [MatIcon, MatRadioGroup, MatRadioButton, ViewPanel],
  template: `
    <div appViewPanel>
      <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
        <mat-icon>payment</mat-icon>
        Payment Options
      </h2>
      <div>
        <mat-radio-group [value]="'stripe'">
          <mat-radio-button value="stripe">
            <img src="images/spb-logo.svg" alt="Stripe" class="h-6"/>
          </mat-radio-button>
        </mat-radio-group>
      </div>
    </div>
  `,
  styles: ``,
})
export class PaymentForm {

}
