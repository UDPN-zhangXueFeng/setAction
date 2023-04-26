/*
使用方法：
accidentTypeOptions: OptionsInterface[];
this.accidentTypeOptions = [...MapPipe.transformMapToArray(MapSet.accidentType)];*/

import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

import { NzSafeAny } from 'ng-zorro-antd/core/types';

export const enum DateFormat {
  Date = 'yyyy-MM-dd',
  DateHour = 'yyyy-MM-dd HH',
  DateTime = 'yyyy-MM-dd HH:mm'
}

export const enum MapKeyType {
  String,
  Number,
  Boolean
}

export const MapSet = {
  sex: {
    0: '女',
    1: '男'
  },
  available: {
    true: '可用',
    false: '禁用'
  },
  isOrNot: {
    true: '是',
    false: '否'
  },
  visible: {
    true: '展示',
    false: '隐藏'
  },
  vnStatus: {
    1: 'Pending',
    2: 'TN1 processing',
    3: 'TN1 processed successfully',
    4: 'TN1 failed',
    5: 'TN2 processing',
    6: 'TN2 processed successfully',
    7: 'TN2 failed',
    8: 'Refunding',
    9: 'Refund successfully',
    10: 'Refund failed',
    11: 'Revoke successfully',
    2000: 'BN Init(local init)',
    2005: 'submitted vn'
  },
  vnType: {
    1: 'Transfer',
    2: 'Swap'
  }
};

export interface MapItem {
  label: string;
  value: NzSafeAny;
}

@Pipe({
  name: 'map'
})
export class MapPipe implements PipeTransform {
  private datePipe: DatePipe = new DatePipe('en-US');
  private mapObj = MapSet;

  static transformMapToArray(data: NzSafeAny, mapKeyType: MapKeyType = MapKeyType.Number): MapItem[] {
    return Object.keys(data || {}).map(key => {
      let value: NzSafeAny;
      switch (mapKeyType) {
        case MapKeyType.Number:
          value = Number(key);
          break;
        case MapKeyType.Boolean:
          value = key === 'true';
          break;
        case MapKeyType.String:
        default:
          value = key;
          break;
      }
      return { value, label: data[key] };
    });
  }

  transform(value: NzSafeAny, arg?: NzSafeAny): NzSafeAny {
    if (arg === undefined) {
      return value;
    }
    let type: string = arg;
    let param = '';

    if (arg.indexOf(':') !== -1) {
      type = arg.substring(0, arg.indexOf(':'));
      param = arg.substring(arg.indexOf(':') + 1, arg.length);
    }

    switch (type) {
      case 'date':
        return this.datePipe.transform(value, param);
      default:
        // @ts-ignore
        return this.mapObj[type] ? this.mapObj[type][value] : '';
    }
  }
}
