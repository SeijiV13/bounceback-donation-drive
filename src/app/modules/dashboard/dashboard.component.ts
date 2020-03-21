import { Component, OnInit } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private sidebarService: NbSidebarService) {
  }

  ngOnInit(): void {
  }

  toggle() {
    this.sidebarService.toggle();
  }

}
