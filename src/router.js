import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

function importComponent(path) {
  return () => import(`./components/${path}.vue`);
}

const router = new VueRouter({
    mode: "history",
    routes: [
    //   Login
      {
        path: "/login-page",
        name: "LoginPage",
        meta: { title: "LoginPage" },
        component: importComponent("LoginPage"),
      },
      {
        path: "/dashboard-page",
        component: importComponent("DashboardLayout"),
        children: [
            //Dashboard
            {
                path: "/dashboard-page",
                name: "Dashboard",
                meta: { title: "DashboardPage" },
                component: importComponent("DashboardPage"),
                beforeEnter(to, from, next) {
                    if (localStorage.getItem("token")) next();
                    else next({ name: "Login" });
                },
            },
        ],
      },
      {
        path: "*",
        redirect: "/login-page",
      },
    ],
  });
  
  export default router;
  