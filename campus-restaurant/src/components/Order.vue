<template>
  <div class="title">订单管理</div>
  <el-card class="el-card">
    <el-table :data="tableData" style="width: 100%">
    <el-table-column fixed prop="orderName" label="订单详情"> </el-table-column>
    <el-table-column prop="orderDate" label="下单时间"> </el-table-column>
    <el-table-column fixed prop="_id" label="订单编号"> </el-table-column>
    <el-table-column prop="orderCost" label="订单总额(元)"> </el-table-column>
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
    <el-table-column fixed="right" label="操作" width="120">
      <template #default="scope">
        <el-button
          @click="updateStatus(scope.row)"
          :type="scope.row.orderStatus === '订单未接收' ? 'danger' : 'warning'"
          :disabled="scope.row.orderStatus === '订单已完成' ? true : false"
          size="small"
        >
          {{
            scope.row.orderStatus === "订单未接收"
              ? "接收订单"
              : scope.row.orderStatus === "订单制作中"
              ? "完成订单"
              : "订单已完成"
          }}
        </el-button>
      </template>
    </el-table-column>
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
  </el-card>
  
</template>

<script>
import { ElMessage } from "element-plus";
export default {
  name: "Order",
  data() {
    return {
      tableData: [],
      pages: 6,
      total: 0,
      currentPage: 1,
    };
  },
  mounted() {
    this.handleCurrentChange();
  },
  methods: {
    updateStatus(row) {
      const { orderStatus, _id } = row;

      let status;
      if (orderStatus === "订单未接收") {
        status = 1;
      } else if (orderStatus === "订单制作中") {
        status = 2;
      }
      let data = {
        _id,
        orderStatus: status,
      };
      this.$axios
        .post("/api/updateOrderStatus", data)
        .then((res) => {
          const { success, message } = res.data;
          if (success) {
            ElMessage.success(message);
            this.handleCurrentChange();
          } else {
            ElMessage.error(message);
          }
        })
        .catch((err) => {
          throw err;
        });
    },

    handleCurrentChange() {
      let data = {
        curPage: this.currentPage,
        pages: this.pages, //一页显示多少条
      };
      this.$axios
        .post("/api/getAllOrderLists", data)
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
          this.updateStatus();
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
  height: 10vh;
  line-height: 10vh;
  font-size: 0.6rem;
  font-weight: bold;
  text-align: center;
  border-bottom: 1px solid rgb(196, 168, 168);
  color: rgb(51, 40, 21);

}
.el-card{
 max-height: 90vh;
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
