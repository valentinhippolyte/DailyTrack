<template>
  <div
    v-if="!store.isAuthenticated"
    class="container mx-auto mt-20 flex-col text-center"
  >
    <h2 class="text-5xl font-semibold text-app-text">
      The Easiest Habit Tracker App you'll ever use
    </h2>
    <p class="text-xl text-app-text-300 mt-10">
      Build better habits effortlessly and achieve more by doing less.
    </p>
    <RouterLink to="/auth?mode=register">
      <button
        class="bg-app-green-600 text-xl text-white font-semibold px-3 py-2 rounded-md mt-10 hover:bg-app-green-700 hover:transform hover:scale-102 transition-transform cursor-pointer"
      >
        ✅ Start your DailyTrack!
      </button>
    </RouterLink>
    <p class="text-app-text-400 mt-4">100% free forever</p>
  </div>
  <HabitsScreen v-else />
</template>

<script setup>
import { useAuth } from "../../../store/auth.js";
import HabitsScreen from "../views/HabitsView.vue";
const store = useAuth();
</script>
