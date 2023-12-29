export interface Logger {
  error: Function;
  info: Function;
}

export type ConsumerOptions = {
  topic: string;
  fromBeginning: boolean
}
