<template>
  <div
    class="fixed inset-0 bg-app-green-300/30 flex justify-center items-center"
    @click.self="$emit('close')"
  >
    <div class="bg-white w-96 p-5 rounded-md shadow-md">
      <p class="text-2xl font-bold pt-3 text-app-text">Add a habit</p>
      <form @submit.prevent="submitHabit">
        <input
          ref="habitInput"
          type="text"
          placeholder="habit"
          class="border-2 border-app-text-300 hover:border-app-green-500 focus:border-app-green-600 focus:ring-2 focus:ring-app-green-200 rounded-md w-full px-2 py-1.5 mt-2 outline-none"
          v-model="name"
        />
        <div class="text-right mt-3">
          <button
            class="bg-app-green-500 text-white font-bold py-1.5 px-3 rounded-md hover:bg-app-green-600 transition-transform cursor-pointer disabled:bg-app-text-300 disabled:cursor-not-allowed"
            :disabled="name === ''"
            type="submit"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const name = ref("");
const habitInput = ref(null);
const emit = defineEmits(["close", "add"]);

const submitHabit = () => {
  if (name.value.trim()) {
    emit("add", name.value);
    emit("close");
    name.value = "";
  }
};
onMounted(() => {
  habitInput.value?.focus();
});
</script>
