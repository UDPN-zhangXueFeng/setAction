import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { finalize, interval, timer } from 'rxjs';
// import { swapService } from 'src/app/service/transaction-swap/transaction-swap.service';
import { Base64 } from 'js-base64';
import { SwapService } from '@app/core/services/http/sand-transaction/swap/swap.service';

@Component({
  selector: 'app-signature',
  templateUrl: './signature.component.html',
  styleUrls: ['./signature.component.less']
})
export class SignatureComponent implements OnInit {
  @Input() info: any;
  @Input() form: any;
  load = false;
  singStatus = false;
  singStatusz = false;
  isLoadingOne = false;
  reg = '';
  validateForm!: FormGroup;
  confirmModal?: NzModalRef;
  tnSecuryMsg = '';
  oldTnSecuryMsg = '';
  codes = '';
  codesz = '';
  singSec = false;
  singSecStatus = false;
  subButtonStatus = false;
  singVal = '';
  keyType = false;
  constructor(private router: Router, private modalService: NzModalService, private modal: NzModalRef, private fb: FormBuilder, private swapService: SwapService) { }

  ngOnInit(): void {
    this.getSigmMsg();
    this.reg =
      this.info.channelFeePrecision > 0
        ? `^[+]?\\d+(?:\\.\\d{1,` + this.info.channelFeePrecision + `})?$`
        : '';
    this.validateForm = this.fb.group({
      key: ['', [Validators.required, this.keyValidator]],
      maxChannelFee: ['', [this.maxChannelFeeValidator]]
    });
  }
  getSigmMsg() {
    this.load = false;
    this.codes = `
    <div class="code">{</div>
    <div class="u-margin-l-20 my-ss" style="background: aqua;">"message":
    <!--<b>{"gas":"${String(this.info.totalAmount).replace(/\d{1,3}(?=(\d{3})+(\.|$))/gy, '$&,')}","from":"${this.info.fromAcc}","to":"${this.info.toAcc}","value":"${String(this.info.toAmount).replace(/\d{1,3}(?=(\d{3})+(\.|$))/gy, '$&,')}","nonce":"0","gasPrice":"200"}",</b>,-->
    </div>
    <div class="u-margin-l-20">"Source TN Code": "${this.info.nodeNumber}",</div>
    <div class="u-margin-l-20">"Amount": "${String(this.info.transCurrentAmt).replace(/\d{1,3}(?=(\d{3})+(\.|$))/gy, '$&,')}",</div>
    <div class="u-margin-l-20">"serviceFee": ${String(this.info.serviceFee).replace(/\d{1,3}(?=(\d{3})+(\.|$))/gy, '$&,')},</div>
    <div class="u-margin-l-20">"Rate": ${String(this.info.fxRate).replace(/\d{1,3}(?=(\d{3})+(\.|$))/gy, '$&,')},</div>
    <div class="u-margin-l-20">"sourceAccountAddress": "${this.form.senderAccount}",</div>
    <div class="u-margin-l-20">"sourceCurrencyType": "${this.form.blockChain[0]}/${this.form.blockChain[1]}",</div>
    <div class="u-margin-l-20">"TotalAmount": ${String(this.info.totalAmount).replace(/\d{1,3}(?=(\d{3})+(\.|$))/gy, '$&,')},</div>
    <div class="u-margin-l-20">"target TN Code": ${this.info.targetTnCode},</div>
    <div class="u-margin-l-20">"targetAccountAddress": "${this.form.beneficiaryAccount}",</div>
    <div class="u-margin-l-20">"targetCurrencyType": "${this.info.toCurrencyType}/${this.info.toPlatformType}",</div>
    <div class="u-margin-l-20">"userDid": "${this.form.senderDid}"</div>
    <div class="u-margin-l-20">"IsKYC": "${this.info.isKycRequest === 1 ? 'Yes' : 'No'}"</div>
  <div>}</div>
    `;
  }
  onSinge() {
    this.singSec = true;
    this.singSecStatus = true;
    this.singVal = Base64.encode(this.randomString(32));
    const timerSub = timer(1000);
    timerSub.subscribe(number => {
      this.singSecStatus = false;
      this.subButtonStatus = true;
    });
  }
  destroyModal(): void {
    this.modal.destroy();
  }
  submitForm() {
    this.singStatus = true;
    this.singStatusz = true;
    const pars = {
      privateKey: this.validateForm.get('key')?.value,
      serviceFee: this.info.serviceFee,
      sourceAccountAddress: this.info.fromAcc,
      transAmount: this.info.transCurrentAmt,
      originalTnCode: this.info.originalTnCode,
      isSwap: true,
      targetAccountAddress: this.info.toAcc,
    }

    // setTimeout(() => {
    //   this.singStatus = false;
    //   this.codesz = `
    //   <div class="code">{</div>
    //     <div class="u-margin-l-20" style="width: 100px;display:block;word-break: break-all;word-wrap: break-word;">"message":"${this.randomString(64)},"tnSecuryMsg":"<b>${this.randomString(32)}</b>"
    //    ,</div>
    //    <div class="u-margin-l-20">"TN Code": "${this.info.nodeNumber}",</div>
    //    <div class="u-margin-l-20">"serviceFee": ${this.info.serviceFee},</div>
    //    <div class="u-margin-l-20">"sourceAccountAddress": "${this.form.senderAccount}",</div>
    //    <div class="u-margin-l-20">"sourceCurrencyType": "${this.form.blockChain[0]}/${this.form.blockChain[1]}",</div>
    //    <div class="u-margin-l-20">"swapAmount": ${this.info.totalAmount},</div>
    //    <div class="u-margin-l-20">"targetAccountAddress": "${this.form.beneficiaryAccount}",</div>
    //    <div class="u-margin-l-20">"userDid": "${this.form.senderDid}"</div>
    //   <div>}</div>
    //   `;
    //   this.tnSecuryMsg = this.randomString(32);
    // }, 2000);
    this.swapService.getPermit(pars).pipe(finalize(() => this.singStatus = false)).subscribe(datas => {
      if (datas.code === 0) {
        this.tnSecuryMsg = datas.data.permitHash;
        this.onSubmit();
      }
      //   this.codesz = `
      //   <div class="code">{</div>
      //     <div class="u-margin-l-20" style="width: 100px;display:block;word-break: break-all;word-wrap: break-word;">"message":"${this.tnSecuryMsg},"tnSecuryMsg":"<b>${datas.data.permitHash}</b>",
      //    ,</div>
      //    <div class="u-margin-l-20">"TN Code": "${this.info.nodeNumber}",</div>
      //    <div class="u-margin-l-20">"serviceFee": ${this.info.serviceFee},</div>
      //    <div class="u-margin-l-20">"sourceAccountAddress": "${this.form.senderAccount}",</div>
      //    <div class="u-margin-l-20">"sourceCurrencyType": "${this.form.blockChain[0]}/${this.form.blockChain[1]}",</div>
      //    <div class="u-margin-l-20">"TotalAmount": ${this.info.totalAmount},</div>
      //    <div class="u-margin-l-20">"targetAccountAddress": "${this.form.beneficiaryAccount}",</div>
      //    <div class="u-margin-l-20">"targetCurrencyType": "${this.form.targetBlockChain[0]}/${this.form.targetBlockChain[1]}",</div>
      //    <div class="u-margin-l-20">"userDid": "${this.form.senderDid}"</div>
      //    <div class="u-margin-l-20">"IsKYC": "${this.form.isKycRequest=== 1? 'Yes' : 'No'}"</div>
      //  <div>}</div>
      //   `;
      // this.tnSecuryMsg = datas.data.permitHash;
    })
  }
  onSubmit() {
    this.confirmModal = this.modalService.confirm({
      nzTitle: 'Submit',
      nzContent: 'Are you sure to submit?',
      nzOnOk: (res => {
        this.isLoadingOne = true;
        const pars = {
          privateKey: this.validateForm.get('key')?.value,
          serviceFee: this.info.serviceFee,
          sourceAccountAddress: this.info.fromAcc,
          transAmount: this.info.transCurrentAmt,
          originalTnCode: this.info.originalTnCode,
          swap: true,
          targetAccountAddress: this.info.toAcc,
        }
        this.swapService.getPermit(pars).subscribe(datas => {
          if (datas.code === 0) {
            this.tnSecuryMsg = datas.data.permitHash;
            let code = {
              maxChannelFee: this.validateForm.get('maxChannelFee')?.value,
              channelFeePrecision: this.info.channelFeePrecision,
              allowMaxChannelFee: this.info.allowMaxChannelFee,
              channelFee: this.info.channelFee,
              channelCurrency: this.info.channelCurrency,
              channelPlatform: this.info.channelPlatform,
              estimatedChannelFee: this.info.estimatedChannelFee,
              toPlatformType: this.info.toPlatformType,
              fromPlatformType: this.info.formPlatformType,
              did: this.info.did,
              fromCurrencyType: this.info.fromCurrencyType,
              fxRate: this.info.fxRate,
              key: this.info.key,
              originalTnCode: this.info.originalTnCode,
              serviceFee: this.info.serviceFee,
              vnServiceFee: this.info.vnServiceFee,
              originalTnServiceFee: this.info.originalTnServiceFee,
              targetTnServiceFee: this.info.targetTnServiceFee,
              sourceAccountAddress: this.info.fromAcc,
              swapAmount: this.info.transCurrentAmt,
              targetAccountAddress: this.info.toAcc,
              tnSecuryMsg: this.tnSecuryMsg,
              toCurrencyType: this.info.toCurrencyType,
              targetTnCode: this.info.targetTnCode,
              toAmount: this.info.toAmount,
              totalAmount: this.info.totalAmount,
              beneficiaryName: this.info.beneficiaryName,
              beneficiaryType: this.info.beneficiaryType,
              fromBankAccount: this.info.fromBankAccount,
              toBankAccount: this.info.toBankAccount,
            }
            this.swapService.deal(code).pipe(finalize(() => this.isLoadingOne = false)).subscribe(rs => {
              if (rs.code === 0) {
                this.destroyModal();
                this.modalService.success({
                  nzTitle: 'success',
                  nzContent: `<p nz-typography nzCopyable nzCopyText="${rs.data}">The transaction key is:<br> ${rs.data}</p>`,
                }).afterClose.subscribe(_ => {
                  this.router.navigate(['/sandBox/transaction/swap/list']);
                })
                // setTimeout(() => {
                //   this.router.navigate(['/sandBox/transaction/swap/list']);
                // }, 2000);
              }
            })
          }
        })
      })
    });
  }
  private randomString(length: number) {
    var str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for (var i = length; i > 0; --i)
      result += str[Math.floor(Math.random() * str.length)];
    return result;
  }

  keyValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (!(/^[0][x][0-9a-fA-F]{64}$/).test(control.value)) {
      return { regular: true, error: true };
    }
    return {};
  };

  maxChannelFeeValidator = (control: FormControl): { [s: string]: boolean } => {
    if (Validators.pattern(this.reg)(control)) {
      return { regular: true, error: true };
    }
    return {};
  };

  plaintext() {
    this.keyType = !this.keyType;
  }
}
