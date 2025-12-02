import { Component } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

interface Stat {
  label: string;
  value: string | number;
  hint?: string;
  icon?: string;
  color?: string;
}

interface MiniCard {
  title: string;
  value: string | number;
  color?: string;
  spark?: number[]; // simple sparkline data (not rendered as real chart)
}

@Component({
  selector: 'app-dashboard-home',
  standalone: false,
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.scss',
})
export class DashboardHomeComponent {
  stats: Stat[] = [
    { label: 'Clients', value: 4_321, hint: 'Active', icon: 'people', color: '#3b82f6' },
    { label: 'Active workflows', value: 128, hint: 'In progress', icon: 'work', color: '#ef4444' },
    { label: 'Tasks due today', value: 27, hint: 'Urgent', icon: 'assignment_late', color: '#10b981' },
    { label: 'Open leads', value: 50, hint: 'New', icon: 'trending_up', color: '#f59e0b' },
  ];

  miniCards: MiniCard[] = [
    { title: 'Total Sales', value: 'R4,000', color: '#2563eb', spark: [1, 2, 1, 3, 2, 4] },
    { title: 'Comments', value: '489', color: '#ef4444', spark: [2, 3, 1, 2, 1, 3] },
    { title: 'Leads', value: '50', color: '#25ebc3ff', spark: [1, 2, 1, 3, 2, 4] },
  ];

  boardItems = [
    { id: 1, title: 'New client intake - FL30681', status: 'Files waiting', when: '2h' },
    { id: 2, title: 'KYC documents - GUMEDE', status: 'Pending', when: '5h' },
    { id: 3, title: 'Payment follow-up - MDUNYELWA', status: 'Due', when: 'Today' },
    { id: 4, title: 'Review: Debt Review Assessment', status: 'Assigned', when: '1d' },
    { id: 5, title: 'Upload Evidence - SISHI', status: 'Files waiting', when: '3d' },
  ];

  // simple mock points for chart placeholder (normalized 0..100)
  chartPoints = [10, 20, 14, 30, 26, 48, 42, 58, 46, 72, 68, 80];

  // Line chart data
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        data: [10, 25, 15, 40, 32, 50, 70, 60, 55, 78, 68, 90],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59,130,246,0.15)',
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointBackgroundColor: '#3b82f6',
      },
    ],
  };

  public lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { beginAtZero: false, grid: { color: '#e5e7eb' } },
      x: { grid: { display: false } },
    },
    plugins: { legend: { display: false } },
  };

  // <- add this:
  public lineChartType: ChartConfiguration<'line'>['type'] = 'line';
}
