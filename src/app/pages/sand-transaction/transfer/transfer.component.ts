import { Component, TemplateRef, ViewChild } from '@angular/core';
import { PageHeaderType } from '@app/shared/components/page-header/page-header.component';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { finalize, filter, fromEvent, map, debounceTime, startWith, combineLatest, of, Subscription } from 'rxjs';
// import { swapService } from 'src/app/service/transaction-swap/transaction-swap.service';
// import { transferService } from 'src/app/service/transaction-transfer/transaction-transfer.service';
import { TransferService } from '@app/core/services/http/sand-transaction/transfer/transfer.service';
import { SwapService } from '@app/core/services/http/sand-transaction/swap/swap.service';
import { SignatureComponent } from './signature/signature.component';

@Component({
  selector: 'a15-udpn-tem-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.less'],
})
export class TransferComponent {
  @ViewChild('headerExtra', { static: false }) headerExtra!: TemplateRef<NzSafeAny>;
  @ViewChild('headerContent', { static: false }) headerContent!: TemplateRef<NzSafeAny>;
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '',
    breadcrumb: [],
    extra: '',
    desc: '',
    footer: ''
  };
  isLoading = false;
  validateForm!: FormGroup;
  kyes = '';
  values = '';
  nzOptions: any[] = [];
  targetNzOptions: any[] = [];
  showStatus = true;
  datailStatus = false;
  listOfData: any[] = [];
  infoData: any;
  senderStatus = false;
  senderDiArr: any[] = [];
  beneficiaryBankStatus = false;
  beneficiaryBankStatusArr: any[] = [];
  subscription!: Subscription;
  currency_change = '';
  sendAccountArr: any = [];
  sendAccountSelect = '';
  senderDidStatus = ''
  constructor(private fb: FormBuilder, private swapService: SwapService, private router: Router, private modalService: NzModalService, private transferService: TransferService) { }
  ngAfterViewInit(): void {
    this.fromEventAssoc();
    this.fromEventSenderAccount();
    this.fromEventSenderDid();
    this.fromEventCurrency();
    this.pageHeaderInfo = {
      title: `Transfer`,
      breadcrumb: ['Transaction Management', 'Transfer'],
      extra: this.headerExtra,
      desc: this.headerContent,
      footer: ''
    };
  }

  ngOnInit() {
    // get a platform type
    // this.getPalt();
    this.initValidateFrom();
  }
  fromEventSenderDid() {
    this.validateForm.get('senderDid')?.valueChanges.subscribe(res => {
      this.nzOptions = [];
      if (res === null || res === '') {
        this.senderStatus = false;
        this.validateForm.get('blockChain')?.reset()
        this.validateForm.get('senderAccount')?.reset();
        this.sendAccountArr = [];
        this.currency_change = '';
      } else {
        this.validateForm.get('blockChain')?.reset()
        this.validateForm.get('senderAccount')?.reset();
        this.sendAccountArr = [];
        this.currency_change = '';
        this.transferService.getCurrency({ did: res }).subscribe((currencyList: any) => {
          if (currencyList.data.length > 0) {
            let option: any = [];
            currencyList.data.forEach((element: any) => {
              let optionChildren: any = [];
              element.platformList.forEach((item: any) => {
                optionChildren.push({
                  value: item,
                  label: item,
                  isLeaf: true
                });
              })
              option.push({
                value: element.currencyType,
                label: element.currencyType,
                children: optionChildren
              });
              this.nzOptions = option;
            });
            this.nzOptions.length == 1 ?
              this.validateForm.get('blockChain')?.setValue([this.nzOptions[0].value, this.nzOptions[0].children[0].value]) : '';
          } else {
            this.nzOptions = [];
          }
        })
      }
    })
    this.validateForm.get('beneficiaryAccount')?.valueChanges.subscribe(res => {
      if (res === null) {
        this.beneficiaryBankStatus = false;
      }
    })
  }
  fromEventSenderAccount() {
    const el: any = document.getElementById('sender1');
    const inputValue = fromEvent(el, 'input');
    this.subscription = inputValue.pipe(
      map((e: KeyboardEvent | any) => (e.target as HTMLInputElement).value),
      // filter(text => text.length >= 1),
      debounceTime(1000),
    ).subscribe(data => {

      let blockChainVal = this.validateForm.get('blockChain')?.value;
      this.swapService.getAccountVal({
        businessAccount: data,
        currencyType: blockChainVal.length > 0 ? blockChainVal[0] : "",
        platformType: blockChainVal.length > 0 ? blockChainVal[1] : ""
      }).subscribe((res: any) => {
        if (res.code === 0) {
          // view whether the did exists value
          let beneficiaryAccountVal = this.validateForm.get('beneficiaryAccount')?.value;
          // if (res.data.length > 0 && beneficiaryAccountVal !== null && beneficiaryAccountVal.length > 0) {
          //   this.modalService.confirm({
          //     nzTitle: '<i>check the input value of the Beneficiary Account is it covered?</i>',
          //     nzOnOk: () => {
          //       this.beneficiaryBankStatus = true;
          //       this.beneficiaryBankStatusArr = res.data;
          //       res.data.length > 0 ?
          //         this.validateForm.get('beneficiaryAccount').setValue(res.data[0].currencyAccount) : this.beneficiaryBankStatus = false;
          //     }
          //   });
          // } else {
          this.beneficiaryBankStatus = true;
          this.beneficiaryBankStatusArr = res.data;
          res.data.length > 0 ?
            this.validateForm.get('beneficiaryAccount')?.setValue(res.data[0].currencyAccount) : this.beneficiaryBankStatus = false;
          // }
        }
      })
    });
  }
  fromEventCurrency() {
    this.validateForm.get('blockChain')?.valueChanges.subscribe(res => {
      if (Array.isArray(res) && res.length == 0) {
        this.validateForm.get('senderAccount')?.reset();
        this.sendAccountArr = [];
        this.currency_change = '';
      }
      if (res !== null) {
        this.currency_change = res[0];
        // check whether the did exists
        let senderDidVal = this.validateForm.get('senderDid')?.value;
        if (senderDidVal.length > 0) {
          this.transferService.getAccounts(
            {
              did: senderDidVal,
              currencyType: res[0],
              platformType: res[1],
            }
          ).subscribe((result: any) => {
            // currencyAccount
            let senderAccountVal = this.validateForm.get('senderAccount')?.value;
            // if(senderAccountVal !== null && senderAccountVal !== '') {
            //   this.modalService.confirm({
            //     nzTitle: '<i>check the input value of the Send Account is it covered?</i>',
            //     nzOnOk: () => {

            //       this.sendAccountArr = result.data;
            //       this.sendAccountArr.forEach(item=>{
            //         if(item.isDefault === 1){
            //           this.sendAccountSelect = item.currencyAccount;
            //         }
            //       })
            //     }
            //   });
            //  } else {
            this.sendAccountArr = result.data;
            this.sendAccountArr.forEach((item: any) => {
              if (item.isDefault === 1) {
                this.sendAccountSelect = item.currencyAccount;
              } else {
                this.validateForm.get('senderAccount')?.reset();
              }
            })
            // }
          })
        }
      }
    })
  }
  fromEventAssoc() {
    const el: any = document.getElementById('assoc1');
    const inputValue = fromEvent(el, 'input');
    this.subscription = inputValue.pipe(
      map((e: KeyboardEvent | any) => (e.target as HTMLInputElement).value),
      // filter(text => text.length >= 1),
      debounceTime(1000),
    ).subscribe(data => {
      this.senderDidStatus = 'validating';
      this.swapService.getDid({ businessAccount: data }).subscribe((res: any) => {
        if (res.code === 0) {
          this.senderDidStatus = '';
          // view whether the did exists value
          let senderDidVal = this.validateForm.get('senderDid')?.value;
          if (res.data.length === 0) {
            this.validateForm.reset();
            this.validateForm.get('senderBank')?.setValue(data);
            this.validateForm.get('beneficiaryType')?.setValue('1');
            this.sendAccountArr = [];
            this.currency_change = '';
          }
          this.validateForm.get('blockChain')?.reset()
          this.validateForm.get('senderAccount')?.reset();
          this.validateForm.get('senderDid')?.reset();
          this.sendAccountArr = [];
          this.currency_change = '';
          // if (res.data.length > 0 && senderDidVal !== null && senderDidVal.length > 0) {
          //   this.modalService.confirm({
          //     nzTitle: '<i>check the input value of the did is it covered?</i>',
          //     nzOnOk: () => {
          //       this.senderStatus = true;
          //       this.senderDiArr = res.data;
          //       res.data.length > 0 ?
          //         res.data.length == 1 ?
          //           this.validateForm.get('senderDid').setValue(res.data[0].did) : '' : this.senderStatus = false;
          //     }
          //   });
          // } else {
          this.senderStatus = true;
          this.senderDiArr = res.data;
          res.data.length > 0 ?
            res.data.length == 1 ?
              this.validateForm.get('senderDid')?.setValue(res.data[0].did) : '' : this.senderStatus = false;
          // }
        }
      })
    });
  }
  // getPalt() {
  //   this.swapService.fetchTypes().subscribe(
  //     data => {
  //       let option = [];
  //       data.data.forEach(element => {
  //         let optionChildren = [];
  //         element.platformList.forEach(item => {
  //           optionChildren.push({
  //             value: item,
  //             label: item,
  //             isLeaf: true
  //           });
  //         });
  //         option.push({
  //           value: element.currencyName,
  //           label: element.currencyName,
  //           children: optionChildren
  //         });

  //       });
  //       this.nzOptions = option;
  //       this.targetNzOptions = option;
  //     }
  //   );
  // }
  clearNoNum(obj: any, digits: any, dec: any) {
    console.log(digits);
    var temp = obj.target.value;
    var key = obj.key;
    obj = obj.target;
    if (temp < 0) {
      obj.value = "";
      return;
    }
    if (key === 'e') {
      obj.value = "";
      return;
    }
    var posDot = temp.lastIndexOf(".");
    if (posDot < 0) {
      if (temp.length <= digits) {
        return;
      } else {
        if (temp.length > digits) {
          obj.value = temp.substring(0, digits);
        }
        return;
      }

    }
    var lastDot = temp.indexOf(".");
    if (posDot != lastDot) {
      obj.value = "";
      return;
    }
    if (posDot > digits) {
      if (temp.length > digits) {
        obj.value = temp.substring(0, digits);
      }
      return;
    }
    if (temp.length - posDot - 1 > dec) {
      obj.value = temp.substring(0, posDot + dec + 1);
      return;
    }
  }
  resetForm(): void {
    this.validateForm.reset();
    this.validateForm.get('beneficiaryType')?.setValue('1');
    // this.getPalt();
    this.sendAccountArr = [];
    this.currency_change = '';
  }
  onSubmitForm(): void {
    // sessionStorage.setItem('query',JSON.stringify(this.validateForm.value));
    // this.router.navigate(['/sandBox/transaction/transfer/info']);
    this.isLoading = true;
    if (this.validateForm.valid) {
      this.transferService.search(this.validateForm.value).pipe(finalize(() => this.isLoading = false)).subscribe((_: any) => {
        if (_.code === 0) {
          // this.listOfData = _.data;
          sessionStorage.setItem('query', JSON.stringify(this.validateForm.value));
          sessionStorage.setItem('query-data', JSON.stringify(_.data));
          this.router.navigate(['/sand-box/sand-transaction/transfer/info']);
        }
      });
    }
  }
  private initValidateFrom() {
    this.validateForm = this.fb.group({
      // senderBank: ['111'],
      // senderDid: ['did:udpn:4LVtwrkP81t8m9W7uhQ4GfY6qapi', [Validators.required]],
      // blockChain: ['', [Validators.required]],
      // senderAccount: ['0x78AB5678CDF8907654909089765432345906AAAC', [Validators.required]],
      // senderAmount: ['', [Validators.required]],
      // beneficiaryType: ['1', [Validators.required]],
      // beneficiaryName: ['222', [Validators.required]],
      // beneficiaryBank: ['333'],
      // beneficiaryAccount: ['0x78AB5678CDF8907654909089765432345906AAAD', [Validators.required]],
      senderBank: [''],
      senderDid: ['', [Validators.required]],
      blockChain: ['', [Validators.required]],
      senderAccount: ['', [Validators.required]],
      senderAmount: ['', [Validators.required]],
      beneficiaryType: ['1', [Validators.required]],
      beneficiaryName: [''],
      beneficiaryBank: ['', [Validators.required]],
      beneficiaryAccount: ['', [Validators.required]],
    });
  }

  onChaneg(e: number) {
    if (e == 1) {
      this.showStatus = true;
      this.validateForm.get("beneficiaryBank")?.setValue('');
    } else {
      this.showStatus = false;
      // copy to avoid verification
      this.validateForm.get("beneficiaryBank")?.setValue('none');
    }
  }

  onDetail(data: any) {
    // sessionStorage.setItem('detail', JSON.stringify(data) );
    this.infoData = data;
    // this.router.navigate(['sandBox/transaction/swap/info']);
    this.datailStatus = true;
  }
  onBack() {
    this.datailStatus = false;
  }
  onSignture(data: any) {
    this.modalService.create({
      nzTitle: 'Simulated Signature',
      nzContent: SignatureComponent,
      nzWidth: '60%',
      nzMaskClosable: false,
      nzComponentParams: { info: data, form: this.validateForm.value },
      nzFooter: null
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
