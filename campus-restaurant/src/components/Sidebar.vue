<template>
  <div class="wrapper">
    <el-row class="tac">
      <el-menu
        :uniqueOpened="true"
        :default-active="active"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        style="height: 100vh; width: 100%"
        background-color="rgb(255,165,0)"
        text-color="white"
        active-text-color="black"
        router
      >
        <el-menu-item index="/personal">
          <template #title>
            <i class="el-icon-user-solid"></i>
            <span>个人中心</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/menu" v-if="roleValue">
          <i class="el-icon-menu"></i>
          <template #title>菜品点单</template>
        </el-menu-item>
        <el-menu-item index="/history" v-if="roleValue">
          <i class="el-icon-document"></i>
          <template #title>历史订单</template>
        </el-menu-item>
        <el-menu-item index="/order" v-if="!roleValue">
          <i class="el-icon-set-up"></i>
          <template #title>订单管理</template>
        </el-menu-item>
        <el-menu-item index="/menucontrol" v-if="!roleValue">
          <i class="el-icon-set-up"></i>
          <template #title>菜品管理</template>
        </el-menu-item>
        <el-menu-item index="/display" v-if="!roleValue">
          <template #title>
            <i class="el-icon-view"></i>
            <span>数据展示</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/pay" v-if="!roleValue">
          <template #title>
            <i class="el-icon-money"></i>
            <span>充值中心</span>
          </template>
        </el-menu-item>
      </el-menu>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  data() {
    return {
      roleValue: true,
      active:'/menu'
    };
  },
  created() {

  },
  mounted() {
    this.getUrl();
    this.sideDisplay();

  },
  
  
  methods: {
    getUrl() {
      this.active = this.$route.path; 
    },
    sideDisplay() {
      const role = localStorage.getItem("role");
      if (parseInt(role) == 1) {
        this.roleValue = true;
      } else {
        this.roleValue = false;
      }
    },
  },
};
</script>

<style lang="less">
.el-menu-item {
  font-size: 0.2rem !important ;
}
</style>
