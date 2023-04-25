export const SENDER = {
  AI: "ai",
  HUMAN: "human"
}

export type Message = {
  sent_time: string | Date;
  message: string;
  sender: string;
}
