import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: false,
})
export class DashboardComponent {
  isSidebarCollapsed = false; // desktop behaviour
  isMobileSidebarOpen = false; // mobile drawer

  toggleSidebar(): void {
    if (window.innerWidth <= 900) {
      // mobile: open/close drawer
      this.isMobileSidebarOpen = !this.isMobileSidebarOpen;
    } else {
      // desktop: shrink/expand sidebar
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
    }
  }
}
