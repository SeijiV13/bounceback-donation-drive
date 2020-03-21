import { PageTitleComponent } from './../../shared/components/page-title/page-title.component';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';
import { Router, NavigationEnd } from '@angular/router';
import { faList } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  faList = faList;
  @ViewChild('pageTitle') pageTitle: PageTitleComponent;
  
  constructor(private sidebarService: NbSidebarService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
       const titleObject =   this.pageTitle.titleMaps.find((data) => data.link === event.url); 
       this.pageTitle.title = titleObject.title;
      }
    });
  }

  ngAfterViewInit() {
    const title =   this.pageTitle.titleMaps.find((data) => data.link === this.router.url);
    this.pageTitle.title = title.title;
  }

  toggle() {
    this.sidebarService.toggle();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);

  }

}
