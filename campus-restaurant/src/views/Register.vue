<template>
  <div id="backgroundPicture">
    <div class="wrapper">
      <el-form
        class="all-input"
        :rules="rules"
        ref="ruleForm"
        :model="ruleForm"
      >
        <div class="welcome">欢迎注册·校园餐厅</div>
        <el-form-item prop="nickName">
          <el-input
            class="el-input"
            placeholder="请输入昵称"
            v-model="ruleForm.nickName"
          >
            <template #suffix>
              <i class="el-input__icon el-icon-user"></i>
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
        <div class="register">
          <el-button
            class="register-button"
            type="primary"
            @click="submit('ruleForm')"
            >立即注册</el-button
          >
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
export default {
  name: "Register",
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
      ruleForm: {
        nickName: "",
        password: "",
        checkPassword: "",
        phoneNumber: "",
      },
      rules: {
        nickName: [
          { required: true, trigger: "blur", message: "昵称不能为空!" },
          {
            min: 2,
            max: 6,
            message: "昵称为 2 到 6 位的字符",
            trigger: "blur",
          },
        ],
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
          { type: "number", message: "手机号必须为数字" },
          { validator: phonecount, trigger: "blur" },
        ],
      },
    };
  },

  methods: {
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const { nickName, password, phoneNumber } = this.ruleForm;
          const userInfo = {
            userName: nickName,
            password,
            phoneNumber,
            role:1
          };
          this.$axios
            .post("/api/register", userInfo)
            .then((res) => {
              const { data } = res;
              const { success, message, status } = data;
              if (success) {
                switch (status) {
                  case 1:
                    ElMessage.success(message);
                    this.$router.push("/login");
                    break;
                  case 2:
                    ElMessage.error(message);
                    break;
                  default:
                    ElMessage.success(message);
                }
              } else {
                ElMessage.error(message);
              }
            })
            .catch((err) => {
              console.log(err);
              ElMessage.error("注册失败！");
            });
        } else {
          return false;
        }
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
    height: 408px;
    background-color: rgba(240, 238, 238, 0.8);
    border-radius: 0.15rem;
    margin-top: -1rem;
    box-shadow: 0 0 0.08rem white;
    .all-input {
      width: 93%;
      margin-left: 0.25rem;
      .welcome {
        font-size: 0.3rem;
        color: rgb(243, 17, 84);
        font-weight: bold;
        margin-bottom: 0.1rem;
        margin-left: 0.35rem;
      }
      .el-input {
        width: 93%;
        margin-top: 0.05rem;
      }
      .register {
        width: 100%;
        margin-top: 0.35rem;
        margin-left: 21.5%;
        .register-button {
          width: 50%;
          font-size: 0.2rem;
        }
      }
    }
  }
}
</style>
