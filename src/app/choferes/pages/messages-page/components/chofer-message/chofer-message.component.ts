import { Component, Input } from '@angular/core';
import { Message } from '../../../../../interfaces/route.interface';

@Component({
  selector: 'chofer-message-sended',
  templateUrl: './chofer-message.component.html',
  styles: ``
})
export class ChoferMessageSendedComponent {
  @Input() message!: Message;
  @Input() pfp!: string;
}
