import { Component, Input } from '@angular/core';
import { Message } from '../../../../../interfaces/route.interface';

@Component({
  selector: 'chofer-message',
  templateUrl: './chofer-message.component.html',
  styles: ``
})
export class ChoferMessageComponent {
  @Input() message!: Message;
  @Input() pfp!: string;
}
