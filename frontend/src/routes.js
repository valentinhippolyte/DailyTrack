import AuthScreen from "./components/views/AuthView.vue";
import HomeScreen from "./components/views/HomeView.vue";
import NotFound from "./components/views/NotFoundView.vue";

export const routes = [
  { path: "/", component: HomeScreen },
  { path: "/auth", component: AuthScreen },

  {
    path: "/:pathMatch(.*)*",
    component: NotFound,
  },
];
