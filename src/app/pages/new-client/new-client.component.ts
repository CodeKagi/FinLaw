import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Subscription } from 'rxjs';

interface ProductOption {
  id: string;
  title: string;
  description?: string;
}

@Component({
  selector: 'app-new-client',
  standalone: false,
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.scss'],
})
export class NewClientComponent implements OnInit, OnDestroy {
  @ViewChild('stepper') stepper!: MatStepper;

  form!: FormGroup;
  private subs: Subscription[] = [];

  // PRODUCT LIST
  productOptions: ProductOption[] = [
    { id: 'CIR', title: 'Credit Interpretation Report (Compuscan/XDS)' },
    { id: 'B_LEGAL_ASSESS', title: 'B-Legal: Affordable Distribution (Assessment)' },
    { id: 'B_LEGAL_CREDITOR', title: 'B-Legal: Affordable Distribution (Creditor)' },
    { id: 'DEBT_REVIEW', title: 'Debt Review Assessment' },
    { id: 'DEBT_CANCEL_SINGLE', title: 'Debt Review Cancellation (Single)' },
    { id: 'RESTRUCTURING', title: 'Re-Structuring (Assessment)' },
    { id: 'NEGOTIATION', title: 'Negotiation (1 to 3 Creditors)' },
    { id: 'ADMIN_ORDER', title: 'Admin Order Assessment' },
  ];

  // STEP 1 OPTIONS
  howOptions = [
    { value: 'referral', label: 'Referral from Affiliate' },
    { value: 'client', label: 'Referral from another client' },
  ];

  affiliateOptions = [
    { value: 'cashFin', label: 'Cash Fin' },
    { value: 'leads', label: 'Leads "R" Us' },
  ];

  titleOptions = [
    { value: 'mr', label: 'Mr' },
    { value: 'mrs', label: 'Mrs' },
    { value: 'ms', label: 'Ms' },
    { value: 'dr', label: 'Dr' },
  ];

  provinceOptions = [
    { value: 'gp', label: 'Gauteng' },
    { value: 'wc', label: 'Western Cape' },
    { value: 'kzn', label: 'KwaZulu-Natal' },
  ];

  provinceToCities: { [key: string]: { value: string; label: string }[] } = {
    gp: [
      { value: 'jhb', label: 'Johannesburg' },
      { value: 'ptm', label: 'Pretoria' },
      { value: 'mid', label: 'Midrand' },
    ],
    wc: [
      { value: 'ct', label: 'Cape Town' },
      { value: 'pz', label: 'Paarl' },
    ],
    kzn: [
      { value: 'dur', label: 'Durban' },
      { value: 'pm', label: 'Pietermaritzburg' },
    ],
  };

  cityOptions: { value: string; label: string }[] = [];

  bankOptions = [
    { value: 'nedbank', label: 'Nedbank' },
    { value: 'fnb', label: 'FNB' },
    { value: 'capitec', label: 'Capitec' },
    { value: 'bidvest', label: 'Bidvest' },
  ];

  payDayOptions: number[] = Array.from({ length: 31 }, (_, i) => i + 1);

  constructor(private fb: FormBuilder) {}

  // ============================================================
  // INIT FORM
  // ============================================================

  ngOnInit(): void {
    this.form = this.fb.group({
      // STEP 1
      step1: this.fb.group({
        howDidYouHear: ['', Validators.required],
        affiliate: [''],
        affiliateNotes: [''],
      }),

      // STEP 2 PERSONAL DETAILS
      personal: this.fb.group({
        title: ['', Validators.required],
        surname: ['', Validators.required],
        firstNames: ['', Validators.required],
        initials: ['', Validators.required],
        idNumber: ['', Validators.required],
        maritalStatus: ['', Validators.required],
        language: ['', Validators.required],
        gender: ['', Validators.required],
        occupation: ['', Validators.required],
        employer: ['', Validators.required],
        employerAddress: [''],

        province: ['', Validators.required],
        city: ['', Validators.required],

        code: [''],
        homeAddress: ['', Validators.required],
        postalAddress: [''],

        telWork: [''],
        telHome: [''],
        cell: ['', Validators.required],
        whatsappSameAsCell: [false],
        whatsapp: [''],

        telNextOfKin: ['', Validators.required],
        email: ['', Validators.email],

        authorizeCreditCheck: ['no', Validators.required],
      }),

      // BANK DETAILS
      bank: this.fb.group({
        accountOwner: ['', Validators.required],
        bankName: ['', Validators.required],
        accountNo: ['', Validators.required],
        accountType: ['', Validators.required],
      }),

      // STEP 3 PRODUCTS
      products: this.fb.array([]),

      // STEP 4 PAYMENT
      payment: this.fb.group({
        option: ['debit', Validators.required],
        firstPayment: ['first', Validators.required],
      }),

      confirm: this.fb.group({}),
    });

    // GROUP PERSONAL + BANK INTO STEP2 WRAPPER
    this.form.setControl(
      'step2',
      this.fb.group({
        personal: this.form.get('personal'),
        bank: this.form.get('bank'),
      }),
    );

    this.form.setControl(
      'salary',
      this.fb.group({
        grossSalary: ['', Validators.required],
        payDay: ['', Validators.required],
        debitDay: [''],
      }),
    );

    this.initProductsArray();
    this.setupAffiliateLogic();
    this.setupWhatsAppLink();
    this.setupProvinceCitySync();
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }

  // ============================================================
  // GETTERS
  // ============================================================

  get step1Group(): FormGroup {
    return this.form.get('step1') as FormGroup;
  }
  get personalGroup(): FormGroup {
    return this.form.get('personal') as FormGroup;
  }
  get bankGroup(): FormGroup {
    return this.form.get('bank') as FormGroup;
  }
  get step2Group(): FormGroup {
    return this.form.get('step2') as FormGroup;
  }
  get productsArray(): FormArray {
    return this.form.get('products') as FormArray;
  }
  get paymentGroup(): FormGroup {
    return this.form.get('payment') as FormGroup;
  }

  get hasSelectedProducts(): boolean {
    return this.productsArray.controls.some((c) => c.get('selected')?.value);
  }

  get salaryGroup(): FormGroup {
    return this.form.get('salary') as FormGroup;
  }

  getProductTitle(productId: string): string {
    const product = this.productOptions.find((p) => p.id === productId);
    return product ? product.title : '';
  }

  // ============================================================
  // INIT PRODUCTS
  // ============================================================

  private initProductsArray() {
    this.productOptions.forEach((p) => {
      this.productsArray.push(
        this.fb.group({
          id: [p.id],
          selected: [false],
          productInfo: this.fb.group({
            grossSalary: [''],
            netSalary: [''],
            monthlyLivingExpenses: [''],
            surplusAmount: [''],
            monthlyInstallments: [''],
            affordPerMonth: [''],
            savingsToSettle: [''],

            negotiationType: [''],
            creditor1: [''],
            creditor2: [''],
            creditor3: [''],

            notes: [''],
          }),
        }),
      );
    });
  }

  // ============================================================
  // STEP 1 AFFILIATE VALIDATION
  // ============================================================

  private setupAffiliateLogic() {
    const howCtrl = this.step1Group.get('howDidYouHear')!;
    const affiliateCtrl = this.step1Group.get('affiliate')!;

    this.subs.push(
      howCtrl.valueChanges.subscribe((val) => {
        if (val === 'referral') {
          affiliateCtrl.setValidators([Validators.required]);
        } else {
          affiliateCtrl.clearValidators();
          affiliateCtrl.setValue('');
        }
        affiliateCtrl.updateValueAndValidity();
      }),
    );
  }

  // ============================================================
  // WHATSAPP SYNC LOGIC
  // ============================================================

  private setupWhatsAppLink() {
    const cell = this.personalGroup.get('cell')!;
    const wa = this.personalGroup.get('whatsapp')!;
    const same = this.personalGroup.get('whatsappSameAsCell')!;

    this.subs.push(
      same.valueChanges.subscribe((val) => {
        if (val) {
          wa.setValue(cell.value);
          wa.disable({ emitEvent: false });
        } else {
          wa.enable({ emitEvent: false });
        }
      }),
    );

    this.subs.push(
      cell.valueChanges.subscribe((val) => {
        if (same.value) wa.setValue(val);
      }),
    );
  }

  // ============================================================
  // PROVINCE → CITY SYNC
  // ============================================================

  private setupProvinceCitySync() {
    const provCtrl = this.personalGroup.get('province')!;
    const cityCtrl = this.personalGroup.get('city')!;

    this.subs.push(
      provCtrl.valueChanges.subscribe((prov) => {
        this.cityOptions = this.provinceToCities[prov] || [];
        if (this.cityOptions.length === 0) {
          cityCtrl.clearValidators();
          cityCtrl.setValue('');
        } else {
          cityCtrl.setValidators([Validators.required]);
        }
        cityCtrl.updateValueAndValidity();
      }),
    );
  }

  // ============================================================
  // PAYMENT DESCRIPTION
  // ============================================================

  getPaymentDescription(option: string): string {
    if (option === 'debit') {
      return `Total contract amount: R 1,000.00
, do you agree that you are indebted to FinLaw SA for an amount of R 1,000.00 ?
Do you authorise FinLaw SA to issue and deliver payment instructions to your banker for collection?
Do you authorize FinLaw SA to do a credit check on your behalf?`;
    }

    return `Total contract amount: R 1,000.00
, do you agree that you are indebted to FinLaw SA for an amount of R 1,000.00 ?`;
  }

  // ============================================================
  // STEP NAVIGATION
  // ============================================================

  saveDraft() {
    console.log('Draft saved:', this.form.value);
  }

  next(stepper: MatStepper) {
    stepper.next();
  }

  previous(stepper: MatStepper) {
    stepper.previous();
  }

  // ============================================================
  // SUBMIT
  // ============================================================

  submit() {
    if (!this.form.valid) {
      console.warn('Form invalid', this.form.value);
      return;
    }

    const payload = {
      step1: this.step1Group.value,
      personal: this.personalGroup.value,
      bank: this.bankGroup.value,
      products: this.productsArray.value.filter((p: any) => p.selected),
      payment: this.paymentGroup.value,
    };

    console.log('FINAL PAYLOAD:', payload);
  }
}
