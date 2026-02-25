import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {
    IonButton,
    IonCol,
    IonContent,
    IonGrid,
    IonImg, IonInput, IonItem, IonRow,
} from '@ionic/angular/standalone';
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../service/auth-service";
import {AuthRequest} from "../../model/auth-request.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonButton, IonCol, IonGrid, IonImg, IonInput, IonItem, IonRow, ReactiveFormsModule, RouterLink]
})
export class LoginPage implements OnInit {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  form = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  })

  constructor() { }

  ngOnInit() {
  }

  handleLogin() {
    const request: AuthRequest = {
      username: this.form.get('username')?.value as string,
      password: this.form.get('password')?.value as string
    };
    this.authService.login(request).subscribe(res => {
      localStorage.setItem('token', res.token);
      this.router.navigateByUrl('/books', { replaceUrl: true });
    })
  }
}
