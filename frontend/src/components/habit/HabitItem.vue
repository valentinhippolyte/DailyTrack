<template>
  <div>
    <button
      class="w-fit py-4 mt-5 mx-auto rounded-md text-app-text text-xl font-semibold px-4 hover:scale-105 transition-transform cursor-pointer"
      :class="
        habit.isDone
          ? 'bg-app-green/30 border-app-green-700'
          : 'bg-app-red/30 border-app-red-700'
      "
      @click="$emit('toggle', habit._id)"
    >
      {{ habit.name }} {{ habit.isDone ? "✅" : "❌" }}
    </button>

    <button @click="$emit('remove', habit._id)">
      <span
        class="inline-flex items-center justify-center w-4 h-4 ms-2 text-xs font-semibold border border-app-text-700 p-2.5 rounded-sm hover:scale-102 cursor-pointer"
      >
        X
      </span>
    </button>
  </div>
</template>

<script setup>
defineProps(["habit"]);
defineEmits(["toggle", "remove"]);
</script>
