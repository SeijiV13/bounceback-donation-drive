import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
    items: NbMenuItem[] = [
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

  constructor() {
  }

  ngOnInit(): void {
  }

}
