import { UserModel } from '@/models/UserModel';

import { BaseApi } from './BaseApi';

export default class UserApi extends BaseApi {
  /** 加载全部的用户数据 */
  async getUsers(): Promise<UserModel[]> {
    const result = await this.get<UserModel[]>({
      url: '/users',
    });

    return result.map(() => new UserModel());
  }
}

export const userApi = new UserApi();
