import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../services/user.service';
import {MatDialogRef} from '@angular/material/dialog';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {SnackbarService} from '../services/snackbar.service';
import {GlobalConstants} from '../shared/global-constants';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: any = FormGroup;
  resposeMessage: any;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              public dialogRef: MatDialogRef<ForgotPasswordComponent>,
              private ngxService: NgxUiLoaderService,
              private snakebarService: SnackbarService) {
  }

  ngOnInit(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]]
    });
  }

  handleSubmit() {
    this.ngxService.start();
    var formData = this.forgotPasswordForm.value;
    var data = {
      email: formData.email
    };
    this.userService.forgotPassword(data).subscribe((response: any) => {
      this.ngxService.stop();
      this.resposeMessage = response?.message;
      this.dialogRef.close();
      this.snakebarService.openSnackBar(this.resposeMessage, '');
    }, (error) => {
      this.ngxService.stop();
      if (error.error?.message) {
        this.resposeMessage = error.error?.message;
      } else {
        this.resposeMessage = GlobalConstants.genericError;
      }
      this.snakebarService.openSnackBar(this.resposeMessage, GlobalConstants.error);
    });
  }
}
