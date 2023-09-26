<!--<template>
  <div>
     <el-button @click="incrementOne()" type="primary" size="mini"
      >同步加一</el-button
    > 
    <el-button @click="decrementOne()" type="primary" size="mini"
      >同步减一</el-button
    >
    <el-input v-model="step" autocomplete="off"></el-input>
    <el-button @click="incrementN()" type="primary" size="mini"
      >同步加n</el-button
    >
    <el-button @click="decrementN()" type="primary" size="mini"
      >同步减n</el-button
    >
    <el-button @click="incrementNAsync()" type="primary" size="mini"
      >异步加n</el-button
    >
    <el-button @click="decrementNAsync()" type="primary" size="mini"
      >异步减n</el-button
    >
    <div>
      <span>当前count值：{{ count }}</span>
      <span>是否正数：{{ isPositive }}</span>
      <span>是否偶数：{{ isEven }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      step: 0,
    };
  },
  computed: {
    // count() {
    //   // this.$store 拿到实例
    //   return this.$store.state.count;
    // },
    ...mapState(["count"]),
    // isPositive(){
    //   return this.$store.getters.isPositive;
    // },
    // isEven(){
    //   return this.$store.getters.isEven;
    // },
    ...mapGetters(["isPositive", "isEven"]),
  },
  methods: {
    incrementOne() {
      // this.$store.commit 调用mutation里面的方法
      this.$store.commit("increment", 1);
    },
    decrementOne() {
      this.$store.commit("decrement", 1);
    },
    incrementN() {
      // this.$store.commit 调用mutation里面的方法
      this.$store.commit("increment", this.step);
    },
    decrementN() {
      this.$store.commit("decrement", this.step);
    },
    incrementNAsync() {
      // this.$store.dispatch 异步派发，调用action里面的方法
      this.$store.dispatch("increment", this.step);
    },
    decrementNAsync() {
      this.$store.dispatch("decrement", this.step);
    },
  },
};
</script>
-->
<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>待办清单</span>
      </div>
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="form.content"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addItemList()">增加</el-button>
        </el-form-item>
      </el-form>
      <div class="table-list">
        <!-- <el-checkbox v-model="checked"></el-checkbox> -->
        <el-table :data="contentList" style="width: 100%">
          <el-table-column label="完成" width="100">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.done"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="待办事项" width="280">
            <template slot-scope="scope">
              <div placement="top">
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.name }}</el-tag>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="footer">
        <div class="alDone">已完成：{{ $store.state.doneCount }}</div>
        <div class="waitDone">待完成：{{ undoneLength }}</div>
      </div>
    </el-card>
  </div>
</template>
<style scoped>
.text {
  font-size: 14px;
}
.item {
  margin-bottom: 18px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.box-card {
  width: 500px;
}
.box-card span {
  display: inline-block;
  text-align: center;
}
:deep(.el-card__header) {
  text-align: center;
}
:deep(.el-input__inner) {
  width: 350px;
}
:deep(.el-form--inline .el-form-item) {
  margin: 0;
}
.footer {
  padding: 10px 0 0 0;
}
.alDone {
  display: inline-block;
  text-align: left;
}
.waitDone {
  float: right;
}
</style>
<script>
export default {
  data() {
    return {
      form: {
        content: "",
      },
      checked: false,
      contentList: [],
    };
  },
  computed: {
    undoneLength() {
      return this.contentList.filter((item) => !item.done).length;
    },
  },
  methods: {
    addItemList() {
      const newItem = {
        name: this.form.content,
        done: false,
      };
      this.$store.dispatch("addItem", newItem);
      this.contentList.push(newItem);
      this.form.content = "";
    },
    handleDelete(index, row) {
      console.log(index, row);
      const rowIndex = this.contentList.indexOf(row);
      if (rowIndex > -1) {
        this.$store.dispatch("deleteItem", rowIndex);
        this.contentList.splice(rowIndex, 1);
      }
    },
    created() {
      this.contentList = this.$store.state.todoList;
    },
  },
};
</script>
