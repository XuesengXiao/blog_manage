<template>
  <div>
    <!-- this is HomePage -->
    <!-- <div> -->
    <!-- 注意，这里只需要配置子路由 -->
    <!-- <router-link to="/home/firstpage">FirstPage</router-link> -->
    <!-- <router-link to="/home/articalpage">ArticalPage</router-link> -->
    <!-- </div> -->
    <!-- <router-view></router-view> -->
    <el-container>
      <el-header
        >博客后台管理系统
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            {{ name }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>注销</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu default-active="2" router>
            <!-- <el-menu-item index="/home/firstpage">
              <i class="el-icon-menu"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="/home/articalpage">
              <i class="el-icon-setting"></i>
              <span slot="title">文章</span>
            </el-menu-item>
            <el-menu-item index="/home/userpage">
              <i class="el-icon-user-solid"></i>
              <span slot="title">用户</span>
            </el-menu-item> -->
            <el-menu-item v-for="menu in menuMatchdRole" :index="menu.id" :key="menu.id">
              <i :class="menu.icon"></i>
              <span slot="title">{{ menu.name }}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<style scoped>
.el-header {
  background-color: #409eff;
  color: #fff;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  height: calc(100vh - 60px);
}

.el-main {
  /* background-color: #e9eef3; */
  color: #333;
  height: calc(100vh - 60px);
}
.el-menu {
  height: 100%;
}
</style>
<script>
import const_enum from "../../common/const";
export default {
  data() {
    return {
      menus: [
        {
          id: "/home/firstpage",
          name: "首页",
          icon: "el-icon-menu",
          roleAry: [
            const_enum.ROLE.ROLE_OF_ADMIN,
            const_enum.ROLE.ROLE_OF_EDITOR,
          ],
        },
        {
          id: "/home/articalpage",
          name: "文章",
          icon: "el-icon-setting",
          roleAry: [
            const_enum.ROLE.ROLE_OF_ADMIN,
            const_enum.ROLE.ROLE_OF_EDITOR,
          ],
        },
        {
          id: "/home/userpage",
          name: "用户",
          icon: "el-icon-user-solid",
          roleAry: [const_enum.ROLE.ROLE_OF_ADMIN],
        },
      ],
    };
  },
  computed: {
    name() {
      return this.$store.state.user.user.name;
    },
    menuMatchdRole() {
      // 取到当前的登录用户的角色id
      const roleId = this.$store.state.user.user.roleId;
      return this.menus.filter((menu)=>{
        const roleAry = menu.roleAry;
        if(roleAry.includes(roleId)){
          return true;
        }else{
          return false;
        }
      })
    },
  },
  methods: {
    handleCommand() {
      // 注销操作
      this.$store.commit("user/removeUser");
      this.$router.push("/login");
    },
  },
};
</script>
