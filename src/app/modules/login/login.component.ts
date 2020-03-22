import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import messages from 'src/app/core/messages/error-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formStatus = true;
  signUpForm: FormGroup;
  signInForm: FormGroup;
  httpErrorMessage: string = '';
  constructor(private router: Router, private fb: FormBuilder) { }

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
      password: ['', [Validators.required]]
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
     this.router.navigate(['/dashboard']);
  }

  signUp() {

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
