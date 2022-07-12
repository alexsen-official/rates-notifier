import { ISubscription } from '../interfaces';

export interface IUser {
  _id          : string,
  name         : string,
  tel?         : string,
  email        : string,
  password     : string,
  subscriptions: ISubscription[]
}
