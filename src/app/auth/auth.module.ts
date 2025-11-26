import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AuthRouting } from '@app/auth/auth.routing';
import { LoginComponent } from '@app/auth/login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { LanguageSelectorComponent } from '@app/i18n';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { RegisterComponent } from './register/register.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    AuthRouting,
    FormsModule,
    LanguageSelectorComponent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
  ],
  declarations: [LoginComponent, LogoutComponent, RegisterComponent],
})
export class AuthModule {}
