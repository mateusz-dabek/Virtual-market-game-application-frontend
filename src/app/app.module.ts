import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { AccountModule } from './account/account.module';
import { LayoutModule } from './layout/layout.module';
import { ExchangeDataService } from './layout/services/exchange-data.service';
import { AccountRoutingModule } from './layout/account-routing.module';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  imports: [
    AccountModule,
    LayoutModule,
    BrowserModule,
    AppRoutingModule,
    AccountRoutingModule, //?
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    ToastrModule.forRoot(),
  ],
  providers: [ExchangeDataService],//?
  bootstrap: [AppComponent]
})
export class AppModule { }
