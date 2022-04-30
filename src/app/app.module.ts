import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { RegisterComponent } from './components/register/register.component';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { AUTH_INTERCEPTOR_PROVIDERS } from './http-interceptor.interceptor';
import { UrlboardComponent } from './components/urlboard/urlboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
  declarations: [AppComponent, WelcomeComponent, RegisterComponent, MainComponent, LoginComponent, UrlboardComponent, SidebarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [AUTH_INTERCEPTOR_PROVIDERS],
  bootstrap: [AppComponent],
})
export class AppModule {}
