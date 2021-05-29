import "./plugins/axios";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 引入字体自适应组件
import "lib-flexible";
// 引入ElementPlus组件
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import locale from "element-plus/lib/locale/lang/zh-cn";
import installAxios from './plugins/axios';

const app = createApp(App)
installAxios(app)

app.use(store).use(router).use(ElementPlus, { locale }).mount("#app");
