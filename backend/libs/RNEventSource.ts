import { concatMap, delay, from, of } from 'rxjs';
import database from '../database';

/**
 * 해당 파일은 절대 수정하지 말아주세요.
 */
class RNEventSource {
  private _listeners: Record<EventType, any[]> = {
    open: [],
    message: [],
  };

  constructor(id: number) {
    const response = responses[~~(id / 2)];

    if (!response) throw new Error('invalid id');

    this._listeners.open.forEach((listener) => listener());

    from(response)
      .pipe(concatMap((v) => of(v).pipe(delay(v.duration))))
      .subscribe((v) => {
        this._listeners.message.forEach((listener) => listener(v.chunk));

        if (v.chunk === '[DONE]') {
          database.update(id, {
            content: response
              .map((v) => v.chunk)
              .join('')
              .replace('[DONE]', ''),
          });
        }
      });
  }

  /**
   * 새로운 이벤트 리스너를 등록 합니다
   * @param {EventType} event 이벤트 타입 (message, open, error)
   * @param callback 이벤트 발생시 실행할 콜백 함수
   *
   * @returns 이벤트 리스너 해제 함수
   */
  public addEventListener = <T extends EventType>(
    event: T,
    callback: Callback[T]
  ) => {
    this._listeners[event].push(callback);

    return () => {
      this._listeners[event] = this._listeners[event].filter(
        (listener) => listener !== callback
      );
    };
  };
}

type Callback = {
  message: (chunk: string) => void;
  open: () => void;
};

const trail_1: { duration: number; chunk: string }[] = [
  { duration: 3000, chunk: '안녕' },
  { duration: 30, chunk: '하' },
  { duration: 30, chunk: '세요' },
  { duration: 1000, chunk: ' 뤼튼' },
  { duration: 1000, chunk: ' 입니다.' },
  { duration: 30, chunk: ' 만나서' },
  { duration: 30, chunk: ' 반갑습' },
  { duration: 30, chunk: '니다👋' },
  { duration: 30, chunk: '[DONE]' },
];

const trail_2: { duration: number; chunk: string }[] = [
  { duration: 3000, chunk: '끝까지' },
  { duration: 30, chunk: ' 화이팅' },
  { duration: 30, chunk: ' 해' },
  { duration: 100, chunk: '주세요' },
  { duration: 100, chunk: '😄' },
  { duration: 30, chunk: '[DONE]' },
];

const trail_3: { duration: number; chunk: string }[] = [
  { duration: 3000, chunk: '어라' },
  { duration: 30, chunk: '....' },
  { duration: 30000000000, chunk: '[DONE]' },
];

const responses = [trail_1, trail_2, trail_3];

export type EventType = 'message' | 'open';

export { RNEventSource };
