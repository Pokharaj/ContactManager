import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  isDarkTheme = false;
  mediaMatcher: MediaQueryList;

  users: Observable<User[]>;

  @ViewChild(MatSidenav) sidenav: MatSidenav;

  constructor(zone: NgZone,
              private userService: UserService,
              private router: Router) {
      zone.run(() => this.mediaMatcher =
        matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`));
  }

  ngOnInit() {
    this.users = this.userService.users;
    this.userService.loadAll();

    this.router.events.subscribe(() => {
      if (this.isScreenSmall()) {
        this.sidenav.close();
      }
    });
  }

  isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }

  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
  }
}
