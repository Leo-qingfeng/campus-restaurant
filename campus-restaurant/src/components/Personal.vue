<template>
  <div class="wrapper">
    <div class="left">
      <div class="head">
        <div class="head-pic">
          <img :src="form.header" alt="" />
        </div>
      </div>
      <div class="update-head-pic">
        <el-button size="mini" round @click="headerDialog = true"
          >更新头像</el-button
        >
      </div>
      <div class="left-main">
        <ul class="big">
          <li class="small">
            <span class="end">昵&#12288;称：</span>
            <span class="start">{{ form.userName }}</span>
          </li>
          <li class="small">
            <span class="end">性&#12288;别：</span>
            <span class="start">{{ form.gender }}</span>
          </li>
          <li class="small">
            <span class="end">余&#12288;额：</span>
            <span class="start">{{ form.banlance }}&#8197;元 </span>
          </li>
          <li class="small">
            <span class="end">手机号：</span>
            <span class="start">{{ form.phoneNumber }}</span>
          </li>
          <li class="small">
            <span class="end">邮&#12288;箱：</span>
            <span class="start">{{ form.email }}</span>
          </li>
          <li class="small-last">
            <el-button type="primary" @click="handleExit">退出登录</el-button>
          </li>
        </ul>
      </div>
    </div>
    <div class="right">
      <div class="title">
        <span>个人信息</span>
      </div>
      <div class="right-main">
        <el-card class="box-card" shadow="hover">
          <div class="text item">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="用&#8194;户&#8194;名">
                <el-input v-model="form._id" disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="昵&#8195;&#8195;称">
                <el-input
                  v-model="form.userName"
                  minlength="2"
                  maxlength="6"
                  show-word-limit="true"
                ></el-input>
              </el-form-item>

              <el-form-item label="性&#8195;&#8195;别">
                <el-radio-group v-model="form.gender">
                  <el-radio label="男" value="男"></el-radio>
                  <el-radio label="女" value="女"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="手机号码">
                <el-input
                  v-model="form.phoneNumber"
                  disabled
                  maxlength="11"
                ></el-input>
              </el-form-item>
              <el-form-item label="邮&#8195;&#8195;箱">
                <el-input v-model="form.email"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="onSubmit">确认修改</el-button>
                <el-button>取消</el-button>
                <el-button type="primary" @click="dialogVisible = true"
                  >修改密码</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </div>
    </div>

    <el-dialog title="修改密码" v-model="dialogVisible" width="25.5%">
      <el-form :rules="rules" ref="ruleForm" :model="ruleForm">
        <el-form-item prop="phoneNumber">
          <el-input
            class="el-input"
            placeholder="请输入手机号码"
            maxlength="11"
            v-model.number="ruleForm.phoneNumber"
          >
            <template #suffix>
              <i class="el-input__icon el-icon-phone-outline"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            class="el-input"
            placeholder="请输入密码"
            show-password
            v-model="ruleForm.password"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="checkPassword">
          <el-input
            class="el-input"
            placeholder="请再次输入密码"
            show-password
            v-model="ruleForm.checkPassword"
          >
          </el-input>
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="
              dialogVisible = false;
              updatePassword();
            "
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>

    <el-dialog title="上传头像" v-model="headerDialog" width="25.5%">
      <el-upload
        name="dishPic"
        class="avatar-uploader"
        action="/api/uploadPic"
        :show-file-list="false"
        :on-success="handlePicSuccess"
        :before-upload="beforeUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="headerDialog = false">取 消</el-button>
          <el-button
            type="primary"
            @click="
              headerDialog = false;
              updateHeader();
            "
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";

export default {
  name: "Personal",
  data() {
    var checkPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var phonecount = (rule, value, callback) => {
      if (
        !/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(
          value
        )
      ) {
        callback(new Error("请输入正确的手机号！"));
      } else {
        callback();
      }
    };
    return {
      dialogVisible: false,
      headerDialog: false,
      imageUrl: "",
      ruleForm: {
        password: "",
        checkPassword: "",
        phoneNumber: "",
      },
      rules: {
        password: [
          { required: true, trigger: "blur", message: "密码不能为空!" },
          {
            min: 6,
            max: 12,
            message: "密码为 6 到 12 位的数字、字母、特殊字符",
            trigger: "blur",
          },
        ],
        checkPassword: [{ validator: checkPass, trigger: "blur" }],
        phoneNumber: [
          { required: true, trigger: "blur", message: "手机号码不能为空!" },
          { type: "number", message: "手机号必须为数字", trigger: "blur" },
          { validator: phonecount, trigger: "blur" },
        ],
      },
      form: {
        _id: "",
        userName: "",
        gender: "",
        phoneNumber: "",
        email: "",
      },
    };
  },
  async mounted() {
    await this.getUserInfo();
  },
  methods: {
    onSubmit() {
      const userData = {
        userName: this.form.userName,
        gender: this.form.gender,
        email: this.form.email,
      };
      this.$axios
        .post("/api/updateUserInfo", userData)
        .then((res) => {
          const { success, status, message } = res.data;

          if (success) {
            if (status === 1) {
              this.getUserInfo();
              ElMessage.success(message);
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
    handleExit() {
      // 清除登录cookie和session ,调用退出登录接口，如果成功，跳转登录界面
      this.$axios
        .get("api/logout")
        .then((res) => {
          const { data } = res;
          const { success, logout, message } = data;
          if (success) {
            if (logout) {
              ElMessage.success(message);
              this.$router.replace("/login");
            } else {
              ElMessage.error(message);
            }
          }
        })
        .catch((err) => {
          throw err;
        });
    },
    async getUserInfo() {
      await this.$axios
        .get("/api/getuserinfo")
        .then((res) => {
          const { success, code, userInfo, message } = res.data;

          if (success) {
            if (code === 1) {
              this.form = userInfo;
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
    updatePassword() {
      const { password, phoneNumber } = this.ruleForm;
      this.$axios
        .post("/api/updatePassword", { phoneNumber, newPassword: password })
        .then((res) => {
          const { data } = res;
          const { status, success, message } = data;
          if (success) {
            if (status == 1) {
              ElMessage.success(message);
              this.dialogVisible = false;
              this.ruleForm = "";
            } else if (status == 2) {
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
    updateHeader() {
      let data = {  
        header: this.imageUrl,
      };
      this.$axios.post("/api/updateUserInfo", data).then((res) => {
        const { success, message } = res.data;
        if (success) {
          ElMessage.success("修改头像成功！");
          this.getUserInfo()
        } else {
          ElMessage.error(message);
        }
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
.wrapper {
  display: flex;
  .left {
    flex: 2.5;
    height: 100vh;
    border-right: 1px solid rgb(202, 199, 199);

    .head {
      height: 40vh;
      display: flex;
      justify-content: center;
      align-items: center;
      .head-pic {
        width: 80%;
        height: 28vh;
        border-radius: 50%;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
        }
      }
    }
    .update-head-pic {
      height: 4vh;
      display: flex;
      justify-content: center;
    }
    .left-main {
      width: 100%;
      height: 56vh;
      .big {
        height: 100%;
        display: flex;
        flex-direction: column;
        .small {
          width: 100%;
          flex: 1;
          display: flex;
          align-items: center;
          font-size: 0.2rem;
          .end {
            flex: 4;
            display: flex;
            justify-content: flex-end;
          }
          .start {
            flex: 7;
            display: flex;
            .el-button {
              border: none;
              font-size: 0.16rem;
              color: orange;
            }
          }
        }
        .small-last {
          display: flex;
          justify-content: center;
          align-items: center;
          padding-bottom: 40px;
          padding-top: 10px;
        }
      }
    }
  }
  .right {
    flex: 7.5;
    height: 100vh;
    display: flex;
    flex-direction: column;
    .title {
      width: 100%;
      height: 12vh;
      font-size: 0.4rem;
      color: rgb(51, 40, 21);

      font-weight: bold;
      display: flex;
      justify-content: center;
      align-items: flex-end;
    }
    .right-main {
      width: 100%;
      height: 88vh;
      display: flex;
      justify-content: center;
      align-items: center;
      .el-input {
        width: 93%;
      }
      .text {
        font-size: 14px;
      }

      .item {
        padding: 18px 0;
      }

      .box-card {
        width: 480px;
      }
    }
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
