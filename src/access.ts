/**
 * @see https://umijs.org/docs/max/access#access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser } | undefined) {
  // initialState 即是从服务端获取的用户信息
  const { currentUser } = initialState ?? {};
  return {
    // ✨✨✨ 这里如果你将页面定义在/admin下，那就说明，仅管理员可见, 那么需要给它一个判断权限的字段 就比如 user表中的userRole, 这里0为普通用户，1为管理员
    canAdmin: currentUser && currentUser.userRole === 1,
  };
}
