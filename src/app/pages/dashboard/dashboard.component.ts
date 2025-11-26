import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/auth/services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: false,
})
export class DashboardComponent {
  isSidebarCollapsed = false; // desktop behaviour
  isMobileSidebarOpen = false; // mobile drawer

  constructor(
    private router: Router,
    private readonly _authService: AuthenticationService,
  ) {}

  toggleSidebar(): void {
    if (window.innerWidth <= 900) {
      // mobile: open/close drawer
      this.isMobileSidebarOpen = !this.isMobileSidebarOpen;
    } else {
      // desktop: shrink/expand sidebar
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
    }
  }

  //   logout(): void {
  //   this._authService.logout().subscribe(() => {
  //     this.router.navigate(['/login'], { replaceUrl: true });
  //   });
  // }

  logout(): void {
    this._authService.logout().subscribe(() => {
      this.isSidebarCollapsed = false;
      this.isMobileSidebarOpen = false;
      this.router.navigate(['/login'], { replaceUrl: true });
    });
  }
}
