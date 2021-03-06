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
import { SwitchComponent } from './components/reusables/switch/switch.component';
import { EventNotifierComponent } from './components/reusables/event-notifier/event-notifier.component';
import { PromptComponent } from './components/prompt/prompt.component';
import { GraphQLModule } from './graphql.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StatsPlaceholderComponent } from './components/loaders/stats-placeholder/stats-placeholder.component';
import { TopShortUrlsPlaceholderComponent } from './components/loaders/top-short-urls-placeholder/top-short-urls-placeholder.component';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { UserInfoUpdateComponent } from './components/user-info-update/user-info-update.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    RegisterComponent,
    MainComponent,
    LoginComponent,
    UrlboardComponent,
    SidebarComponent,
    SwitchComponent,
    EventNotifierComponent,
    PromptComponent,
    DashboardComponent,
    StatsPlaceholderComponent,
    TopShortUrlsPlaceholderComponent,
    UserInfoUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    GraphQLModule,
    ApolloModule,
  ],
  providers: [AUTH_INTERCEPTOR_PROVIDERS],
  bootstrap: [AppComponent],
})
export class AppModule {}
