import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit {
  sidebars = [
    {
      link: "/",
      icon: "assets/svgs/ai-face.svg",
      iconActive: "assets/svgs/ai-face_active.svg",
      isActive: true
    },
    {
      link: "/flow",
      icon: "assets/svgs/flow.svg",
      iconActive: "assets/svgs/flow_active.svg",
      isActive: false
    },
    {
      link: "/friend",
      icon: "assets/svgs/friend.svg",
      iconActive: "assets/svgs/friend_active.svg",
      isActive: false
    },
    {
      link: "/analyst",
      icon: "assets/svgs/chart.svg",
      iconActive: "assets/svgs/chart_active.svg",
      isActive: false
    },
    {
      link: "/settings",
      icon: "assets/svgs/settings.svg",
      iconActive: "assets/svgs/settings_active.svg",
      isActive: false
    }
  ];

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    this.changeRoute();
  }

  changeRoute() {
    this.activeSidebar(this.router.url);
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activeSidebar(event.url);
      }
    });
  }

  activeSidebar(url: string) {
    url = url.replace(/\?.*/, "");
    this.sidebars = this.sidebars.map((side) => {
      side.isActive = side.link === url ? true : false;
      return side;
    });
  }
}
