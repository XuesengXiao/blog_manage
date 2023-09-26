const initUser = () => {
  // 同步取得local Storage里面的user数据，作为state中的user数据
  const userStr = localStorage.getItem("user");
  if (!userStr || userStr === undefined || userStr === "") {
    return {};
  } else {
    return JSON.parse(userStr);
  }
};
export default {
  namespaced: true,
  state: {
    user: initUser(),
  },
  mutations: {
    addUser(state, curUser) {
      // 做两件事：1.修改module的数据 2.同步修改localStorage
      state.user = curUser;
      localStorage.setItem("user", JSON.stringify(curUser));
    },
    removeUser(state) {
      //   做两件事
      //   1.清空当前state中的用户数据 2.同步删除local Storage中的用户数据
      state.user = {};
      localStorage.removeItem("user");
    },
  },
};
