<template>
  <div class="container mx-auto p-4 flex flex-col items-center">
    <h2 class="text-2xl text-app-text font-bold mt-12 mb-6">
      {{
        isLogin
          ? "Login to your DailyTracker account"
          : "Create your DailyTracker account"
      }}
    </h2>

    <ErrorMessage :message="store.errorMessage" v-if="store.errorMessage" />

    <form @submit.prevent="submitForm">
      <div class="flex flex-col my-4">
        <div class="flex flex-row items-center gap-1">
          <span class="text-app-red-600 text-3xl">*</span>
          <label for="username" class="mb-2 text-app-text">Username</label>
        </div>
        <div>
          <input
            class="border rounded-sm px-2 py-1.5 w-112 hover:border-app-green hover:transition-colors duration-300"
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            autocomplete="username"
            v-model="form.username"
          />
        </div>
      </div>

      <div class="flex flex-col">
        <div class="flex flex-row items-center gap-1">
          <span class="text-app-red-600 text-3xl">*</span>
          <label for="password" class="mb-2 text-app-text">Password</label>
        </div>

        <div class="relative w-full">
          <input
            :type="showPassword ? 'text' : 'password'"
            class="border rounded-sm px-2 py-1.5 w-112 pr-10 hover:border-app-green hover:transition-colors duration-300"
            name="password"
            id="password"
            placeholder="Password"
            :autocomplete="isLogin ? 'current-password' : 'new-password'"
            v-model="form.password"
          />

          <button
            type="button"
            class="absolute right-2 top-1/2 transform -translate-y-1/2 text-app-text-400 hover:text-app-text transition"
            @click="showPassword = !showPassword"
            v-if="form.password.length > 0"
          >
            <span v-if="showPassword">👁️</span>
            <span v-else>🙈</span>
          </button>
        </div>
      </div>

      <div class="flex justify-center">
        <button
          class="bg-app-green-700 text-white px-20 py-2 border rounded-sm mt-6 cursor-pointer hover:bg-green-800 hover:transition-colors duration-200"
          type="submit"
        >
          {{ isLogin ? "Login" : "Create account" }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuth } from "../../../store/auth.js";
import ErrorMessage from "../common/ErrorMessage.vue";

const route = useRoute();
const router = useRouter();
const isLogin = computed(() => route.query.mode === "login");

const form = ref({
  username: "",
  password: "",
});
const store = useAuth();

const showPassword = ref(false);

const submitForm = async () => {
  const success = await store.authenticate(
    username.value,
    password.value,
    isLogin.value
  );

  if (success) {
    router.replace("/");
  } else {
    console.error("Athentication failed");
  }

  username.value = "";
  password.value = "";
};

onMounted(() => {
  store.clearError();
});
</script>
