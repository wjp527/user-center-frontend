// @ts-ignore
/* eslint-disable */

declare namespace API {
  // 通用响应类型
  type BaseResponse<T> = {
    code: number;
    data: T;
    message: string;
    description: string;
  };

  // 获取用户信息
  type CurrentUser = {
    id?: number;
    username?: string;
    userAccount?: string;
    avatarUrl?: string;
    gender?: number;
    userPassword?: null;
    phone?: string;
    email?: string;
    userStatus?: number;
    createTime?: Date;
    updateTime?: null;
    isDelete?: null;
    userRole?: number;
    planetCode?: string;
    current?: number;
    pageSize?: number;
    created_at?: string;
  };

  type LoginResult = {
    status?: string;
    type?: string;
    currentAuthority?: string;
  };

  type RegisterParams = {
    // 用户账号
    userAccount?: string;
    // 用户密码
    userPassword?: string;
    // 确认密码
    checkPassword?: string;
    // 星球编号
    planetCode?: string;
    type?: string;
  };
  type RegisterResult = number;

  // 更新用户需要用的参数
  type userListUpdateResult = number;
  type userListUpdateParams = {
    id?: number;
    username?: string;
    userAccount?: string;
    avatarUrl?: string;
    gender?: number;
    userPassword?: null;
    phone?: string;
    email?: string;
    userStatus?: number;
    createTime?: Date;
    updateTime?: null;
    isDelete?: null;
    userRole?: number;
    planetCode?: string;
  };

  //  ===============================================

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    userAccount?: string;
    userPassword?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
}
