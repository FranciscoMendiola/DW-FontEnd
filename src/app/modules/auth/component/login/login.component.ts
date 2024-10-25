import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../_service/authentication.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { LoginResponse } from '../../_model/login-response';
import { CommonModule } from '@angular/common';
import { CustomIconModule } from '../../../../shared/custom-icon-module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule, CustomIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  loginForm = new FormGroup(
    {
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    }
  )

  public showLoading: boolean;
  private subscriptions: Subscription[] = [];
  public isLoggedIn: boolean = false; // Nueva propiedad para el estado de login

  constructor(private router: Router, private authenticationService: AuthenticationService) {
    this.showLoading = false;
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authenticationService.isUserLoggedIn(); // Verifica si el usuario está logeado
    if (this.isLoggedIn) {
      this.router.navigateByUrl('/secured/landing');
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  public onLogin(): void {
    this.showLoading = true;
    var loginFormValue = this.loginForm.value as { username: string, password: string };

    this.subscriptions.push(
      this.authenticationService.login(loginFormValue).subscribe(
        (response: HttpResponse<LoginResponse>) => {
          if (response.body && response.body.token) {
            const token = response.body.token;
            this.authenticationService.saveToken(token);
            this.authenticationService.addUserToLocalCache(response.body);
            this.router.navigateByUrl('/secured');
            this.showLoading = false;
            this.isLoggedIn = true; // Actualiza el estado de login
          } else {
            console.log('El token devuelto no fue poblado');
            return;
          }
        },
        (errorResponse: HttpErrorResponse) => {
          alert(errorResponse.error.message);
          this.showLoading = false;
        }
      )
    );
  }

  public onLogout(): void {  // Nueva función para el logout
    this.authenticationService.logOut();
    this.isLoggedIn = false;  // Actualiza el estado de login
    this.router.navigateByUrl('/login');
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  get fg() {
    return this.loginForm.controls;
  }
}
