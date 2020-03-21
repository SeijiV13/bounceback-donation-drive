import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.listentActivePanel();
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

}
