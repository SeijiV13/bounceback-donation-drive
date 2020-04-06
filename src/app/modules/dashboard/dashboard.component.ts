import { AuthService } from './../../core/services/authentication.service';
import { PageTitleComponent } from './../../shared/components/page-title/page-title.component';
import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';
import { Router, NavigationEnd } from '@angular/router';
import { faList, faDonate } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  faList = faList;
  faDonate = faDonate;
  isLoggedIn = false;
  @ViewChild('pageTitle') pageTitle: PageTitleComponent;
  constructor(private sidebarService: NbSidebarService,
              private router: Router,
              private cd: ChangeDetectorRef, 
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.testJwt();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
       const titleObject =   this.pageTitle.titleMaps.find((data) => data.link === event.url); 
       this.pageTitle.title = titleObject.title;
       this.cd.detectChanges();
      }
    });
  }

  testJwt() {
    this.authService.testJwt().subscribe(() => {
      this.isLoggedIn = true;
    }, error => {
      this.isLoggedIn = false;
    });
  }

  getUser() {
    return localStorage.getItem('user') ? localStorage.getItem('user') : 'Guest User';
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
    this.router.navigate(['/login']);

  }

  login() {
    this.router.navigate(['login']);
  }

}
