import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";

export type OpenAiChatState = {}

const initialState: OpenAiChatState = {}

@Injectable({providedIn: 'root'})
export class OpenAiChatStore extends ComponentStore<OpenAiChatState> {
  constructor() {
    super(initialState);
  }
}
