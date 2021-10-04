import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginPage } from './pages/login/login.page';
import { RegisterPage } from './pages/register/register.page';

@NgModule({
  declarations: [LoginPage, RegisterPage],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthRoutingModule,
  ],
})
export class AuthModule {}
