import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LobbyComponent } from "./components/lobby/lobby.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { JwtInterceptor } from "./components/helpers/jwt.interceptor";
import { LogoutComponent } from "./components/logout/logout.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { CommonModule } from "@angular/common";
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { HomeComponent } from './components/home/home.component';
import { LobbyCreateComponent } from "./components/lobby-create/lobby-create.component";

@NgModule({
  declarations: [
    AppComponent,
    LobbyComponent,
    NavBarComponent,
    LogoutComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    LobbyCreateComponent
  ],
  imports: [
    MDBBootstrapModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
