import Database from '../database';
import { IMessage } from '../types';

/**
 * 해당 파일은 절대 수정하지 말아주세요.
 */
class ApiService {
  /**
   * 새로운 메시지를 생성 합니다.
   * AI 의 답변은 스트리밍을 통해서 받을 수 있습니다.
   *
   * @param message 사용자의 발화
   * @returns 생성된 메시지
   */
  async createMessage(message: string): Promise<IMessage> {
    await Database.insert({
      role: 'user',
      content: message,
    });

    return await Database.insert({
      role: 'assistant',
      content: '',
    });
  }

  /**
   * 현재 메시지 목록을 조회 합니다.
   */
  async getMessages(): Promise<IMessage[]> {
    return Database.get();
  }
}

export default new ApiService();
