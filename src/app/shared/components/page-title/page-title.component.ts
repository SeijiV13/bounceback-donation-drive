import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.scss']
})
export class PageTitleComponent implements OnInit {
  faFolder = faFolder;
  titleMaps = [
    {
      title: 'Dashboard',
      link: '/dashboard'
    },
    {
      title: 'Manage Products',
      link: '/dashboard/manage-products',
    },
    {
      title: 'Add Product Donation',
      link: '/dashboard/product-donation/add',
    },
    {
      title: 'Product Donation History',
      link: '/dashboard/product-donation/history',
    },
    {
      title: 'Add Product Request',
      link: '/dashboard/product-requests/add',
    },
    {
      title: 'Product Request History',
      link: '/dashboard/product-requests/history',
    },
  ];
  title: string;
  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.cd.detectChanges();
  }

}
