import { IMessage } from '../types';
import { wait } from '../utils';

class Database {
  private _id = 0;

  private list: IMessage[] = [];

  public async insert(data: Omit<IMessage, 'id'>): Promise<IMessage> {
    const _data = Object.assign({ id: this._id }, data);
    this.list.push(_data);
    this._id += 1;
    await wait(300);
    return _data;
  }

  public async get(): Promise<IMessage[]> {
    await wait(300);
    return this.list;
  }

  public update(id: number, data: Partial<IMessage>): IMessage {
    const index = this.list.findIndex((v) => v.id === id);
    const _data = Object.assign(this.list[index], data);
    this.list[index] = _data;
    return _data;
  }
}

export default new Database();
