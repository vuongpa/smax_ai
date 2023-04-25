import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  sidebars = [
    {
      link: '/',
      name: 'Đơn hàng',
      icon: 'https://smax.sale/assets/images/icon-order-active.svg',
      isActive: true
    },
    {
      link: '/status',
      name: 'Trạng thái',
      icon: 'https://smax.sale/assets/images/icon-order-active.svg',
      isActive: false
    },
    {
      link: '/tag',
      name: 'Tag',
      icon: 'https://smax.sale/assets/images/icon-order-active.svg',
      isActive: false
    },
  ]
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.changeRoute();
  }
  changeRoute() {
    this.activeSidebar(this.router.url);
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log('event.url', event.url);
        this.activeSidebar(event.url);
      }
    });
  }
  activeSidebar(url: string) {
    console.log('url', url);
    url = url.replace(/\?.*/, "")
    this.sidebars = this.sidebars.map(side => {
      side.isActive = side.link === url ? true : false;
      return side;
    })
    console.log('url', url);

  }

}
