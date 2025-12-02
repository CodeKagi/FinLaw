// src/app/pages/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { AuthenticationService } from '@app/auth/services/authentication.service';
interface PageData {
  title?: string;
  subtitle?: string;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: false,
})
export class DashboardComponent implements OnInit {
  isSidebarCollapsed = false; // desktop behaviour
  isMobileSidebarOpen = false; // mobile drawer
  pageTitle = 'Dashboard';
  pageSubtitle = 'We’re setting up your widgets and workflows. Dashboard insights are coming soon.';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private readonly _authService: AuthenticationService,
  ) {}

  ngOnInit(): void {
    // update page title/subtitle from active child route data
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        map(() => this.findChildRoute(this.activatedRoute)),
      )
      .subscribe((child: ActivatedRoute | null) => {
        const data = (child?.snapshot.data as PageData) || {};
        this.pageTitle = data.title || 'Dashboard';
        this.pageSubtitle = data.subtitle || 'We’re setting up your widgets and workflows. Dashboard insights are coming soon.';
      });
  }

  private findChildRoute(route: ActivatedRoute): ActivatedRoute | null {
    let child = route.firstChild;
    while (child?.firstChild) {
      child = child.firstChild;
    }
    return child ?? null;
  }

  toggleSidebar(): void {
    if (window.innerWidth <= 900) {
      // mobile: open/close drawer
      this.isMobileSidebarOpen = !this.isMobileSidebarOpen;
    } else {
      // desktop: shrink/expand sidebar
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
    }
  }

  logout(): void {
    this._authService.logout().subscribe(() => {
      this.isSidebarCollapsed = false;
      this.isMobileSidebarOpen = false;
      this.router.navigate(['/login'], { replaceUrl: true });
    });
  }
}
