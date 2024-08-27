import Vue from "vue";
import VueRouter from "vue-router";
import PageHome from "@/views/PageHome.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: PageHome,
  }, 
  {
    path: "/new-student",
    name: "new-student",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/PageNewStudent.vue"),
  },
  {
    path: "/edit-student",
    name: "edit-student",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/PageEditStudent.vue"),
  },
  {
    path: "/remove-student",
    name: "remove-student",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/PageRemoveStudent.vue"),
  },
  {
    path: "/lookup-student",
    name: "lookup-student",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/PageLookUpStudent.vue"),
  },
  {
    path: "/software-settings",
    name: "software-settings",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/PageSoftwareSettings.vue"),
  },
  
];

const router = new VueRouter({
  mode: process.env.IS_ELECTRON ? 'hash' : 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
