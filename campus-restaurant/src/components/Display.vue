<template>
  <div>
    <el-card class="el-card">
      <div class="pie">
        <div id="pie1">
          <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
          <div
            id="main1"
            style="float: left; width: 100%; height: 600px; margin-top: 50px"
          ></div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
// 引入基本模版
let echarts = require("echarts/lib/echarts");
// 引入饼状图组件
require("echarts/lib/chart/pie");
// 引入柱状图组件
require("echarts/lib/chart/bar");
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");

export default {
  name: "Display",
  data() {
    return {
      name: [],
      weekData: [],
    };
  },
  async mounted() {
    await this.getWeekData();
    this.initData();
  },
  methods: {
    //初始化数据
    initData() {
      this.getWeekData();
      // 基于准备好的dom，初始化echarts实例
      var main1 = echarts.init(document.getElementById("main1"));
      // 绘制图表
      main1.setOption({
        title: {
          text: "周销售占比", //主标题
          subtext: "一周内每天的销售额占比", //副标题
          x: "center", //x轴方向对齐方式
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },

        series: [
          {
            name: "销售占比",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: this.weekData,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      });
    },
    async getWeekData() {
      await this.$axios
        .get("/api/getWeekData")
        .then((res) => {
          const { success, data } = res.data;
          if (success) {
            data.forEach((e) => {
              this.name.push(e._id);
              this.weekData.push({ value: e.total, name: e._id });
            });
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
.el-card {
  width:90%;
  border: none;
}
.tooltip {
  transition-duration: 0;
  //echart防止tooltip的抖动
}
</style>
