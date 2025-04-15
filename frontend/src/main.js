import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { createApp } from "vue";
import "vue-3-party-confettis/style.css";
import { createRouter, createWebHistory } from "vue-router";
import { useAuth } from "../store/auth.js";
import App from "./App.vue";
import { routes } from "./routes.js";
import "./style.css";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const store = useAuth();
  if (to.path === "/auth" && store.isAuthenticated) {
    next("/");
  } else {
    next();
  }
});

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(router);
app.use(pinia);
app.mount("#app");
