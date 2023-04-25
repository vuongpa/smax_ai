import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/api/auth.service';
import { UserService } from 'src/app/services/api/user.service';
import { Biz, User } from 'src/app/types/viewmodels';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user!: User;
  biz!: Biz;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.currentUser.subscribe({
      next: res => {
        if (res) {
          this.user = res;
        }
      }
    })
    this.authService.currentBiz.subscribe({
      next: res => {
        if (res) {
          this.biz = res;
        }
      }
    })
  }
  logout() {
    this.authService.logout();
    window.location.href = '/';
  }

}
