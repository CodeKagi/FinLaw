// src/app/pages/pages-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Shell } from '@app/shell/services/shell.service';
import { DashboardComponent } from '@pages/dashboard/dashboard.component';
import { ClientOverviewComponent } from '@pages/client-overview/client-overview.component';
import { NewClientComponent } from '@pages/new-client/new-client.component';
import { LearningCenterComponent } from '@pages/learning-center/learning-center.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { LeadsComponent } from './leads/leads.component';
import { FinanceComponent } from './finance/finance.component';
import { AdminComponent } from './admin/admin.component';
import { MyListsComponent } from './my-lists/my-lists.component';
import { ReportsComponent } from './reports/reports.component';
import { LeadsMarketplaceComponent } from './leads-marketplace/leads-marketplace.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'dashboard',
      component: DashboardComponent,
      children: [
        { path: '', redirectTo: '', pathMatch: 'full' },

        { path: '', component: DashboardHomeComponent, data: { title: 'Dashboard', subtitle: 'Overview & quick stats' } },

        {
          path: 'overview', // /dashboard/overview
          component: ClientOverviewComponent,
          data: { title: 'Client Overview', subtitle: 'Clients and statuses' },
        },

        {
          path: 'clients', // /dashboard/clients (alias)
          component: ClientOverviewComponent,
          data: { title: 'Client Overview', subtitle: 'Clients and statuses' },
        },

        {
          path: 'new-client', // /dashboard/new-client
          component: NewClientComponent,
          data: { title: 'New Client', subtitle: 'Quick onboarding' },
        },

        {
          path: 'learning', // /dashboard/learning
          component: LearningCenterComponent,
          data: { title: 'Learning Centre', subtitle: 'Guides and resources' },
        },
        {
          path: 'leads', // /dashboard/LeadsComponent
          component: LeadsComponent,
          data: { title: 'Leads', subtitle: 'Leads' },
        },

        {
          path: 'finance', // /dashboard/LeadsComponent
          component: FinanceComponent,
          data: { title: 'Finance', subtitle: 'finance' },
        },
        {
          path: 'admin', // /dashboard/LeadsComponent
          component: AdminComponent,
          data: { title: 'Admin', subtitle: 'admin' },
        },
        {
          path: 'lists', // /dashboard/LeadsComponent
          component: MyListsComponent,
          data: { title: 'My Lists', subtitle: 'My Lists' },
        },
        {
          path: 'reports', // /dashboard/LeadsComponent
          component: ReportsComponent,
          data: { title: 'Reports', subtitle: 'reports' },
        },
        {
          path: 'marketplace', // /dashboard/LeadsComponent
          component: LeadsMarketplaceComponent,
          data: { title: 'Marketplace', subtitle: 'marketplace' },
        },
      ],
    },

    // other top-level pages / lazy modules...
    {
      path: 'users',
      loadChildren: () => import('./users/users.module').then((m) => m.UsersModule),
    },

    // Fallback when no prior route is matched
    { path: '**', redirectTo: '', pathMatch: 'full' },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // remove Material imports here
  exports: [RouterModule],
})
export class PagesRoutingModule {}
