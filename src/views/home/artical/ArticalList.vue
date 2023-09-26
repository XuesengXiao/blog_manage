<template>
  <div>
    <el-form
      :inline="true"
      :model="search">
      <el-form-item>
        <el-input
          v-model="search.keyword"
          placeholder="请输入关键词"
          autocomplete="off"
          size="mini"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="getArticals(search.keyword)"
          size="mini"
          icon="el-icon-search">
          查询
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button
          @click="resetQuery()"
          size="mini">
          重置
        </el-button>
      </el-form-item>
    </el-form>
    <!-- <ul>
      <li v-for="(item,index) in articalList" :key="item.id">{{index}} | {{item.title}} | {{item.createtime}}|
        <button @click="detail(item.id)">详情</button>
      </li>
    </ul> -->
    <el-table
      :data="articalList"
      style="width: 100%">
      <el-table-column
        prop="title"
        label="标题"
        width="180"></el-table-column>
      <el-table-column
        prop="createtime"
        label="创建日期"
        width="180"></el-table-column>
      <el-table-column
        prop="address"
        label="操作">
        <template slot-scope="scope">
          <el-button
            @click="detail(scope.row.id)"
            type="text"
            size="small">
            详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      articalList: [],
      search: {},
    }
  },
  methods: {
    detail(id) {
      this.$router.push(`/home/articalpage/articaldetail/${id}`)
    },
    getArticals(keyword) {
      let url = "articals"
      if (keyword) {
        url = `${url}?q=${keyword}`
      }
      this.axios
        .get(url)
        .then((res) => {
          this.articalList = res.data
        })
        .catch((err) => {
          console.error(err)
        })
    },
    resetQuery() {
      this.search = {}
      this.getArticals()
    },
  },
  beforeMount() {
    this.axios
      .get("articals")
      .then((res) => {
        this.articalList = res.data
      })
      .catch((err) => {
        console.error(err)
      })
  },
}
</script>
