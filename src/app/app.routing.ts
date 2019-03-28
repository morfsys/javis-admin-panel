import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Layouts
import { CommonLayoutComponent } from "./common/common-layout.component";
import { AuthenticationLayoutComponent } from "./common/authentication-layout.component";
import { CompanyComponent } from "./pages/company/company.component";
import { CompanyViewComponent } from "./pages/company/company-view.component";
import { SigninComponent } from "./pages/signin/signin.component";
import { CountryComponent } from "./pages/country/country.component";
import { RetailerComponent } from "./pages/retailer/retailer.component";
import { ChannelComponent } from "./pages/channel/channel.component";
import { AreaComponent } from "./pages/area/area.component";
import { StateComponent } from "./pages/state/state.component";
import { CityComponent } from "./pages/city/city.component";
import { BankComponent } from "./pages/bank/bank.component";
import { UQCComponent } from "./pages/unit-quantity-code/uqc.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { AuthGaurdService } from "./services/auth-gaurd.service";

export const AppRoutes: Routes = [
  {
    path: "signin",
    component: SigninComponent
  },
  {
    path: "",
    component: CommonLayoutComponent,
    canActivate: [AuthGaurdService], 
    children: [
      {
        path: "",
        pathMatch: "full",
        redirectTo: "dashboard"
      },
      {
        path: "dashboard",
        component: DashboardComponent
      },
      {
        path: "company",
        component: CompanyComponent
      },
      {
        path: "retailer",
        component: RetailerComponent
      },
      {
        path: "channel",
        component: ChannelComponent
      },
      {
        path: "area",
        component: AreaComponent
      },
      {
        path: "city",
        component: CityComponent
      },
      {
        path: "state",
        component: StateComponent
      },
      {
        path: "country",
        component: CountryComponent
      },
      {
        path: "bank",
        component: BankComponent
      },
      {
        path: "unit-quantity-code",
        component: UQCComponent
      },
      {
        path: "profile",
        component: ProfileComponent
      }
    ]
  }
];
