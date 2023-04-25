import { Component, Input, OnInit } from '@angular/core';
import { Message, SENDER } from 'src/app/models';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  @Input() message!: Message;
  @Input() position!: "left" | "right";
  avatarUrl!: string;

  constructor() {}

  initAvatarUrl(sender: string) {
    if (sender === SENDER.AI) {
      return 'assets/images/ai-face-default.png';
    }
    if (sender === SENDER.HUMAN) {
      return 'assets/images/avatar-default.png';
    }
    return '';
  }

  ngOnInit(): void {
    this.avatarUrl = this.initAvatarUrl(this.message.sender);
  }
}
