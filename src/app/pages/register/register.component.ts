import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { CarouselComponent } from "../../shared/components/ui/carousel/carousel.component";

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CarouselComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  isLoading: boolean = false;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  constructor(private auth: AuthService, private router: Router) { }
  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[\w\.-]+@([\w-]+\.)+[\w-]{2,}$/),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
        ),
      ]),
      rePassword: new FormControl(null, Validators.required),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^01[0-2,5]{1}[0-9]{8}$/),
      ]),
    },
    { validators: this.confirmPassword }
  );


  submit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.auth.register(this.registerForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.isLoading = false;
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
        },
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  confirmPassword(form: AbstractControl) {
    let password = form.get('password')?.value;
    let repassword = form.get('rePassword')?.value;
    if (password == repassword) {
      return null;
    } else {
      return { misMatch: true };
    }
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  toggleConfirmPassVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}
