import { Component } from '@angular/core';

@Component({
  selector: 'a15-udpn-tem-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.less'],
})
export class ContactComponent {
  onMail() {
    parent.location.href = 'mailto:contact@unpn.io';
  }
}
