import { Component, OnInit } from '@angular/core';
import { NbMenuItem, NbMenuService } from '@nebular/theme';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
    items: NbMenuItem[] = [
        {
            title: 'Dashboard',
            expanded: false,
            link: '/dashboard'
        },
        {
          title: 'Products',
          expanded: false,
          children: [
              {
                  title: 'Manage Products',
                  link: 'manage-products'
              }
          ]
        },
        {
            title: 'Product Donations',
            expanded: false,
            children: [
                {
                    title: 'Add Product Donation',
                    link: 'product-donation/add'
                },
                {
                    title: 'Product Donation History',
                    link: 'product-donation/history'
                }
            ]
          },
          {
            title: 'Product Requests',
            expanded: false,
            children: [
                {
                    title: 'Add Product Request',
                    link: 'product-requests/add'
                },
                {
                    title: 'Product Request History',
                    link: 'product-requests/history'
                }
            ]
          },
    ];

  constructor(private menuService: NbMenuService, private router: Router) {
  }

  ngOnInit(): void {}

}
