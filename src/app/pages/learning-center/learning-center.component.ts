import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

export type LearningItemType = 'pdf' | 'html' | 'external';

export interface LearningItem {
  title: string;
  type: LearningItemType;
  url: string;
}

export interface LearningTab {
  key: 'product' | 'other' | 'elearning';
  label: string;
  items: LearningItem[];
}

@Component({
  selector: 'app-learning-center',
  standalone: false,
  templateUrl: './learning-center.component.html',
  styleUrls: ['./learning-center.component.scss'],
})
export class LearningCenterComponent implements OnInit {
  activeTabKey: LearningTab['key'] = 'product';
  searchTerm = '';
  searchControl = new FormControl('');

  tabs: LearningTab[] = [
    // =====================================================
    // PRODUCT INFO (14)
    // =====================================================
    {
      key: 'product',
      label: '',
      items: [
        { title: 'Administration Order Process', type: 'pdf', url: '/assets/pdfs/product/administration-order-process.pdf' },
        { title: 'Credit Bureau Fact Sheet', type: 'pdf', url: '/assets/pdfs/product/credit-bureau-fact-sheet.pdf' },
        { title: 'Credit Bureau Services Fact Sheet', type: 'pdf', url: '/assets/pdfs/product/credit-bureau-services-fact-sheet.pdf' },
        { title: 'Credit Score Booster - What the client receives', type: 'pdf', url: '/assets/pdfs/product/credit-score-booster-client.pdf' },
        { title: 'Credit Score Booster - Workflow', type: 'pdf', url: '/assets/pdfs/product/credit-score-booster-workflow.pdf' },
        { title: 'Debt Review Removal - Info & Workflow', type: 'pdf', url: '/assets/pdfs/product/debt-review-removal.pdf' },
        { title: 'Introduction to Assessments', type: 'pdf', url: '/assets/pdfs/product/introduction-to-assessments.pdf' },
        { title: 'Judgment and Adverse Removal - Workflow', type: 'pdf', url: '/assets/pdfs/product/judgment-adverse-removal.pdf' },
        { title: 'Negotiations and Restructuring Services', type: 'pdf', url: '/assets/pdfs/product/negotiations-restructuring.pdf' },
        { title: 'PrePaid Legal', type: 'pdf', url: '/assets/pdfs/product/prepaid-legal.pdf' },
        { title: 'Prescribed Debt - Workflow', type: 'pdf', url: '/assets/pdfs/product/prescribed-debt.pdf' },
        { title: 'New Sales training - Introduction Phone call -', type: 'pdf', url: '/assets/pdfs/product/new-sales-intro-call.pdf' },
        { title: 'Home', type: 'html', url: '/learning/home' },
        { title: 'Credit Interpretation Report (Compuscan/XDS)', type: 'pdf', url: '/assets/pdfs/product/credit-interpretation-report.pdf' },
      ],
    },

    // =====================================================
    // OTHER INFO (18)
    // =====================================================
    {
      key: 'other',
      label: '',
      items: [
        { title: 'ABSA Bank - App Process', type: 'pdf', url: '/assets/pdfs/banks/absa-app.pdf' },
        { title: 'ABSA Bank - Online Banking Process', type: 'pdf', url: '/assets/pdfs/banks/absa-online.pdf' },
        { title: 'ABSA Bank USSD', type: 'pdf', url: '/assets/pdfs/banks/absa-ussd.pdf' },

        { title: 'Bank of Athens USSD Process', type: 'pdf', url: '/assets/pdfs/banks/bank-of-athens-ussd.pdf' },

        { title: 'Bidvest Bank Online Banking', type: 'pdf', url: '/assets/pdfs/banks/bidvest-online.pdf' },
        { title: 'Bidvest Bank USSD', type: 'pdf', url: '/assets/pdfs/banks/bidvest-ussd.pdf' },

        { title: 'Capitec Bank App', type: 'pdf', url: '/assets/pdfs/banks/capitec-app.pdf' },
        { title: 'Capitec Bank USSD', type: 'pdf', url: '/assets/pdfs/banks/capitec-ussd.pdf' },

        { title: 'FinBond Mutual Bank USSD', type: 'pdf', url: '/assets/pdfs/banks/finbond-ussd.pdf' },

        { title: 'FNB App', type: 'pdf', url: '/assets/pdfs/banks/fnb-app.pdf' },
        { title: 'FNB Online Banking', type: 'pdf', url: '/assets/pdfs/banks/fnb-online.pdf' },
        { title: 'FNB USSD', type: 'pdf', url: '/assets/pdfs/banks/fnb-ussd.pdf' },

        { title: 'Nedbank App', type: 'pdf', url: '/assets/pdfs/banks/nedbank-app.pdf' },
        { title: 'Nedbank USSD', type: 'pdf', url: '/assets/pdfs/banks/nedbank-ussd.pdf' },
        { title: 'Nedbank USSD NI', type: 'pdf', url: '/assets/pdfs/banks/nedbank-ussd-ni.pdf' },

        { title: 'Standard Bank App', type: 'pdf', url: '/assets/pdfs/banks/standard-bank-app.pdf' },
        { title: 'Standard Bank USSD', type: 'pdf', url: '/assets/pdfs/banks/standard-bank-ussd.pdf' },
        { title: 'UBank USSD Process', type: 'pdf', url: '/assets/pdfs/banks/ubank-ussd.pdf' },
      ],
    },

    // =====================================================
    // E-LEARNING (17)
    // =====================================================
    {
      key: 'elearning',
      label: '',
      items: [
        { title: 'Clientflow - Sales Agent Training', type: 'external', url: 'https://learning.clientflow.co.za/sales-agent' },
        { title: 'Clientflow System Training - Client Overview Tab', type: 'external', url: 'https://learning.clientflow.co.za/client-overview' },
        { title: 'Clientflow System Training - Leads Marketplace', type: 'external', url: 'https://learning.clientflow.co.za/leads-marketplace' },
        { title: 'Clientflow System Training - Manage Documents', type: 'external', url: 'https://learning.clientflow.co.za/manage-documents' },
        { title: 'Clientflow System Training - Manage Templates', type: 'external', url: 'https://learning.clientflow.co.za/manage-templates' },
        { title: 'Clientflow System Training - Managing Leads', type: 'external', url: 'https://learning.clientflow.co.za/managing-leads' },
        { title: 'Clientflow System Training - Manager Products', type: 'external', url: 'https://learning.clientflow.co.za/manage-products' },
        { title: 'Clientflow System Training - Navigating a Client File', type: 'external', url: 'https://learning.clientflow.co.za/client-file' },
        { title: 'Clientflow System Training - Navigating Reports', type: 'external', url: 'https://learning.clientflow.co.za/reports' },
        { title: 'Clientflow System Training - Navigating the Dashboard', type: 'external', url: 'https://learning.clientflow.co.za/dashboard' },
        { title: 'Clientflow System Training - Onboarding a new Client', type: 'external', url: 'https://learning.clientflow.co.za/onboarding' },
        { title: 'Clientflow System Training - Sales Agent Lead Inbox', type: 'external', url: 'https://learning.clientflow.co.za/lead-inbox' },
        { title: 'Clientflow System Training - User Management - Activate / Deactivate', type: 'external', url: 'https://learning.clientflow.co.za/users-activate' },
        { title: 'Clientflow System Training - User Management - Add a new user', type: 'external', url: 'https://learning.clientflow.co.za/users-add' },
        { title: 'Clientflow System Training - User Management - Reset a Password', type: 'external', url: 'https://learning.clientflow.co.za/users-reset' },
        { title: 'Compliance Updates - November 2025', type: 'external', url: 'https://learning.clientflow.co.za/compliance-2025' },
        { title: 'Debt Mediation Course', type: 'external', url: 'https://learning.clientflow.co.za/debt-mediation' },
      ],
    },
  ];

  ngOnInit(): void {
    this.updateTabLabels();
  }

  get activeTab(): LearningTab {
    return this.tabs.find((t) => t.key === this.activeTabKey)!;
  }

  get filteredItems(): LearningItem[] {
    const term = this.searchTerm.toLowerCase();
    return this.activeTab.items.filter((item) => item.title.toLowerCase().includes(term));
  }

  setActiveTab(key: LearningTab['key']): void {
    this.activeTabKey = key;
    this.searchTerm = '';
  }

  getIcon(item: LearningItem): string {
    switch (item.type) {
      case 'pdf':
        return 'picture_as_pdf';
      case 'html':
        return 'language';
      case 'external':
        return 'link';
      default:
        return 'insert_drive_file';
    }
  }

  isDownloadable(item: LearningItem): boolean {
    return item.type === 'pdf';
  }
  private updateTabLabels(): void {
    this.tabs = this.tabs.map((tab) => ({
      ...tab,
      label: `${this.getTabTitle(tab.key)} (${tab.items.length})`,
    }));
  }

  private getTabTitle(key: LearningTab['key']): string {
    switch (key) {
      case 'product':
        return 'Product Info';
      case 'other':
        return 'Other Info';
      case 'elearning':
        return 'E-Learning';
      default:
        return '';
    }
  }
}
