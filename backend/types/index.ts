/**
 * 해당 파일은 절대 수정하지 말아주세요.
 */
export interface IMessage {
  id: number;
  role: 'user' | 'assistant';
  content: string;
}
