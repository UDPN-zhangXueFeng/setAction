interface Result {
  // tr 1 still sw 2
  type: number;
  data: Array<Data>
}
interface Data {
  key: string;
  status: number;
  date: string;
  // show color 1 blue 2 red 3 gray
  color: number
  // whether there are nodes 4 or 7 nodes
  is: Boolean;
  fee: string;
  hash: string;
}
export class TimeLine {
  protected statusObjVnSw = {
    1: 'Pending',
    2: 'TN1 processing',
    3: 'TN1  successfully',
    4: 'TN1 failprocesseded',
    5: 'TN2 processing',
    6: 'TN2 processed successfully',
    7: 'TN2 failed',
    8: 'Refunding',
    9: 'Refund successful',
    10: 'Refund failed',
    11: 'Revoke sucessful'
  }
  protected statusObjVnTr = {
    1: 'Pending',
    2: 'TN1 processing',
    3: 'TN1  successfully',
    4: 'TN1 failprocesseded',
    8: 'Refunding',
    9: 'Refund successful',
    10: 'Refund failed',
    11: 'Revoke sucessful'
  }
  protected statusObjBnTr = {
    1: 'Pending',
    2: 'TN1 processing',
    3: 'TN1  successfully',
    4: 'TN1 failprocesseded',
    8: 'Refunding',
    9: 'Refund successful',
    10: 'Refund failed',
    11: 'Revoke sucessful',
    2000: 'BN Init(local init)',
    2005: 'submited vn'
  }

  protected statusObjBnSw = {
    1: 'Pending',
    2: 'TN1 processing',
    3: 'TN1  successfully',
    4: 'TN1 failprocesseded',
    5: 'TN2 processing',
    6: 'TN2 processed successfully',
    7: 'TN2 failed',
    8: 'Refunding',
    9: 'Refund successful',
    10: 'Refund failed',
    11: 'Revoke sucessful',
    2000: 'BN Init(local init)',
    2005: 'submited vn'
  }
  private data: any;
  doData(data: any) {
    // determine whether it is vn or bn
    if (data.hasOwnProperty('transType')) { // bn
      this.data = data.outTransactionHistoryList;
      if(this.data.length === 0){
        return [];
      }
      return this.setData(data.transType === 'Transfer' ? this.statusObjBnTr : this.statusObjBnSw);
    } else { // vn
      this.data = data.details;
      if(this.data.length === 0){
        return [];
      }
      return this.setData(data.transactionType === 1 ? this.statusObjVnTr : this.statusObjVnSw);
    }
  }
  private setData(status: any) {
    let arrData: Array<Data> = [];
    for (let stat in status) {
      arrData.push({
        key: this.data[0].transactionKey,
        status: this.data.some((v: any) => v.historyStatus == stat) ? this.data.find((v: any) => v.historyStatus == stat).historyStatus : stat,
        date: this.data.some((v: any) => v.historyStatus == stat) ? this.data.find((v: any) => v.historyStatus == stat).receivedDate : '--',
        color: this.setNodeColor(stat),
        is: this.setNodeIs(stat),
        fee: this.data.some((v: any) => v.historyStatus == stat) ? this.data.find((v: any) => v.historyStatus == stat).transactionFee : '--',
        hash: this.data.some((v: any) => v.historyStatus == stat) ? this.data.find((v: any) => v.historyStatus == stat).txnHash : '--'
      })
    }
    return arrData;
  }
  private setNodeIs(index: any): boolean {
    let disShow: Array<string> = ['4', '7', '8', '9', '10', '11'];
    if (this.data.some((v: any) => v.historyStatus == index)) {
      return true;
    }
    if (disShow.includes(index.toString())) {
      return false;
    }
    return true;
  }
  private setNodeColor(index: any) {

    if (this.data.some((v: any) => v.historyStatus == '4') || this.data.some((v: any) => v.historyStatus == '7')) {
      if(index == '4' || index == '7'){
        return 2;
      }
    }
    if (this.data.some((v: any) => v.historyStatus == index)) {
      return 1;
    }
    return 3;
  }
}
