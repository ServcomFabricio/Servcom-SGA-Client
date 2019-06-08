import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt'
registerLocaleData(localePt);

//routes
import { rootRouterConfig } from './app.routers';


//3s tools
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ToastrModule } from 'ngx-toastr';
import { CustomFormsModule } from 'ng2-validation';

//components
import { AppComponent } from './app.component';

// user components
import { LoginComponent } from './usuario/login/login.component';

//services
import { SeoService } from './services/seo.service';
import { ErrorInterceptor } from './services/erro.handker.service';

//modules
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './home/home.component';
import { UsuarioService } from './usuario/services/usuario.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CollapseModule.forRoot(),
    ToastrModule.forRoot(),
    RouterModule.forRoot(rootRouterConfig, { useHash: false }),
  ],
  providers: [
    Title,
    SeoService,
    UsuarioService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
