<template>
  <div>
    <div class="title">
      <span>美&#8197;食&#8197;清&#8197;单</span>
    </div>
    <div class="wrapper">
      <el-card style="width: 100%; margin: 20px auto">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column fixed prop="dishName" label="菜品名称">
          </el-table-column>
          <el-table-column prop="dishPrice" label="菜品价格"> </el-table-column>
          <el-table-column prop="dishPic" label="菜品图片">
            <template #default="scope">
              <img
                :src="scope.row.dishPic"
                style="width: 50%; height: 50%"
                alt=""
              />
            </template>
          </el-table-column>

          <el-table-column fixed="right" label="操作">
            <template #default="scope">
              <el-input-number
                v-model="dishNumber[scope.$index]"
                :min="0"
                :max="10"
                @change="(cur, old) => handleChangeNumber(cur, old, scope.row)"
                style="margin-right: 10px"
              ></el-input-number>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <el-affix position="bottom" :offset="60">
        <div
          class="shopcar el-icon-shopping-cart-1"
          @click="dialogVisible = true"
        >
          <div class="number">{{ total }}</div>
        </div>
      </el-affix>
    </div>
    <el-dialog title="购物车" v-model="dialogVisible" width="60%">
      <el-table :data="shopCarData" style="width: 100%" max-height="250">
        <el-table-column fixed prop="dishName" label="菜品名称">
        </el-table-column>
        <el-table-column prop="dishPrice" label="菜品价格(元)">
        </el-table-column>
        <el-table-column prop="dishNumber" label="菜品数量(份)">
        </el-table-column>
      </el-table>
      <el-affix position="bottom">
        <div class="fixed">
          <div class="order">
            <div>共计{{ total }}件,价格为{{ totalPrice }}元</div>
          </div>
          <el-button class="sub" type="primary" @click="handleSubmitOrder"
            >提交订单</el-button
          >
        </div>
      </el-affix>
    </el-dialog>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
export default {
  name: "Menu",
  data() {
    return {
      dialogVisible: false,
      currentDate: new Date(),
      tableData: [],
      dishNumber: [],
      shopCarData: [],
      total: 0,
      curNumber: 0,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },

    handleClick(row) {
      console.log(row);
    },
    getData() {
      this.$axios
        .get("/api/getDishes")
        .then((res) => {
          this.tableData = res.data.data;
          for (let i = 0; i < this.tableData.length; i++) {
            this.dishNumber[i] = 0;
          }
        })
        .catch((err) => {
          throw err;
        });
    },

    handleChangeNumber(curValue, oldValue, row) {
      this.curNumber = curValue;
      const { _id } = row;
      var data = row;
      data.dishNumber = curValue;

      if (curValue > oldValue && curValue !== 0 && curValue === 1) {
        this.shopCarData.push(data);
      } else if (curValue === 0) {
        for (var i = 0; i < this.shopCarData.length; i++) {
          if (this.shopCarData[i]._id == _id) {
            this.shopCarData.splice(i, 1);
          }
        }
      }

      if (curValue > oldValue) {
        this.total += curValue - oldValue;
      } else if (curValue <= oldValue) {
        this.total -= oldValue - curValue;
      }
    },
    handleSubmitOrder() {
      let curDishName = "";
      this.shopCarData.forEach((e) => {
        curDishName += `${e.dishName}(${e.dishNumber});`;
      });
      /**状态0 为未处理，状态1为已接受 状态2为已完成 */
      let data = {
        orderName: curDishName,
        total: this.total,
        orderDate: new Date().toLocaleString(),
        orderStatus: 0,
        userId: localStorage.getItem("userId"),
        orderCost: this.totalPrice,
      };
      this.$axios
        .post("/api/addOrder", data)
        .then((res) => {
          const { success, message } = res.data;
          if (success) {
            ElMessage.success(message);
            this.dialogVisible=false;
            this.shopCarData=[];
            this.total=0;
            this.totalPrice=0;
            for (let i = 0; i < this.tableData.length; i++) {
            this.dishNumber[i] = 0;
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
  computed: {
    totalPrice() {
      let number = 0;
      this.shopCarData.forEach((e) => {
        number += e.dishPrice * e.dishNumber;
      });
      return number;
    },
  },
};
</script>

<style lang="less" scoped>
.fixed {
  display: flex;
  flex-flow: row nowrap;
  .order {
    width: 90%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    font-size: 0.3rem;
  }
  .sub {
    width: 10%;
    height: 100%;
    background-color: rgb(64, 158, 255);
    color: white;
    &:hover {
      background-color: rgb(113, 183, 253);
    }
  }
}
.wrapper {
  max-height: 85vh;

  overflow: auto;
  .shopcar {
    background: white;
    line-height: 60px;
    width: 60px;
    height: 60px;
    font-size: 0.3rem;
    border-radius: 50%;
    margin-left: 0.1rem;
    position: relative;
    text-align: center;
    cursor: pointer;
    &:hover {
      color: orange;
    }
    .number {
      min-width: 16px;
      min-height: 16px;
      border-radius: 50%;
      background-color: rgba(255, 0, 0, 0.7);
      font-size: 0.1rem;
      color: white;
      position: absolute;
      right: 0;
      line-height: 16px;
      top: 0;
      user-select: none;
    }
  }
}
.title {
  width: 100%;
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid rgb(233, 223, 223);
  span {
    font-size: 0.6rem;
    font-weight: bold;
    color: black;
  }
}
.main {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;

  .list {
    margin: 10px 0;
  }
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .button {
    padding: 0;
    min-height: auto;
  }

  .image {
    width: 100%;
    display: block;
  }
}
</style>
