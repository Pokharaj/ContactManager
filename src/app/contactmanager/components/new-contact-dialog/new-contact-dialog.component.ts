import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { User } from '../../models/user';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-new-contact-dialog',
  templateUrl: './new-contact-dialog.component.html',
  styleUrls: ['./new-contact-dialog.component.scss']
})
export class NewContactDialogComponent implements OnInit {

  avatars = [
    'svg-1', 'svg-2', 'svg-3', 'svg-4'
  ];

  user: User;
  name: FormControl;

  getErrorMessage() {
    return this.name.hasError('required') ? 'You must enter name' : '';
  }

  constructor(
    private dialogRef: MatDialogRef<NewContactDialogComponent>,
    private userService: UserService) { }

  ngOnInit() {
    this.name = new FormControl('', [Validators.required]);
    this.user = new User();
  }

  save(): void {
    this.userService.addUser(this.user).then((user: User) => {
      this.dialogRef.close(user);
    });
  }

  dismiss(): void {
    this.dialogRef.close(null);
  }
}
