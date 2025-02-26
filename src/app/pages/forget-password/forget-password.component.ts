import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CarouselComponent } from "../../shared/components/ui/carousel/carousel.component";
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule, CarouselComponent],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
  isLoading: boolean = false;
  showPassword: boolean = false;
  step: number = 1;
  email: string = "";
  constructor(private auth: AuthService, private router: Router) { }
  forgetForm: FormGroup = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[\w\.-]+@([\w-]+\.)+[\w-]{2,}$/),
    ]),
  })
  confirmCodeForm: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[0-9]{6}$/),
    ]),
  })
  resetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[\w\.-]+@([\w-]+\.)+[\w-]{2,}$/),
    ]),
    newPassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
      ),
    ]),
  })

  forget() {
    this.isLoading = true;
    this.email = this.forgetForm.get('email')?.value;
    this.resetPasswordForm.get('email')?.patchValue(this.email);
    this.auth.forgetPassword(this.forgetForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.isLoading = false;

        this.step = 2;
      }, error: (err) => {
        console.log(err);
        this.isLoading = false;

      }
    })
  }
  confirmCode() {
    this.isLoading = true;
    this.auth.confirmCode(this.confirmCodeForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.isLoading = false;

        this.step = 3;
      }, error: (err) => {
        console.log(err);
        this.isLoading = false;

      }
    })
  }
  resetPassword() {
    this.isLoading = true;
    this.auth.resetPassword(this.resetPasswordForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.isLoading = false;
        localStorage.setItem('userToken', res.token)
        this.router.navigate(['/home'])
      }, error: (err) => {
        console.log(err);
        this.isLoading = false;

      }
    })
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onInputChange(event: any, index: number) {
    const input = event.target;
    const value = input.value;

    // Update the combined resetCode value
    const currentCode = this.confirmCodeForm.get('resetCode')?.value || '';
    const newCode = currentCode.split('');
    newCode[index] = value;
    this.confirmCodeForm.get('resetCode')?.setValue(newCode.join(''));

    // Move focus to the next input
    if (value.length === 1 && index < 5) {
      const nextInput = document.getElementById(`code-${index + 2}`) as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    }
  }
}
