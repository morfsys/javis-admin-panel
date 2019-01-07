import { AddFormAreaComponent } from './pages/area/add-form.area.component';
import { ChannelViewComponent } from './pages/channel/channel-view.component';
import { CityListComponent } from './pages/city/city-list.component';
import { CityViewComponent } from './pages/city/city-view.component';
import { BankViewComponent } from './pages/bank/bank-view.component';
import { BankListComponent } from './pages/bank/bank-list.component';
import { AreaViewComponent } from './pages/area/area-view.component';
import { AreaListComponent } from './pages/area/area-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgSelectizeModule } from 'ng-selectize';
import { DataTablesModule } from 'angular-datatables';
import { ClickOutsideModule } from 'ng-click-outside';

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
import { CountryListComponent } from './pages/country/country-list.component';
import { CountryViewComponent } from './pages/country/country-view.component';
import { CompanyListComponent } from './pages/company/company-list.component';
import { StateComponent } from './pages/state/state.component';
import { StateListComponent } from './pages/state/state-list.component';
import { StateViewComponent } from './pages/state/state-view.component';
import { CityComponent } from './pages/city/city.component';
import { AddFormCityComponent } from './pages/city/add-form.city.component';
import { RetailerComponent } from './pages/retailer/retailer.component';
import { RetailerViewComponent } from './pages/retailer/retailer-view.component';
import { RetailerListComponent } from './pages/retailer/retailer-list.component';
import { ChannelComponent } from './pages/channel/channel.component';
import { AreaComponent } from './pages/area/area.component';
import { BankComponent } from './pages/bank/bank.component';
import { UQCComponent } from './pages/unit-quantity-code/uqc.component';
import { UQCListComponent } from './pages/unit-quantity-code/uqc-list.component';
import { UQCViewComponent } from './pages/unit-quantity-code/uqc-view.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ForceUppercaseDirective } from './directives/force-uppercase.directive';
import { DataTableDirective } from './directives/data-table.directive';
import { Bs4PopoverDirective } from './directives/bs4-popover.directive';
import { ActionDotsComponent } from './components/action-dots/action-dots.component';
import { NgSelectizeDirective } from './directives/ng-selectize.directive';
import { ChannelListComponent } from './pages/channel/channel-list.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { InputMaxLengthDirective } from './directives/input-max-length.directive';
import { AllowedCharsDirective } from './directives/allowed-chars.directive';

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(AppRoutes),
        NgbModule.forRoot(),
        FormsModule,
        PerfectScrollbarModule,
        NgSelectizeModule,
        DataTablesModule,
        ClickOutsideModule
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
        CountryListComponent,
        CountryViewComponent,
        CompanyListComponent,
        CompanyViewComponent,
        StateComponent,
        StateListComponent,
        StateViewComponent,
        CityComponent,
        CityViewComponent,
        CityListComponent,
        AddFormCityComponent,
        RetailerComponent,
        RetailerViewComponent,
        RetailerListComponent,
        ChannelComponent,
        ChannelViewComponent,
        ChannelListComponent,
        AreaComponent,
        AreaListComponent,
        AreaViewComponent,
        AddFormAreaComponent,
        BankComponent,
        BankListComponent,
        BankViewComponent,
        UQCComponent,
        UQCViewComponent,
        UQCListComponent,
        DashboardComponent,
        ForceUppercaseDirective,
        DataTableDirective,
        Bs4PopoverDirective,
        ActionDotsComponent,
        NgSelectizeDirective,
        RetailerViewComponent,
        RetailerListComponent,
        ProfileComponent,
        InputMaxLengthDirective,
        AllowedCharsDirective
    ],
    providers: [],
    bootstrap: [AppComponent]
})


export class AppModule { }
