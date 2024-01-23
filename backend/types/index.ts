export interface IMessage {
  id: number;
  role: 'user' | 'assistant';
  content: string;
}
