import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertsService } from 'src/app/shared/services/alerts.service';
import { ToastsService } from 'src/app/shared/services/toasts.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styles: [
    `
      .center-span {
        display: block;
        text-align: center;
      }
    `,
  ],
})
export class LoginPage implements OnInit {
  emailPattern =
    /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;

  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertsService,
    private toastService: ToastsService
  ) {}

  ngOnInit() {
    // this.form.reset({
    //   email: 'jeanpi3rm@gmail.com',
    //   password: '12345',
    // });
  }

  controlInvalid(control: string) {
    return this.form.get(control)?.invalid && this.form.get(control)?.touched;
  }

  login() {
    if (this.form.valid) {
      const { email, password } = this.form.value;
      this.authService.login(email, password).subscribe(
        (res) => {
          console.log(res);
          this.router.navigateByUrl('/folder/Inbox');
        },
        (err) => {
          const { error } = err;
          if (!error.message) {
            return;
          }
          this.toastService.presentToast(error.message);
        }
      );
    } else {
      this.alertService.presentAlert(
        'Error',
        'Enter your credentials correctly please.'
      );
    }
  }
}
