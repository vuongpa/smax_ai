import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Conversation } from 'src/app/models';
import { OpenAiChatStore } from 'src/app/stores';

@Component({
  selector: 'app-board-chat',
  templateUrl: './board-chat.component.html',
  styleUrls: ['./board-chat.component.scss']
})
export class BoardChatComponent implements AfterViewInit {
  @ViewChild("scrollRef") scrollRef!: ElementRef<HTMLDivElement>;
  @ViewChild("boardChat") boardChat!: ElementRef<HTMLDivElement>;
  activeConversation$!: Observable<Conversation | undefined>;
  activeConversation: Conversation | undefined;

  constructor(
    private readonly openAiChatStore: OpenAiChatStore
  ) {}

  ngAfterViewInit(): void {
    this.openAiChatStore.scroll.subscribe({
      next: (value) => {
        this.scrollRef.nativeElement.scrollIntoView({behavior: "smooth"});
      },
    });
    this.scrollRef.nativeElement.scrollIntoView({behavior: "smooth"});
  }

  ngOnInit(): void {
    this.activeConversation$ = this.openAiChatStore.activeConversation$;
  }
}
