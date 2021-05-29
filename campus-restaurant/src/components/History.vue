<template>
  <div class="title">历史订单</div>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column fixed prop="orderName" label="订单详情"> </el-table-column>
    <el-table-column prop="orderDate" label="下单时间"> </el-table-column>
    <el-table-column prop="orderCost" label="订单总额"> </el-table-column>
    <el-table-column prop="orderStatus" label="订单状态">
      <template #default="scope">
        <span
          :class="{
            red: scope.row.orderStatus === '订单未接收',
            green: scope.row.orderStatus === '订单制作中',
            gray: scope.row.orderStatus === '订单已完成',
          }"
  
          >{{ scope.row.orderStatus }}</span
        >
      </template>
    </el-table-column>
    <el-table-column prop="total" label="订单总份数"> </el-table-column>
  </el-table>
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      v-model:currentPage="currentPage"
      :page-size="pages"
      layout="prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "History",
  data() {
    return {
      tableData: [],
      pages: 10,
      total: 0,
      currentPage: 1,
    };
  },
  mounted() {
    this.handleCurrentChange();
  },
  methods: {
    handleCurrentChange() {
      let data = {
        curPage: this.currentPage,
        pages: this.pages, //一页显示多少条
      };
      this.$axios
        .post("/api/getOrderLists", data)
        .then((res) => {
          this.tableData = res.data.orderLists.person;
          this.tableData.forEach((e) => {
            if (e.orderStatus === 0) {
              e.orderStatus = "订单未接收";
            } else if (e.orderStatus === 1) {
              e.orderStatus = "订单制作中";
            } else {
              e.orderStatus = "订单已完成";
            }
          });
          this.total = res.data.orderLists.total;
        })
        .catch((err) => {
          throw err;
        });
    },
  },
};
</script>

<style lang="less">
.title {
  width: 100%;
  height: 1rem;
  line-height: 0.95rem;
  color:black;
  font-size: 0.6rem;
  font-weight: bold;
  text-align: center;
  border-bottom: 1px solid rgb(202, 197, 197);
}
.red {
  color: red;
}
.green {
  color: green;
}
.gray {
  color: gray;
}
</style>
