import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage-angular';
import { SearchResultsModalComponent } from './components/search-results-modal/search-results-modal.component';
import { PaymentModalComponent } from './components/payment-modal/payment-modal.component';
import { HttpClientModule } from '@angular/common/http';
import { AddressModalComponent } from './components/address-modal/address-modal.component';

@NgModule({
  declarations: [AppComponent, SearchResultsModalComponent, PaymentModalComponent, AddressModalComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    ReactiveFormsModule,
    FormsModule,
    IonicStorageModule.forRoot(),
    HttpClientModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
