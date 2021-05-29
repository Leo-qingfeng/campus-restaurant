<template>
  <div>
    <div class="title">
      <span>美&#8197;食&#8197;清&#8197;单</span>
    </div>
    <div class="wrapper">
      <el-card class="searchBox">
        <div style="margin-top: 15px">
          <el-input
            placeholder="请输入菜品名称"
            v-model="dishName"
            class="input-with-select"
          >
            <template #append>
              <el-button
                icon="el-icon-search"
                @click="handleSearch"
              ></el-button>
            </template>
          </el-input>
        </div>
      </el-card>
      <div class="main">
        <div class="list" v-for="(item, index) in tableData" :key="index">
          <el-card class="el-card">
            <img :src="item.dishPic" class="image" />
            <div style="padding: 14px">
              <span>{{ item.dishName }}</span>
              <div class="bottom">
                <time class="time">{{ item.dishPrice }}元/份</time>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  size="mini"
                  @click="deleteRow(index, tableData)"
                ></el-button>
              </div>
            </div>
          </el-card>
        </div>
      </div>
      <el-affix position="bottom" :offset="60">
        <div class="shopcar el-icon-dish" @click="dialogVisible = true"></div>
      </el-affix>
    </div>
    <el-dialog title="菜品管理" v-model="dialogVisible" width="40%">
      <el-table :data="tableData" style="width: 100%" max-height="250">
        <el-table-column fixed prop="dishName" label="菜&#8194;品" width="150">
        </el-table-column>
        <el-table-column prop="dishPrice" label="价&#8194;格(元）" width="120">
        </el-table-column>
        <el-table-column prop="dishPic" label="图&#8194;片" width="120">
          <template #default="scope">
            <img
              :src="scope.row.dishPic"
              style="width: 80%; height: 80%"
              alt=""
            />
          </template>
        </el-table-column>
        <el-table-column fixed="right" width="120">
          <template #default="scope">
            <el-button
              @click="deleteRow(scope.$index, tableData)"
              type="text"
              size="small"
            >
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-affix position="bottom">
        <div class="fixed">
          <el-button class="sub" type="primary" @click="dialogVisible2 = true"
            >添加菜品</el-button
          >
        </div>
      </el-affix>
    </el-dialog>

    <el-dialog
      title="添加菜品"
      v-model="dialogVisible2"
      width="40%"
      modal="false"
    >
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="菜品">
          <el-input v-model="formInline.dishName" maxlength="8"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="formInline.dishPrice" maxlength="4"> </el-input>
        </el-form-item>
      </el-form>
      <div class="upload">
        <el-upload
          class="upload-demo"
          name="dishPic"
          drag
          action="/api/uploadPic"
          :on-success="handlePicSuccess"
          :before-upload="beforeUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将图片拖到此处，或<em>点击上传</em></div>
          <template #tip>
            <div class="el-upload__tip"></div>
          </template>
        </el-upload>
      </div>
      <div class="add-button">
        <el-button type="primary" @click="addDish">确认添加</el-button>
      </div>
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
      dialogVisible2: false,
      currentDate: new Date(),
      num: 1,
      num2: 8,
      cost: 108,
      dishPic: "",
      dishName: "",
      tableData: [],
      formInline: {
        dishName: "",
        dishPrice: "",
      },
      imageUrl: "",
    };
  },
  async mounted() {
    await this.getDishes();
  },
  methods: {
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
    deleteRow(index, rows) {
      this.$confirm("确认删除此菜品吗？", "删除确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const id = rows[index]._id;
          const data = {
            id,
          };
          this.$axios
            .post("/api/deleteDishes", data)
            .then((res) => {
              const { success, message } = res.data;
              if (success) {
                ElMessage.success(message);
                this.getDishes();
              } else {
                ElMessage.error(message);
              }
            })
            .catch((err) => {
              throw err;
            });
        })
        .catch(() => {
          ElMessage.warning("已取消删除");
        });
    },
    addDish() {
      if (this.dishName === "" || this.dishPrice === "") {
        ElMessage.error("菜品和价格不能为空!");
      } else {
        const dishData = {
          dishName: this.formInline.dishName,
          dishPrice: this.formInline.dishPrice,
          dishPic: this.imageUrl,
        };
        this.$axios
          .post("/api/addDishes", dishData)
          .then((res) => {
            const { success, message } = res.data;
            if (success) {
              ElMessage.success(message);
              this.getDishes();
              this.formInline = [];
              this.imageUrl = "";
              // 刷新页面
            } else {
              ElMessage.error(message);
            }
          })
          .catch((err) => {
            throw err;
            // ElMessage.error("系统错误，请稍后再试");
          });
      }
    },
    //获取菜单列表
    async getDishes() {
      await this.$axios
        .get("/api/getDishes")
        .then((res) => {
          const { data, success, code, message } = res.data;
          if (success) {
            if (code === 1) {
              ElMessage.success(message);
              this.tableData = data;
            } else if (code === 2) {
              ElMessage.warning(message);
            }
          } else {
            ElMessage.error(message);
          }
        })
        .catch((err) => {
          throw err;
        });
    },
    handlePicSuccess(res, file) {
      this.imageUrl = "http://localhost:3000/myUpload/" + file.name;
    },

    beforeUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
};
</script>

<style lang="less" scoped>
.fixed {
  display: flex;
  justify-content: flex-end;
  .sub {
    width: 18%;
    height: 100%;
    background-color: rgb(64, 158, 255);
    color: white;
    &:hover {
      background-color: rgb(113, 183, 253);
    }
  }
}
.upload {
  display: flex;
  justify-content: center;
  padding-right: 0.1rem;
}
.add-button {
  display: flex;
  justify-content: center;
}
.wrapper {
  height: 85vh;
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
  }
}
.title {
  width: 100%;
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(51, 40, 21);
  span {
    font-size: 0.6rem;
    font-weight: bold;
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
  .el-card {
    max-width: 300px;
  }
}
.searchBox {
  width: 90%;
  margin: 20px auto;
}
</style>
