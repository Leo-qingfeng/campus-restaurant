import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import { ElMessage } from 'element-plus';
import axios from 'axios';

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: () => import('../views/Register.vue'),
  },
  {
    path: "/home",
    name: "Home",
    component: () => import('../views/Home.vue'),
    redirect: "/menu",
    meta: {
      permission: true
    },
    beforeEnter: (to, from, next) => {
      axios.get('/api/islogin')
      .then(res => {
        const {
          isLogin,
          success
        } = res.data;
        console.log(res);
        if (success) {
          if (isLogin) {
            next();
          } else {
            ElMessage.error('当前未登录，请重新登陆！')
            next('/login')
          }
        }
      }).catch(err => {
        throw err;
        // ElMessage.error('系统错误，请重新登陆！')
        // next('/login')
      })
    },
    children: [
      {
        path: "/personal",
        name: "Personal",
        // 按需引入
        component: () => import("../components/Personal.vue"),
      },
      {
        path: "/menu",
        name: "Menu",
        // 按需引入
        component: () => import("../components/Menu.vue"),
      },
      {
        path: "/order",
        name: "Order",
        component: () => import("../components/Order.vue"),
      },
      {
        path: "/history",
        name: "History",
        component: () => import("../components/History.vue"),
      },
      {
        path: "/menucontrol",
        name: "Menucontrol",
        component: () => import("../components/Menucontrol.vue"),
      },
      {
        path: "/display",
        name: "Display",
        component: () => import("../components/Display.vue"),
      },{
        path:'/pay',
        name:'pay',
        component:()=>import("../components/Pay.vue")
      }
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
