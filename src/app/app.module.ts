import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgSelectizeModule } from 'ng-selectize';
import { DataTablesModule } from 'angular-datatables';

//Layout Modules
import { CommonLayoutComponent } from './common/common-layout.component';
import { AuthenticationLayoutComponent } from './common/authentication-layout.component';

//Directives
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Sidebar_Directives } from './shared/directives/side-nav.directive';
import { Cards_Directives } from './shared/directives/cards.directive';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

// Routing Module
import { AppRoutes } from './app.routing';

// App Component
import { AppComponent } from './app.component';
import { SigninComponent } from './pages/signin/signin.component';
import { CompanyComponent } from './pages/company/company.component';
import { CompanyViewComponent } from './pages/company/company-view.component';
import { CountryComponent } from './pages/country/country.component';
import { CompanyListComponent } from './pages/company/company-list.component';
import { StateComponent } from './pages/state/state.component';
import { CityComponent } from './pages/city/city.component';
import { AddFormCityComponent } from './pages/city/add-form.city.component';
import { RetailerComponent } from './pages/retailer/retailer.component';
import { ChannelComponent } from './pages/channel/channel.component';
import { AreaComponent } from './pages/area/area.component';
import { BankComponent } from './pages/bank/bank.component';
import { UnitQuantityCodeComponent } from './pages/unit-quantity-code/unit-quantity-code.component';

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(AppRoutes),
        NgbModule.forRoot(),
        FormsModule,
        PerfectScrollbarModule,
        NgSelectizeModule,
        DataTablesModule
    ],
    declarations: [
        AppComponent,
        CommonLayoutComponent,
        AuthenticationLayoutComponent,
        Sidebar_Directives,
        Cards_Directives,
        SigninComponent,
        CompanyComponent,
        CountryComponent,
        CompanyListComponent,
        CompanyViewComponent,
        StateComponent,
        CityComponent,
        AddFormCityComponent,
        RetailerComponent,
        ChannelComponent,
        AreaComponent,
        BankComponent,
        UnitQuantityCodeComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})


export class AppModule { }
