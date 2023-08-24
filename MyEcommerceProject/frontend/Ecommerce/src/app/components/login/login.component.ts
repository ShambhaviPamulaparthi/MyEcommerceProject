import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginFormGroup: FormGroup;

  credentials = {
    userName: '',
    password: '',
  };

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginFormGroup = this.formBuilder.group({
      user: this.formBuilder.group({
        userName: ['', [Validators.required]],
        password: ['', [Validators.required]],
      }),
    });
  }

  get userName() {
    return this.loginFormGroup.get('user.userName');
  }

  get password() {
    return this.loginFormGroup.get('user.password');
  }

  onSubmit() {
    if (this.loginFormGroup.invalid) {
      this.loginFormGroup.markAllAsTouched();
      return;
    }

    this.credentials.userName =
      this.loginFormGroup.controls?.['user'].value.userName;
    this.credentials.password =
      this.loginFormGroup.controls?.['user'].value.password;

    console.log(this.credentials);

    this.loginService.generateToken(this.credentials).subscribe((data) => {
      console.log(data);
      this.loginService.loginUser(data);
      location.reload();
      this.router.navigateByUrl('/wish-list');
    });
  }
}
