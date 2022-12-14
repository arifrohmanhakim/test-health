export default [
  {
    component: "@/layouts/auth",
    routes: [{ path: "/sign-in", component: "@/pages/auth/signIn" }],
  },
  {
    component: "@/layouts/dashboard",
    routes: [{ path: "/dashboard", component: "@/pages/dashboard/index" }],
  },
];
