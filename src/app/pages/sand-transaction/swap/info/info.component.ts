import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { SwapService } from '@app/core/services/http/sand-transaction/swap/swap.service';
import { PageHeaderType } from '@app/shared/components/page-header/page-header.component';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzModalService } from 'ng-zorro-antd/modal';
import { finalize } from 'rxjs';
// import { TransactionSwapService } from 'src/app/service/transaction-swap/transaction-swap.service';
import { SignatureComponent } from '../signature/signature.component';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.less']
})
export class InfoComponent implements OnInit {
  @ViewChild('headerExtra', { static: false }) headerExtra!: TemplateRef<NzSafeAny>;
  @ViewChild('headerContent', { static: false }) headerContent!: TemplateRef<NzSafeAny>;
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '',
    breadcrumb: [],
    extra: '',
    desc: '',
    footer: ''
  };
  datailStatus = false;
  isLoading = false;
  listOfData: any[] = [];
  infoData: any;
  channelType = '';
  constructor(private swapService: SwapService,private modalService: NzModalService) { }
  ngAfterViewInit(): void {
    this.pageHeaderInfo = {
      title: `Detail`,
      breadcrumbs: [
        {name: 'Transaction Management'},
        {name: 'Swap', url: '/sand-box/sand-transaction/swap'},
        {name: 'Detail'}
      ],
      extra: this.headerExtra,
      desc: this.headerContent,
      footer: ''
    };
  }

  ngOnInit(): void {
    this.getList();
  }
  getList() {
    this.isLoading = false;
    this.listOfData = JSON.parse(sessionStorage.getItem('query-data')!);
    this.listOfData.map((item:any) => {
      if (item.channelFee === 1) {
        this.channelType = '(' + item.channelCurrency + '-' + item.channelPlatform + ')';
      } else {
        this.channelType = '';
      }
    })
    // this.transactionSwapService.search(JSON.parse(sessionStorage.getItem('query')) ).pipe(finalize(() => this.isLoading = false)).subscribe(_ => {
    //   if (_.code === 0) {
    //     this.listOfData = _.data;
    //   }
    // });
  }
  onDetail(data: any) {
    // sessionStorage.setItem('detail', JSON.stringify(data) );
    this.infoData = data;
    // this.router.navigate(['sandBox/transaction/swap/info']);
    this.datailStatus = true;
  }
  onSignture(data: any) {
    this.modalService.create({
      nzTitle: 'Simulated Signature',
      nzContent: SignatureComponent,
      nzWidth: '60%',
      nzMaskClosable: false,
      nzComponentParams: { info: data,form: JSON.parse(sessionStorage.getItem('query')!) },
      nzFooter: null
    });
  }
  onBack() {
    this.datailStatus = false;
  }
}
