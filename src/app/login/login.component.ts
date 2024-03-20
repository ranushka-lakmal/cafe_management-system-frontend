import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {MatDialogRef} from '@angular/material/dialog';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {SnackbarService} from '../services/snackbar.service';
import {GlobalConstants} from '../shared/global-constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;
  loginForm:any = FormGroup;
  responseMessage:any;
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private userService: UserService,
              private dialogRef: MatDialogRef<LoginComponent>,
              private ngxService: NgxUiLoaderService,
              private snakeBar: SnackbarService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:[null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
      password:[null, [Validators.required]]
    })
  }

}
