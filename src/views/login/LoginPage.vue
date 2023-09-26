<template>
  <div class="login-root">
    <div class="login-wrapper">
      <div class="login-header">登录</div>
      <el-form
        :model="formData"
        :rules="rules"
        ref="ruleForm">
        <el-form-item prop="name">
          <el-input
            v-model="formData.name"
            placeholder="请输入用户名..."></el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <el-input
            v-model="formData.pass"
            placeholder="请输入密码..."
            type="password"
            show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="login()"
            class="login-btn">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- <form action="">
      <input v-model="formData.name" placeholder="用户名" />
      <input v-model="formData.pass" type="password" placeholder="密码" />
      <button @click="login()" type="button">登录</button>
    </form> -->
  </div>
</template>
<style scoped>
.login-root {
  width: 100vw;
  height: 100vh;
  background: url(~@/assets/images/background.png) no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-header {
  width: 6rem;
  margin: 0 auto;
  text-align: justify;
  font-size: 1.5rem;
  color: #606266;
  margin-bottom: 1rem;
}
.login-header::after {
  content: "";
  display: inline-block;
  width: 100%;
}
.login-wrapper {
  width: 30vw;
  height: 30vh;
  /* 毛玻璃效果 */
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  border-radius: 1rem;
  padding: 3vw 5vw 5vw;
  /*   position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%); */
}
.el-button {
  width: 100%;
}
</style>
<script>
export default {
  data: () => ({
    formData: {
      name: "",
      pass: "",
    },
    rules: {
      name: [
        { required: true, message: "请输入用户名称...", trigger: "blur" },
        { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" },
      ],
      pass: [
        { required: true, message: "请输入密码...", trigger: "blur" },
        { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
      ],
    },
  }),
  methods: {
    login() {
      const that = this
      this.axios
        .get(`/users?name=${that.formData.name}`)
        .then((res) => {
          // json-server没有后台处理逻辑，先前端修改为只判断用户名和密码是否正确
          console.log(res)
          if (res.data[0].pass === that.formData.pass) {
            console.log("router push")
            //  路由跳转，一般都用token
            // localStorage.setItem("token", res.data[0].name);
            const user = {
              name: res.data[0].name,
              token: res.data[0].name,
              roleId: res.data[0].roleId,
            }
            this.$store.commit("user/addUser", user)
            that.$router.replace("/home")
          } else {
            alert("密码错误")
          }
        })
        .catch((err) => {
          console.log("error:", err)
        })
    },
  },
}
</script>
