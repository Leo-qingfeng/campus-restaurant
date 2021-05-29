<template>
  <div id="backgroundPicture">
    <div class="wrapper">
      <div class="all-input">
        <label class="control-input1" for="el-input1">登录账号</label>
        <el-input
          class="el-input1"
          id="el-input1"
          placeholder="请输入昵称或手机号码"
          v-model="nickName"
        >
          <template #suffix>
            <i class="el-input__icon el-icon-user"></i> /
            <i class="el-input__icon el-icon-phone-outline"></i>
          </template>
        </el-input>
        <label class="control-input2" for="el-input2">登录密码</label>
        <el-input
          class="el-input2"
          type="password"
          id="el-input2"
          placeholder="请输入密码"
          v-model="password"
          @keydown.enter="handleLogin"
        >
          <template #suffix>
            <i class="el-input__icon el-icon-key"></i>
          </template>
        </el-input>
        <div class="login">
          <el-button class="login-button" type="primary" @click="handleLogin"
            >登&#8194;录</el-button
          >
        </div>
        <div class="register">
          <el-button type="text" @click="dialogVisible = true"
            >忘了密码</el-button
          >
          <span>|</span>
          <el-button @click="toRegister" type="text">注册新账号</el-button>
        </div>
      </div>
    </div>

    <el-dialog title="重置密码" v-model="dialogVisible" width="25.5%">
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
        <el-form-item prop="newPassword">
          <el-input
            class="el-input"
            placeholder="请输入新密码"
            show-password
            v-model="ruleForm.newPassword"
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
  </div>
</template>

<script>
import { ElMessage } from "element-plus";

export default {
  name: "Login",
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
      nickName: "",
      password: "",
      dialogVisible: false,
      ruleForm: {
        newPassword: "",
        checkPassword: "",
        phoneNumber: null,
      },
      rules: {
        newPassword: [
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
    };
  },
  methods: {
    toRegister() {
      this.$router.push("/register");
    },
    handleLogin() {
      const loginData = {
        userName: this.nickName,
        password: this.password,
      };
      this.$axios
        .post("/api/login", loginData)
        .then((res) => {
          const { success, message, status, data } = res.data;
          if (success) {
            switch (status) {
              case 1:
              localStorage.setItem('role',data.role);
              localStorage.setItem('userId',data._id);
                ElMessage.success(message);
                if(localStorage.getItem('role')==0){
                  this.$router.push('/order')
                }else{
                this.$router.push("/home");

                }
                break;
              case 2:
                ElMessage.error(message);
                break;
              default:
                ElMessage.error(message);
                break;
            }
          } else {
            ElMessage.error(message);
          }
        })
        .catch((err) => {
          throw err;
          // ElMessage.error("系统错误，请稍后再试");
        });
    },
    updatePassword() {
      const { newPassword, phoneNumber } = this.ruleForm;
      this.$axios
        .post("/api/updatePassword", { phoneNumber, newPassword })
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
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
#backgroundPicture {
  width: 100%;
  height: 100vh;
  background-image: url("../../public/login-picture.jpg");
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 390px;
    height: 260px;
    background-color: rgba(240, 238, 238, 0.8);
    border-radius: 0.15rem;
    margin-top: -1rem;
    box-shadow: 0 0 0.08rem white;
    .all-input {
      margin-top: 4%;
      .control-input1,
      .control-input2 {
        display: inline-block;
        font-weight: bold;
        font-size: 0.18rem;
        width: 100%;
        margin-left: 0.16rem;
      }
      .control-input1 {
        color: #3c763d;
      }
      .control-input2 {
        color: #a94442;
        margin-top: 0.14rem;
      }
      .el-input1,
      .el-input2 {
        width: 93%;
        margin-left: 0.15rem;
      }
      .el-input1 {
        outline: #3c763d;
      }
      .el-input2 {
        outline: #a94442;
      }
      .login {
        width: 100%;
        margin-top: 0.35rem;
        margin-left: 35%;
        .login-button {
          width: 30%;
        }
      }
      .register {
        float: right;
        span {
          color: #409eff;
        }
      }
    }
  }
}
</style>
