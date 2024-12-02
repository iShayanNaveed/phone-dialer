import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import Callscreen from "@/components/CallScreen.vue"
import Recents from "@/components/Recents.vue";

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
    component: Callscreen,
  },{
    path:"/recents",
    name:"recents",
    component : Recents
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
