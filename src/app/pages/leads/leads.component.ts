import { Component } from '@angular/core';

interface Lead {
  id: number;
  timeReceived: string;
  franchise: string;
  name: string;
  cell: string;
  idNumber: string;
  affiliate: string;
  message: string;
  allocatedTo: string;
  outcome: string;
  selected?: boolean;
}

type SortDirection = 'asc' | 'desc';

@Component({
  selector: 'app-leads',
  standalone: false,
  templateUrl: './leads.component.html',
  styleUrl: './leads.component.scss',
})
export class LeadsComponent {
  /* ---------------- DATA ---------------- */

  leads: Lead[] = [
    {
      id: 1,
      timeReceived: '12 Dec 2025 7:01',
      franchise: 'FinLaw SA',
      name: 'Sibusiso',
      cell: '0786197717',
      idNumber: '9001011234087',
      affiliate: 'Cashfin',
      message: 'Sibusiso',
      allocatedTo: 'Anthony Acadia',
      outcome: 'Not Processed',
    },
    {
      id: 2,
      timeReceived: '12 Dec 2025 7:01',
      franchise: 'FinLaw SA',
      name: 'Nicol',
      cell: '0698123606',
      idNumber: '9102021234088',
      affiliate: 'Cashfin',
      message: 'Nicol',
      allocatedTo: 'Beekay',
      outcome: 'Not Processed',
    },
  ];

  displayedLeads: Lead[] = [];

  /* ---------------- SELECTION ---------------- */

  selectAll = false;

  get selectedLeads(): Lead[] {
    return this.displayedLeads.filter((l) => l.selected);
  }

  toggleSelectAll() {
    this.displayedLeads.forEach((l) => (l.selected = this.selectAll));
  }

  toggleRow() {
    this.selectAll = this.displayedLeads.every((l) => l.selected);
  }

  /* ---------------- SORTING ---------------- */

  activeSort: { column: keyof Lead; direction: SortDirection } | null = null;

  sort(column: keyof Lead) {
    if (this.activeSort?.column === column) {
      this.activeSort.direction = this.activeSort.direction === 'asc' ? 'desc' : 'asc';
    } else {
      this.activeSort = { column, direction: 'asc' };
    }

    const dir = this.activeSort.direction === 'asc' ? 1 : -1;

    this.displayedLeads.sort((a, b) => (a[column] > b[column] ? dir : -dir));
  }

  /* ---------------- FILTER ---------------- */

  showFilter = false;
  filterColumn: keyof Lead | '' = '';
  filterValue = '';

  applyFilter() {
    this.displayedLeads = this.leads.filter((l) => !this.filterColumn || String(l[this.filterColumn]).toLowerCase().includes(this.filterValue.toLowerCase()));
    this.closeFilter();
  }

  clearFilter() {
    this.displayedLeads = [...this.leads];
    this.closeFilter();
  }

  closeFilter() {
    this.showFilter = false;
    this.filterColumn = '';
    this.filterValue = '';
  }

  /* ---------------- EXPORT ---------------- */

  showExport = false;

  export() {
    alert('Export (mock)');
    this.showExport = false;
  }

  /* ---------------- PAGINATION ---------------- */

  pageSize = 10;
  currentPage = 1;

  get totalPages(): number {
    return Math.ceil(this.displayedLeads.length / this.pageSize);
  }

  changePage(page: number) {
    this.currentPage = page;
  }

  get pagedLeads(): Lead[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.displayedLeads.slice(start, start + this.pageSize);
  }

  /* ---------------- INIT ---------------- */

  ngOnInit() {
    this.displayedLeads = [...this.leads];
  }

  addLeadManually() {
    console.log('Add lead manually clicked');
    // TODO: open Add Lead modal
  }

  importLeads() {
    console.log('Import leads clicked');
    // TODO: open Import Leads modal
  }
}
