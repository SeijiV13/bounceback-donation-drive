import { Component, OnInit } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private sidebarService: NbSidebarService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  toggle() {
    this.sidebarService.toggle();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);

  }

}
