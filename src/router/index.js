import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import RecentView from "@/views/RecentView.vue";
import CallView from "@/views/CallView.vue";
// import { component } from "vue/types/umd";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/callscreen",
    name: "callscreen",
    component: CallView,
  },
  {
    path: "/recents",
    name: "recents",
    component: RecentView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
