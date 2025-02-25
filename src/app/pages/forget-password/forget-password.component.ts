import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CarouselComponent } from "../../shared/components/ui/carousel/carousel.component";
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

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
