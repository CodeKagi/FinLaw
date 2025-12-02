import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface ProductRow {
  product: string;
  awaitingPayment: number;
  active: number;
  completed: number;
  suspended: number;
  terminated: number;
  cancelled: number;
  finalised: number;
  legalAction: number;
  contractCancelled: number;
  disputed: number;
  total: number; // computed
}

@Component({
  selector: 'app-client-overview',
  templateUrl: './client-overview.component.html',
  styleUrls: ['./client-overview.component.scss'],
  standalone: false,
})
export class ClientOverviewComponent implements AfterViewInit {
  displayedColumns: string[] = ['product', 'awaitingPayment', 'active', 'completed', 'suspended', 'terminated', 'cancelled', 'finalised', 'legalAction', 'contractCancelled', 'disputed', 'total'];

  // Mock data (replace with API later)
  private rows: ProductRow[] = [
    {
      product: 'Credit Interpretation Report (Compuscan/XDS)',
      awaitingPayment: 8417,
      active: 474,
      completed: 543,
      suspended: 46,
      terminated: 3,
      cancelled: 9450,
      finalised: 8290,
      legalAction: 0,
      contractCancelled: 2,
      disputed: 16,
      total: 0,
    },
    {
      product: 'B-Legal: Affordable Distribution (Assessment)',
      awaitingPayment: 9,
      active: 4,
      completed: 1,
      suspended: 2,
      terminated: 1,
      cancelled: 635,
      finalised: 30,
      legalAction: 0,
      contractCancelled: 0,
      disputed: 0,
      total: 0,
    },
    {
      product: 'B-Legal: Affordable Distribution (Assessment)',
      awaitingPayment: 9,
      active: 4,
      completed: 1,
      suspended: 2,
      terminated: 1,
      cancelled: 635,
      finalised: 30,
      legalAction: 0,
      contractCancelled: 0,
      disputed: 0,
      total: 0,
    },
    {
      product: 'B-Legal: Affordable Distribution (Assessment)',
      awaitingPayment: 9,
      active: 4,
      completed: 1,
      suspended: 2,
      terminated: 1,
      cancelled: 635,
      finalised: 30,
      legalAction: 0,
      contractCancelled: 0,
      disputed: 0,
      total: 0,
    },
    {
      product: 'B-Legal: Affordable Distribution (Assessment)',
      awaitingPayment: 9,
      active: 4,
      completed: 1,
      suspended: 2,
      terminated: 1,
      cancelled: 635,
      finalised: 30,
      legalAction: 0,
      contractCancelled: 0,
      disputed: 0,
      total: 0,
    },
    {
      product: 'B-Legal: Affordable Distribution (Assessment)',
      awaitingPayment: 9,
      active: 4,
      completed: 1,
      suspended: 2,
      terminated: 1,
      cancelled: 635,
      finalised: 30,
      legalAction: 0,
      contractCancelled: 0,
      disputed: 0,
      total: 0,
    },
    {
      product: 'B-Legal: Affordable Distribution (Assessment)',
      awaitingPayment: 9,
      active: 4,
      completed: 1,
      suspended: 2,
      terminated: 1,
      cancelled: 635,
      finalised: 30,
      legalAction: 0,
      contractCancelled: 0,
      disputed: 0,
      total: 0,
    },
    {
      product: 'B-Legal: Affordable Distribution (Assessment)',
      awaitingPayment: 9,
      active: 4,
      completed: 1,
      suspended: 2,
      terminated: 1,
      cancelled: 635,
      finalised: 30,
      legalAction: 0,
      contractCancelled: 0,
      disputed: 0,
      total: 0,
    },
    // ... add more rows to match your screenshot or use a loop to duplicate
    {
      product: 'Debt Review Assessment',
      awaitingPayment: 324,
      active: 30,
      completed: 3,
      suspended: 2,
      terminated: 0,
      cancelled: 541,
      finalised: 178,
      legalAction: 0,
      contractCancelled: 1,
      disputed: 2,
      total: 0,
    },
    // small sample rows to show pagination
    {
      product: 'Negotiation (1 to 3 Creditors)',
      awaitingPayment: 1977,
      active: 94,
      completed: 4,
      suspended: 9,
      terminated: 0,
      cancelled: 2513,
      finalised: 382,
      legalAction: 0,
      contractCancelled: 7,
      disputed: 4,
      total: 0,
    },
  ].map((r) => ({ ...r, total: 0 }));

  dataSource = new MatTableDataSource<ProductRow>(this.rows);

  // aggregated column totals
  totals: Partial<Record<keyof ProductRow, number>> = {};

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // compute totals initially
    this.computeTotals();
    // recompute totals when filter changes (filteredData changes)
    this.dataSource.connect().subscribe(() => this.computeTotals());
  }

  applyFilter(value: string) {
    const filterValue = value?.trim().toLowerCase() ?? '';
    this.dataSource.filter = filterValue;
  }

  private computeTotals() {
    const rows = this.dataSource.filteredData || [];
    // zero totals
    const cols = ['awaitingPayment', 'active', 'completed', 'suspended', 'terminated', 'cancelled', 'finalised', 'legalAction', 'contractCancelled', 'disputed', 'total'] as (keyof ProductRow)[];
    // recompute each row total
    rows.forEach((r) => {
      r.total =
        (r.awaitingPayment || 0) +
        (r.active || 0) +
        (r.completed || 0) +
        (r.suspended || 0) +
        (r.terminated || 0) +
        (r.cancelled || 0) +
        (r.finalised || 0) +
        (r.legalAction || 0) +
        (r.contractCancelled || 0) +
        (r.disputed || 0);
    });

    // totals per column
    const totals: Partial<Record<keyof ProductRow, number>> = {};
    cols.forEach((c) => (totals[c] = rows.reduce((acc, r) => acc + ((r[c] as number) || 0), 0)));
    this.totals = totals;
  }

  // optional programmatic sorting helper (if you want default sort)
  sortData(sortState: Sort) {
    // leave MatSort to handle native sorting; we included sort in table
  }
}
