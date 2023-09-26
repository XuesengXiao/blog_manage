<template>
  <div>
    <el-form :inline="true" :model="search">
      <el-form-item label="用户名">
        <el-input
          v-model="search.name"
          placeholder="请输入用户名名称"
          autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="getUsers('name_like=' + search.name)"
          size="mini"
          icon="el-icon-search">
          查询
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="resetQuery()" size="mini">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="user-operation">
      <el-button @click="addUser()" type="primary" size="mini">新增</el-button>
    </div>
    <!-- prop绑定表格中的数据 -->
    <el-table :data="userList" style="width: 100%">
      <el-table-column label="序号" width="100" type="index"></el-table-column>
      <el-table-column prop="name" label="姓名" width="280"></el-table-column>
      <el-table-column prop="role.name" label="角色" width="280"></el-table-column>
      <el-table-column prop="createtime" label="创建日期" width="280"></el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button @click="editUser(scope.row)" type="text" size="small">
            编辑
          </el-button>
          <!-- scope.row.id scope表示当前表格,row.id表示当前id -->
          <el-button @click="deleteUser(scope.row.id)" type="text" size="small">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="isEdit ? '编辑用户' : '新增用户'"
      :visible.sync="dialogFormVisible"
      center>
      <el-form :model="currentUser" :rules="rules" ref="userform">
        <!-- formLabelWidth用户名的宽度 -->
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="currentUser.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth" prop="roleId">
          <el-select v-model="currentUser.roleId" placeholder="请选择角色">
            <el-option label="管理员" value="0"></el-option>
            <el-option label="文章编辑" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="pass">
          <el-input
            v-model="currentUser.pass"
            autocomplete="off"
            show-password></el-input>
        </el-form-item>
        <el-form-item
          label="确认密码"
          :label-width="formLabelWidth"
          v-show="!isEdit"
          :prop="isEdit ? '' : 'confirmPass'">
          <el-input
            v-model="currentUser.confirmPass"
            autocomplete="off"
            show-password></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="isEdit ? doEdit() : doAdd()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    var validateConfirmPass = (rule, value, callback) => {
      if (value !== this.currentUser.pass) {
        callback(new Error("两次输入密码不一致!"))
      } else {
        callback()
      }
    }
    return {
      userList: [],
      dialogFormVisible: false,
      currentUser: {},
      formLabelWidth: "100px",
      isEdit: false,
      search: {
        name: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        roleId: [{ required: true, message: "请选择角色", trigger: "change" }],
        pass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 8, message: "长度在 6 到 8 个字符", trigger: "blur" },
        ],
        confirmPass: [
          { required: true, message: "请确认密码", trigger: "blur" },
          { min: 6, max: 8, message: "长度在 6 到 8 个字符", trigger: "blur" },
          { validator: validateConfirmPass, trigger: "blur" },
        ],
      },
    }
  },
  beforeMount() {
    // 关联查询，expand扩展查询
    this.axios
      .get("/users?_expand=role")
      .then((res) => {
        console.log(res)
        this.userList = res.data
      })
      .catch((err) => {
        console.error(err)
      })
  },
  methods: {
    /* getUsers() {
      this.axios
        .get("/users?_expand=role")
        .then((res) => {
          this.userList = res.data;
        })
        .catch((err) => {
          console.error(err);
        });
    }, */
    getUsers(search) {
      let url = "/users?_expand=role"
      if (search) {
        url = `${url}&${search}`
      }
      this.axios
        .get(url)
        .then((res) => {
          this.userList = res.data
        })
        .catch((err) => {
          console.error(err)
        })
    },
    resetQuery() {
      this.search = {}
      this.getUsers()
    },
    doAxios(url, data, method, info) {
      const config = {
        url,
        method,
        data,
      }
      this.axios(config)
        .then((res) => {
          console.log(res)
          this.getUsers()
          this.$message({
            type: "success",
            message: `${info}成功!`,
          })
        })
        .catch((err) => {
          console.error(err)
          this.$message({
            type: "error",
            message: `${info}失败!`,
          })
        })
    },
    addUser() {
      this.isEdit = false
      this.currentUser = {} //新增内容赋值空
      this.dialogFormVisible = true
    },
    doAdd() {
      let isValid = true
      this.$refs["userform"].validate((valid) => {
        isValid = valid
      })
      if (!isValid) {
        return
      }
      this.dialogFormVisible = false //关闭对话框
      const { name, pass, roleId } = this.currentUser
      const params = {
        name,
        pass,
        roleId,
        createtime: new Date().toLocaleDateString(),
      }
      this.doAxios("/users", params, "post", "新增用户")
      /*  this.axios
        .post(`/users`, params)
        .then((res) => {
          console.log(res);
          this.getUsers();
          this.$message({
            type: "success",
            message: "新增用户成功!",
          });
        })
        .catch((err) => {
          console.error(err);
          this.$message({
            type: "error",
            message: `${info}失败!`,
          });
        }); */
    },
    editUser(user) {
      this.isEdit = true
      this.currentUser = user
      this.dialogFormVisible = true
    },
    doEdit() {
      let isValid = true
      this.$refs["userform"].validate((valid) => {
        isValid = valid
      })
      if (!isValid) {
        return
      }
      this.dialogFormVisible = false
      const { name, pass, roleId } = this.currentUser
      const params = { name, pass, roleId }
      this.doAxios(`/users/${this.currentUser.id}`, params, "patch", "修改用户")
      /* this.axios
        .patch(`/users/${this.currentUser.id}`, params)
        .then((res) => {
          console.log(res);
          this.getUsers();
          this.$message({
            type: "success",
            message: "编辑用户成功!",
          });
        })
        .catch((err) => {
          console.error(err);
          this.$message.error("编辑用户失败");
        }); */
    },
    deleteUser(id) {
      // 1.弹出确认框
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        // 2.是则下发删除请求，成功出成功提示，刷页面，失败出提示消息
        this.doAxios(`/users/${id}`, null, "delete", "删除用户")
        /* this.axios
          .delete(`users/${id}`)
          .then((res) => {
            this.getUsers();
            console.log(res),
              this.$message({
                type: "success",
                message: "删除成功!",
              });
          })
          .catch((err) => {
            this.$message.error("删除失败");
            console.error(err);
          }); */
      })
    },
  },
}
</script>
<style scoped>
.el-select {
  width: 100%;
}
.user-operation {
  display: flex;
}
</style>
