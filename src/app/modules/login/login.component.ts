import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../core/services/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import messages from 'src/app/core/messages/error-messages';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formStatus = true;
  signUpForm: FormGroup;
  signInForm: FormGroup;
  signInFormHasErrors = false;
  signUpFormHasErrors = false;
  httpErrorSignInMessage = '';
  httpErrorSignUpMessage = '';
  successRegisterMessage = '';
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private loaderService: NgxUiLoaderService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.listentActivePanel();
    this.initializeForm();
  }

  initializeForm() {
    this.signInForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
    this.signUpForm = this.fb.group({
      name: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      role: ['USER']
    });
  }


  listentActivePanel() {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    signUpButton.addEventListener('click', () => {
     container.classList.add('right-panel-active');
     });

    signInButton.addEventListener('click', () => {
      container.classList.remove('right-panel-active');
     });

  }

  signIn() {
    this.signInFormHasErrors = false;
    Object.keys(this.signInForm.controls).forEach((key) => {
    if (this.signInForm.controls[key].errors) {
      this.signInFormHasErrors = true;
      return;
     }
    });
    if (this.signInFormHasErrors) {
      this.signInForm.markAllAsTouched();
      this.toastrService.error('Form has errors', 'Error!', {positionClass: 'toast-top-center', closeButton: true});
      return;
    }
    const user = this.signInForm.getRawValue();
    this.loaderService.start();
    this.authService.signIn(user).subscribe((data) => {
         this.loaderService.stop();
         localStorage.setItem('token', data.jwt);
         localStorage.setItem('user', data.name);
         this.router.navigate(['/dashboard']);
      }, error => {
        if (error) {
          this.loaderService.stop();
          this.httpErrorSignInMessage = error.error.message;
          this.toastrService.error(this.httpErrorSignInMessage, 'Error!', {positionClass: 'toast-top-center', closeButton: true});
        }
    });
  }

  signUp() {
    this.signUpFormHasErrors = false;
    Object.keys(this.signUpForm.controls).forEach((key) => {
    if (this.signUpForm.controls[key].errors) {
      this.signUpFormHasErrors = true;
      return;
     }
    });
    if (this.signUpFormHasErrors) {
      this.toastrService.error('Form has errors', 'Error!', {positionClass: 'toast-top-center', closeButton: true});
      this.signUpForm.markAllAsTouched();
      return;
    }
    const user = this.signUpForm.getRawValue();
    this.authService.signUp(user).subscribe((data) => {
       const container = document.getElementById('container');
       container.classList.remove('right-panel-active');
       this.successRegisterMessage = 'You have successfully created your new account, you can now login here.';
       this.toastrService.success(this.successRegisterMessage, 'Success!', {positionClass: 'toast-top-center', closeButton: true});
       this.formStatus = true;
       this.signInForm.reset();
       this.signInFormHasErrors = false;
    }, error => {
      if (error) {
        this.httpErrorSignUpMessage = error.error.message;
        this.toastrService.error(this.httpErrorSignUpMessage, 'Error!', {positionClass: 'toast-top-center', closeButton: true});
      }
    });

  }

  toggleForm() {
    this.formStatus = !this.formStatus;
  }

  getSigninFormError(controlName) {
    if (this.signInForm.controls[controlName].errors) {
        const keys = Object.keys(this.signInForm.controls[controlName].errors);
        return messages[keys[0]];
      }
  }

  getSignUpFormError(controlName) {
    if (this.signUpForm.controls[controlName].errors) {
        const keys = Object.keys(this.signUpForm.controls[controlName].errors);
        return messages[keys[0]];
      }
  }

}
