import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {
  IonBackButton,
  IonButton, IonButtons,
  IonCol,
  IonContent,
  IonGrid, IonHeader,
  IonImg, IonInput,
  IonItem,
  IonRow, IonTitle, IonToolbar,
} from '@ionic/angular/standalone';
import {AuthRequest} from "../../model/auth-request.model";
import {AuthService} from "../../service/auth-service";
import {Router} from "@angular/router";

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password')?.value;
  const confirmedPassword = control.get('confirmedPassword')?.value;

  if (password && confirmedPassword && password !== confirmedPassword) {
    return { passwordsMismatch: true };
  }
  return null;
};

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonGrid, IonRow, IonCol, IonImg, IonItem, IonInput, IonButton, ReactiveFormsModule, IonBackButton, IonButtons, IonHeader, IonTitle, IonToolbar]
})
export class RegisterPage implements OnInit {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  form = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    confirmedPassword: ['', Validators.required],
  }, {validators: passwordMatchValidator})

  constructor() { }

  ngOnInit() {
  }

  handleRegister() {
    const request: AuthRequest = {
      username: this.form.get('username')?.value as string,
      password: this.form.get('password')?.value as string
    };
    this.authService.register(request).subscribe(res => {
      localStorage.setItem('token', res.token);
      this.router.navigate(['books']);
    })
  }
}
