import { Component, signal, WritableSignal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CarouselComponent } from "../../shared/components/ui/carousel/carousel.component";
import { TranslatePipe } from '@ngx-translate/core';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, CarouselComponent, TranslatePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  isLoading: WritableSignal<boolean> = signal(false);
  showPassword: WritableSignal<boolean> = signal(false);
  constructor(private auth: AuthService, private router: Router) { }
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });


  submit() {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      this.auth.login(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.isLoading.set(false);
          localStorage.setItem('userToken', res.token);
          this.auth.decodeToken();
          console.log(this.auth.userData);

          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.log(err);
          this.isLoading.set(false);
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  togglePasswordVisibility() {
    this.showPassword.set(!this.showPassword());
  }
}
