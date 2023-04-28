import { Message } from "./message";

export type Conversation = {
  _id: string;
  messages: Message[];
  status: "loading" | "success" | string;
  active: boolean;
};
