<template>
  <div class="container">
    <div width="180px" class="aside"><side-bar></side-bar></div>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import sideBar from "../components/Sidebar";

export default {
  name: "Home",
  components: {
    sideBar,
  },
};
</script>

<style lang="less" scoped>
.container {
  display: flex;
  .aside {
    flex: 2;
    height: 100vh;
  }
  .main {
    flex: 8;
  }
}
</style>
