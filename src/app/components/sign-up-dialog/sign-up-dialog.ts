import {Component, inject} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MAT_DIALOG_DATA, MatDialog, MatDialogClose, MatDialogRef} from '@angular/material/dialog';
import {MatFormField, MatInput, MatPrefix} from '@angular/material/input';
import {NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton, MatIconButton} from '@angular/material/button';
import {EcommerceStore} from '../../ecommerce-store';
import {SignUpParams} from '../../models/user';
import {SignInDialog} from '../sign-in-dialog/sign-in-dialog';

@Component({
  selector: 'app-sign-up-dialog',
  imports: [MatIconButton, MatIcon, MatDialogClose, MatFormField, MatInput, MatPrefix, MatButton, ReactiveFormsModule],
  template: `
    <div class="p-8 min-w-[400px] flex flex-col">
      <div class="flex justify-between">
        <div>
          <h2 class="text-xl font-medium mb-1">Sign up</h2>
          <p class="text-sm text-gray-500">Join us and start shopping today</p>
        </div>
        <button tabindex="-1" matIconButton class="-mt-2 -mr-2" mat-dialog-close>
          <mat-icon>close</mat-icon>
        </button>
      </div>
      <form [formGroup]="signUpForm" class="mt-6 flex flex-col" (ngSubmit)="signUp()">
        <mat-form-field class="mb-4">
          <input matInput formControlName="name" type="text" placeholder="Enter your name"/>
          <mat-icon matPrefix>person</mat-icon>
        </mat-form-field>
        <mat-form-field class="mb-4">
          <input matInput formControlName="email" type="email" placeholder="Enter your email"/>
          <mat-icon matPrefix>email</mat-icon>
        </mat-form-field>
        <mat-form-field class="mb-4">
          <input matInput formControlName="password" type="password" placeholder="Enter your password"/>
          <mat-icon matPrefix>lock</mat-icon>
        </mat-form-field>
        <mat-form-field class="mb-6">
          <input matInput formControlName="confirmPassword" type="password" placeholder="Enter your name"/>
          <mat-icon matPrefix>person</mat-icon>
        </mat-form-field>
        <button
          type="submit"
          matButton="filled"
          class="w-full">
          <!--          [disabled]="store.loading()"-->

          Create account
          <!--          {{ store.loading() ? 'Creating account...' : 'Account created' }}-->
        </button>
      </form>
    </div>
  `,
  styles: ``,
})
export class SignUpDialog {
  fb = inject(NonNullableFormBuilder)
  store = inject(EcommerceStore)
  dialogRef = inject(MatDialogRef)
  matDialog = inject(MatDialog)
  data = inject<{ checkout: boolean }>(MAT_DIALOG_DATA)

  signUpForm = this.fb.group({
    name: ['John D', Validators.required],
    email: ['johnd@test.com', Validators.required],
    password: ['johnd@test.com', Validators.required],
    confirmPassword: ['johnd@test.com', Validators.required],
  })

  signUp() {
    if (!this.signUpForm.valid) {
      this.signUpForm.markAllAsTouched();
      return;
    }
    const {name, email, password} = this.signUpForm.value
    this.store.signUp({
      name,
      email,
      password,
      dialogId: this.dialogRef.id,
      checkout: this.data?.checkout
    } as SignUpParams);
  }

  openSignInDialog() {
    this.dialogRef.close()
    this.matDialog.open(SignInDialog, {
      disableClose: true,
      data: {
        checkout: this.data?.checkout,
      }
    })
  }

}
