import Vue from "vue";
import VueRouter from "vue-router";
import DashboardContainer from "../components/Dashboard/DashboardContainer.vue";
import StudentsContainer from "../components/Dashboard/Students/StudentsContainer.vue";
import TestsListContainer from "../components/Dashboard/TestBuilder/TestsListContainer.vue";
import TestBuilderContainer from "../components/Dashboard/TestBuilder/TestBuilderContainer.vue";
import { authGuard } from "../auth/authGuard";
import TestContainer from "../components/Test/TestContainer.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/test/:id",
    name: "Test",
    component: TestContainer,
    props: (route) => ({ query: route.query.code })
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashboardContainer,
    beforeEnter: authGuard,
    children: [
      {
        path: "students",
        component: StudentsContainer
      },
      {
        path: "tests",
        component: TestsListContainer
      },
      {
        name: 'TestEditing',
        path: "test/:testId",
        component: TestBuilderContainer,
        props: true
      }
    ]
  },
  {
    path: "/not-found",
    name: "NotFound",
    component: TestContainer
  },
  {
    path: "*",
    redirect: "/dashboard"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
