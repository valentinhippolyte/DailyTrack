<template>
  <div class="container mx-auto mt-20 flex-col text-center">
    <h2 class="text-5xl font-semibold mb-10">Habits to make today!</h2>

    <FadeTransition>
      <HabitItem
        v-for="habit in filterHabitsByDone"
        :key="habit._id"
        :habit="habit"
        @toggle="changeIsDone"
        @remove="removeHabit"
      />
    </FadeTransition>

    <button
      class="bg-app-text-50 py-1.5 px-3 mt-5 border border-app-text-700 rounded-sm font-bold hover:scale-105 cursor-pointer"
      @click="showAddHabitModal = true"
    >
      Add new habit
    </button>

    <button
      class="bg-app-text-50 py-1.5 px-3 mt-5 border border-app-text-700 rounded-sm font-bold hover:scale-105 cursor-pointer"
      @click="showHistoryModal = true"
    >
      See History
    </button>

    <addHabitModal
      v-if="showAddHabitModal"
      @close="showAddHabitModal = false"
      @add="addHabit"
    />
    <HistoryModal v-if="showHistoryModal" @close="showHistoryModal = false" />

    <div v-if="isItAllDone">All done!</div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useHabits } from "../../useHabits";
import FadeTransition from "../common/FadeTransition.vue";
import addHabitModal from "../habit/AddHabitModal.vue";
import HabitItem from "../habit/HabitItem.vue";
import HistoryModal from "../habit/HistoryModal.vue";

const { filterHabitsByDone, isItAllDone, addHabit, removeHabit, changeIsDone } =
  useHabits();
const showAddHabitModal = ref(false);
const showHistoryModal = ref(false);
</script>
