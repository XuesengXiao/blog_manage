import VueRouter from "vue-router";
import home from "../views/home/HomePage";
import login from "../views/login/LoginPage";
import firstPage from "../views/home/FirstPage";
import articalPage from "../views/home/ArticalPage";
import articalList from "../views/home/artical/ArticalList";
import articalDetail from "../views/home/artical/ArticalDetail";
import userPage from "../views/home/user/UserPage";
import testPage from "../views/home/TestPage";

import utils from "../common/utils";
import const_enum from "../common/const";
// 1 auth 表示是否需要登录才能访问
// 2. roleAry :允许访问的角色列表，roleAry没有配置，表示任意角色都能访问

const routes = [
  {
    path: "/",
    redirect: "/home",
    meta: {
      auth: true,
    },
  },
  {
    path: "/login",
    component: login,
    meta: {
      auth: false,
    },
  },
  {
    path: "/test",
    component: testPage,
    meta: {
      auth: false,
    },
  },
  {
    path: "/home",
    component: home,
    redirect: "/home/firstpage",
    meta: {
      auth: true,
    },
    children: [
      {
        path: "firstpage",
        component: firstPage,
        meta: {
          auth: true,
          roleAry: [
            const_enum.ROLE.ROLE_OF_ADMIN,
            const_enum.ROLE.ROLE_OF_EDITOR,
          ],
        },
      },
      {
        path: "articalpage",
        component: articalPage,
        redirect: "/home/articalpage/articallist",
        meta: {
          auth: true,
          roleAry: [
            const_enum.ROLE.ROLE_OF_ADMIN,
            const_enum.ROLE.ROLE_OF_EDITOR,
          ],
        },
        children: [
          {
            path: "articallist",
            component: articalList,
            meta: {
              auth: true,
              roleAry: [
                const_enum.ROLE.ROLE_OF_ADMIN,
                const_enum.ROLE.ROLE_OF_EDITOR,
              ],
            },
          },
          {
            path: "articaldetail/:id",
            component: articalDetail,
            meta: {
              auth: true,
              roleAry: [
                const_enum.ROLE.ROLE_OF_ADMIN,
                const_enum.ROLE.ROLE_OF_EDITOR,
              ],
            },
          },
        ],
      },
      {
        path: "userpage",
        component: userPage,
        meta: {
          auth: true,
          roleAry: [const_enum.ROLE.ROLE_OF_ADMIN],
        },
      },
    ],
  },
];
const router = new VueRouter({
  mode: "history",
  routes, // (缩写) 相当于 routes: routes
});
const hasRight = (to, roleId) => {
  const roleAry = to.meta.roleAry;
  if (!roleAry) {
    return true;
  }
  return roleAry.includes(roleId);
};
// 全局路由守卫
router.beforeEach((to, from, next) => {
  // 1.如果当前要跳去的路由需要登录，等且没有登录，那么就跳/login
  // 2.如果当前跳转后的路径是/login，并且已经登录了，就跳/home
  // 如果已经登录，但是roleId不包含当前登录用户的角色，那么就跳/home
  // 修改为判断vuex下面usermodule中的user.token

  const store = utils.getStore();
  // 注意：state后面第一个user 是module的名字，第二个数据才是用户数据
  const user = store.state.user.user;
  const roleId = user ? user.roleId : "";
  const token = user ? user.token : "";

  if (to.meta.auth && !token) {
    next("/login");
  } else if (to.path === "/login" && token) {
    next("/home");
  } else if (!hasRight(to, roleId)) {
    next("/home");
  } else {
    next();
  }
});

/* 改造：用户数据放Vuex，
name 响应式
token 持久化
roleId 
需求：主页显示当前用户名，注销
*/
export default router;
