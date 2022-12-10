import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const layout = () => import("@/layout/Index.vue");
const admin = () => import("@/views/admin");
const apiError = () => import("@/views/apiError");
const jsError = () => import("@/views/jsError");
const pageInfo = () => import("@/views/pageInfo");
const resourceError = () => import("@/views/resourceError");
const userAnalysis = () => import("@/views/userAnalysis");

const routes = [
  {
    path: "/",
    component: () => import("@/views/Login"),
    meta: {
      title: "登录界面"
    }
  },
  {
    path: "/login",
    redirect: "/"
  },
  {
    path: "/screen",
    component: () => import("@/views/resourceError"),
    meta: {
      title: "监控界面"
    }
  },
  {
    path: "/indexScreen",
    component: () => import("@/views/indexScreen")
  },
  {
    path: "/jsError",
    component: layout,
    children: [
      {
        path: "/",
        name: "jsError",
        component: jsError
      }
    ]
  },
  {
    path: "/apiError",
    component: layout,
    children: [
      {
        path: "/apiError",
        name: "apiError",
        component: apiError
      }
    ]
  },
  {
    path: "/pageInfo",
    component: layout,
    children: [
      {
        path: "/pageInfo",
        name: "pageInfo",
        component: pageInfo
      }
    ]
  },
  {
    path: "/resourceError",
    component: layout,
    children: [
      {
        path: "/resourceError",
        name: "resourceError",
        component: resourceError
      }
    ]
  },
  {
    path: "/userAnalysis",
    component: layout,
    children: [
      {
        path: "/userAnalysis",
        name: "userAnalysis",
        component: userAnalysis
      }
    ]
  },
  {
    path: "/admin",
    component: layout,
    children: [
      {
        path: "/admin",
        name: "admin",
        component: admin
      }
    ]
  }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

export default router;
