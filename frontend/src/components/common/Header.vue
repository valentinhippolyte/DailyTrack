<template>
  <div class="flex items-center gap-2 container mx-auto mt-4">
    <RouterLink to="/" class="flex items-center">
      <span class="text-4xl">✅</span>
      <h1 class="text-2xl text-app-text font-bold">DailyTracker</h1>
    </RouterLink>
    <div v-if="!store.isAuthenticated" class="text-xl flex gap-4 ml-auto">
      <RouterLink to="/auth?mode=login">
        <p
          class="text-xl text-app-text-300 hover:text-app-green-600 cursor-pointer"
        >
          Login
        </p>
      </RouterLink>
      <RouterLink to="/auth?mode=register">
        <p
          class="text-app-text font-semibold hover:text-app-green-600 cursor-pointer"
        >
          Start Now
        </p>
      </RouterLink>
    </div>
    <div v-else class="text-xl flex gap-4 ml-auto">
      <button
        @click="logout"
        class="text-xl text-app-text-300 hover:text-app-green-600 cursor-pointer"
      >
        Logout
      </button>
    </div>
  </div>
</template>

<script setup>
import { useAuth } from "../../../store/auth.js";

const store = useAuth();

const logout = () => {
  store.user = null;
  store.clearError();
};
</script>
