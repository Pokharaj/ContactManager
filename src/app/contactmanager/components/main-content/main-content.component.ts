import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {

  user: User;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: UserService) { }

  ngOnInit() {
    this.route.params.subscribe((param) => {
      const id = +param.id;
      if (!id || !this.service.userExists(id)) {
        this.router.navigate(['/contactmanager', 1]);
      }
      this.user = null;

      this.service.users.subscribe((users) => {
        if (users.length === 0) { return; }

        setTimeout(() => {
          this.user = this.service.getUser(id);
        }, 500);
      });
    });
}

}
