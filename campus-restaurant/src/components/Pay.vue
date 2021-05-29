<template>
  <div>
    <el-card class="searchBox">
      <div style="margin-top: 15px">
        <el-input
          placeholder="请输入用户手机号"
          v-model="phoneNumber"
          class="input-with-select"
        >
          <template #append>
            <el-button icon="el-icon-search" @click="handleSearch"></el-button>
          </template>
        </el-input>
      </div>
    </el-card>
    <el-card class="box-card">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column fixed prop="userName" label="用户昵称">
        </el-table-column>
        <el-table-column prop="phoneNumber" label="手机号"> </el-table-column>
        <el-table-column prop="banlance" label="剩余金额"> </el-table-column>

        <el-table-column fixed="right" label="操作">
          <template #default="scope">
            <el-button
              @click="
                handleClick(scope.row);
                DialogVisible = true;
              "
              type="text"
              size="small"
              >充值</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        v-model:currentPage="currentPage"
        :page-size="pages"
        layout="prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <el-dialog title="充值金额" v-model="DialogVisible" width="30%" center>
      <el-input v-model="banlance" placeholder="请输入充值金额"></el-input>
      <template #footer>
        <span class="dialog-footer">
          <el-button
            type="primary"
            @click="
              DialogVisible = false;
              addBanlance();
            "
            >确&#8197;认&#8197;充&#8197;值</el-button
          >
          <el-button @click="DialogVisible = false"
            >取&#8197;消&#8197;充&#8197;值</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
export default {
  data() {
    return {
      tableData: [],
      pages: 6,
      total: 0,
      phoneNumber: "",
      currentPage: 1,
      DialogVisible: false,
      banlance: 0,
      checkData: {},
    };
  },
  mounted() {
    this.handleCurrentChange();
  },
  methods: {
    handleClick(row) {
      this.checkData = row;
    },

    handleCurrentChange(val) {
      let data = {
        curPage: val,
        pages: this.pages, //一页显示多少条
        search: this.phoneNumber,
      };
      this.$axios
        .post("/api/getUsers", data)
        .then((res) => {
          this.tableData = res.data.data.person;
          this.total = res.data.data.total;
        })
        .catch((err) => {
          throw err;
        });
    },
    handleSearch() {
      let data = {
        curPage: 1,
        pages: this.pages, //一页显示多少条
        search: this.phoneNumber,
      };
      this.$axios
        .post("/api/getUsers", data)
        .then((res) => {
          this.tableData = res.data.data.person;
        })
        .catch((err) => {
          throw err;
        });
    },
    addBanlance() {
      const { _id, banlance } = this.checkData;
      let newBanlance = parseInt(banlance) + parseInt(this.banlance);
      let data = {
        _id,
        banlance: newBanlance,
      };
      this.$axios
        .post("/api/addBanlance", data)
        .then((res) => {
          const { success, code, message } = res.data;

          if (success) {
            if (code === 1) {
              this.handleCurrentChange();
              ElMessage.success(message);
              this.DialogVisible = false;
              this.banlance = "";
            } else {
              ElMessage.error(message);
            }
          } else {
            ElMessage.error(message);
          }
        })
        .catch((err) => {
          throw err;
        });
    },
  },
};
</script>

<style lang="less" scoped>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}
.searchBox {
  width: 90%;
  margin: 20px auto;
}
.box-card {
  width: 90%;
  margin: 20px auto;
}
</style>