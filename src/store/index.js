import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { user: user },
  /* state: {
    count: 0,
  }, */
  state: {
    todoList: [], // 待办事项清单
    doneCount: 0, // 已完成的数量
  },
  // mutations可以修改state的数据，所有修改state数据都要经过mutations
  // mutations 同步操作
  mutations: {
    /* increment(state, step) {
      step = parseInt(step);
      state.count += step;
    },
    decrement(state, step) {
      step = parseInt(step);
      state.count -= step;
    }, */
    addItem(state, item) {
      state.todoList.push(item);
    },
    deleteItem(state, index) {
      state.todoList.splice(index, 1);
    },
    setDoneCount(state, count) {
      state.doneCount = count;
    },
  },
  //   action 异步操作，修改state数据
  actions: {
    // 可以接受两个参数，第一个参数：context,第二个参数：传的数据
    /* increment(context, step) {
      setTimeout(() => {
        step = parseInt(step);
        context.commit("increment", step);
      }, 3000);
    },
    decrement(context, step) {
      setTimeout(() => {
        step = parseInt(step);
        context.commit("decrement", step);
      }, 3000);
    }, */
    addItem({ commit }, item) {
      commit("addItem", item);
    },
    deleteItem({ commit }, index) {
      commit("deleteItem", index);
    },
    updateDoneCount({ commit, state }) {
      const doneCount = state.todoList.filter((item) => item.done).length;
      commit("setDoneCount", doneCount);
    },
  },
  /* getters: {
    isPositive(state) {
      return state.count > 0;
    },
    isEven(state) {
      return state.count % 2 === 0;
    },
  }, */
});

// todoList代办列表
/* export default new Vuex.Store({
  state: {
    todoList: [], // 待办事项清单
    doneCount: 0, // 已完成的数量
  },
  mutations: {
    addItem(state, item) {
      state.todoList.push(item);
    },
    deleteItem(state, index) {
      state.todoList.splice(index, 1);
    },
    setDoneCount(state, count) {
      state.doneCount = count;
    },
  },
  actions: {
    addItem({ commit }, item) {
      commit("addItem", item);
    },
    deleteItem({ commit }, index) {
      commit("deleteItem", index);
    },
    updateDoneCount({ commit, state }) {
      const doneCount = state.todoList.filter((item) => item.done).length;
      commit("setDoneCount", doneCount);
    },
  },
});
 */
