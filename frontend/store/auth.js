// @ts-nocheck
import { defineStore } from "pinia";
import { computed, ref } from "vue";

const API_BASE_URL = "http://localhost:3000/api/auth";

export const useAuth = defineStore(
  "auth",
  () => {
    const user = ref(null);
    const errorMessage = ref("");

    const isAuthenticated = computed(() => !!user.value);

    const handleError = (errorData) => {
      if (errorData.code === 11000) {
        return "User already exists. Please choose another username or login...";
      }
      if (errorData.message === "username or password not valid") {
        return "Username or password not valid. Please try again...";
      }
      return "Something went wrong!";
    };

    const authenticate = async (username, password, isLogin) => {
      if (
        password.length < 6 ||
        password.length > 20 ||
        username.length < 4 ||
        username.length > 20
      ) {
        errorMessage.value =
          "Please choose a username and password between 6 and 20 characters...";
        return false;
      }

      try {
        const response = await fetch(
          `${API_BASE_URL}/${isLogin ? "login" : "register"}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          errorMessage.value = handleError(errorData);
          return false;
        }

        const data = await response.json();
        user.value = { id: data.userId, username: data.username };
        return true;
      } catch (error) {
        console.error("Error:", error);
        errorMessage.value = "Something went wrong!";
        return false;
      }
    };

    const logout = () => {
      user.value = null;
      errorMessage.value = "";
    };
    const clearError = () => {
      errorMessage.value = "";
    };

    return {
      user,
      isAuthenticated,
      errorMessage,
      authenticate,
      logout,
      clearError,
    };
  },
  { persist: true }
);
