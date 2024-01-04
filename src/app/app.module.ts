import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { LeftNavigationComponent } from './common/left-navigation/left-navigation.component';
import { HeaderComponent } from './common/header/header.component';
import { SearchComponent } from './pages/search/search.component';
import { ExploreComponent } from './pages/explore/explore.component';
import { NotificationComponent } from './pages/notification/notification.component';
import { CreateComponent } from './pages/create/create.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NgToastModule } from 'ng-angular-popup';
import { TokenInterceptor } from './interceptor/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SidebarComponent,
    LeftNavigationComponent,
    HeaderComponent,
    SearchComponent,
    ExploreComponent,
    NotificationComponent,
    CreateComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgToastModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
