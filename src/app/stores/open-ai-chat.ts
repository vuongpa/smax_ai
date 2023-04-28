import { Injectable } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { BehaviorSubject, Observable, pipe, switchMap, tap } from "rxjs";
import * as uuid from "uuid";

import { Conversation, SENDER } from "../models";
import { OpenAiService } from "../services";

const sampleData = {
  conversations: [
    {
      _id: uuid.v4(),
      messages: [
        {
          sent_time: new Date(),
          message: `Here’s a flow I just created for you. Please take a look to see if it’s good or not! 
          Here’s a flow I just created for you. Please take a look to see if it’s good or not! Here’s a 
          flow I just created for you. Please take a look to see if it’s good or not! Here’s a flow I 
          just created for you. Please take a look to see if it’s good or not! Here’s a flow I just 
          created for you. Please take a look to see if it’s good or not! Here’s a flow I just created 
          for you. Please take a look to see if it’s good or not! Here’s a flow I just created for you. 
          Please take a look to see if it’s good or not! Here’s a flow I just created for you. Please 
          take a look to see if it’s good or not!`,
          sender: SENDER.AI
        },
        {
          sent_time: new Date(),
          message: `Instagram Customer Engage Please take a look to see if it’s
          Instagram Customer Engage Please take a look to see if it’s
          Instagram Customer Engage Please take a look to see if it’s
          Instagram Customer Engage Please take a look to see if it’s
          Instagram Customer Engage Please take a look to see if it’s
          Instagram Customer Engage Please take a look to see if it’s
          Instagram Customer Engage Please take a look to see if it’s
          Instagram Customer Engage Please take a look to see if it’s`,
          sender: SENDER.HUMAN
        }
      ],
      status: "success",
      active: true
    },
    {
      _id: uuid.v4(),
      messages: [
        {
          sent_time: new Date(),
          message: "Here’s a flow I just created for you. Please take a look to see if it’s good or not!",
          sender: SENDER.AI
        },
        {
          sent_time: new Date(),
          message: "Here’s a flow I just created for you. Please take a look to see if it’s good or not!",
          sender: SENDER.AI
        },
        {
          sent_time: new Date(),
          message: `Instagram Customer Engage Please take a look to see if it’s
          Instagram Customer Engage Please take a look to see if it’s
          Instagram Customer Engage Please take a look to see if it’s
          Instagram Customer Engage Please take a look to see if it’s
          Instagram Customer Engage Please take a look to see if it’s
          Instagram Customer Engage Please take a look to see if it’s
          Instagram Customer Engage Please take a look to see if it’s
          Instagram Customer Engage Please take a look to see if it’s`,
          sender: SENDER.HUMAN
        }
      ],
      status: "success",
      active: false
    }
  ]
};

export type OpenAiChatState = {
  conversations: Conversation[];
};

export interface StoreConversation extends Conversation {
  lastMessage: string;
  lastSeen: string;
}

const initialState: OpenAiChatState = sampleData;

@Injectable({ providedIn: "root" })
export class OpenAiChatStore extends ComponentStore<OpenAiChatState> {
  readonly conversations$: Observable<Conversation[]> = this.select((state) => state.conversations);
  readonly activeConversation$: Observable<Conversation | undefined> = this.select((state) =>
    state.conversations.find((c) => c.active)
  );
  private readonly scrollSubject = new BehaviorSubject<any>(null as any);
  readonly scroll = this.scrollSubject.asObservable().pipe();

  readonly vm$ = this.select(
    this.conversations$,
    this.activeConversation$,
    (conversations) => ({
      conversations: conversations.map((conversation) => {
        const lastMessage = conversation.messages[conversation.messages.length - 1];
        return {
          ...conversation,
          lastMessage: lastMessage.message,
          lastSeen: lastMessage.sent_time
        } as StoreConversation;
      })
    }),
    { debounce: true }
  );

  constructor(private readonly openAiService: OpenAiService) {
    super(initialState);
  }

  readonly activeConversation = this.updater((state, _id: string) => ({
    conversations: state.conversations.map((c) => {
      if (c._id === _id) return { ...c, active: true };
      return { ...c, active: false };
    })
  }));

  readonly removeConversation = this.updater((state, _id: string) => ({
    conversations: state.conversations
      .filter((c) => c._id !== _id)
      .map((c, idx) => {
        if (idx == 0) return { ...c, active: true };
        return c;
      })
  }));

  readonly addConversation = this.updater((state, conversation: Conversation) => ({
    conversations: [conversation, ...state.conversations]
  }));

  readonly createNewConversation = this.updater((state) => {
    const conversation = {
      _id: uuid.v4(),
      status: "success",
      active: true,
      messages: [
        {
          sent_time: new Date(),
          message: "New chat",
          sender: SENDER.HUMAN
        }
      ]
    };
    return {
      conversations: [conversation, ...state.conversations.map((c) => ({ ...c, active: false }))]
    };
  });

  readonly addMessage = (message: string, sender: string, status = "loading") =>
    this.patchState((state) => ({
      conversations: state.conversations.map((c) => {
        if (!c.active) {
          return c;
        }

        return {
          ...c,
          messages: [
            ...c.messages,
            {
              sent_time: new Date(),
              message,
              sender
            }
          ],
          status
        };
      })
    }));

  readonly sendMessageEffect = this.effect<string>(
    pipe(
      tap((message: string) => {
        this.addMessage(message, SENDER.HUMAN);
        this.scrollSubject.next(uuid.v4());
      }),
      switchMap((message: string) =>
        this.openAiService.ask(message).pipe(
          tapResponse(
            (response) => {
              const message = response.message || "";
              if (message) {
                this.addMessage(message, SENDER.AI, "success");
              }
            },
            (err) => {
              console.error(err);
              this.patchState((state) => ({
                conversations: state.conversations.map((c) => {
                  if (!c.active) {
                    return c;
                  }

                  return {
                    ...c,
                    status: "success"
                  };
                })
              }));
            }
          )
        )
      )
    )
  );
}
