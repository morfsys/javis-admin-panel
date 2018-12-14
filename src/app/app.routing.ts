import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Layouts
import { CommonLayoutComponent } from './common/common-layout.component';
import { AuthenticationLayoutComponent } from './common/authentication-layout.component';
import { CompanyComponent } from './pages/company/company.component';
import { SigninComponent } from './pages/signin/signin.component';
import { CountryComponent } from './pages/country/country.component';

export const AppRoutes: Routes = [
    {
        path: 'signin',
        component: SigninComponent
    },
    {
        path: '',
        redirectTo: 'company',
        pathMatch: 'full',
    },
    {
        path: '',
        component: CommonLayoutComponent,
        children: [
            
            {
                path: 'company',
                component: CompanyComponent
            },
            {
                path: 'country',
                component: CountryComponent
            }
        ]
    }
];

