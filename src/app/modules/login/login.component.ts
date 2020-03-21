import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formStatus = true;
  signUpForm: FormGroup;
  signInForm: FormGroup;
  constructor(private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.listentActivePanel();
    this.initializeForm();
  }

  initializeForm() {
    this.signInForm = this.fb.group({
      username: [''],
      password: ['']
    });
    this.signUpForm = this.fb.group({
      name: [''],
      username: [''],
      password: ['']
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

}
