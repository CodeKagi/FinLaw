import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { PagesRoutingModule } from './pages-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClientOverviewComponent } from './client-overview/client-overview.component';
import { NewClientComponent } from './new-client/new-client.component';
import { LearningCenterComponent } from './learning-center/learning-center.component';
import { LeadsComponent } from './leads/leads.component';
import { FinanceComponent } from './finance/finance.component';
import { AdminComponent } from './admin/admin.component';
import { MyListsComponent } from './my-lists/my-lists.component';
import { ReportsComponent } from './reports/reports.component';
import { LeadsMarketplaceComponent } from './leads-marketplace/leads-marketplace.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { NgChartsModule } from 'ng2-charts';

import { MatCardModule } from '@angular/material/card';

import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardHomeComponent,
    ClientOverviewComponent,
    NewClientComponent,
    LearningCenterComponent,
    LeadsComponent,
    FinanceComponent,
    AdminComponent,
    MyListsComponent,
    ReportsComponent,
    LeadsMarketplaceComponent,
    DashboardHomeComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatDividerModule,
    MatTooltipModule,
    NgChartsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class PagesModule {}
