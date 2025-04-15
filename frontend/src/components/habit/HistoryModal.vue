<template>
  <div
    class="fixed inset-0 bg-app-green-300/30 bg-opacity-50 flex justify-center items-center"
    @click.self="$emit('close')"
  >
    <div class="bg-white w-150 p-6 rounded-lg shadow-lg">
      <p class="text-2xl font-semibold text-gray-800">Habit History</p>

      <!-- Tableau d'historique -->
      <div class="overflow-x-auto mt-5 max-h-96">
        <table class="min-w-full mt-5 border-collapse">
          <thead>
            <tr>
              <th class="py-3 px-4 text-left text-sm font-medium text-gray-600">
                Habit
              </th>
              <th
                v-for="date in uniqueDates"
                :key="date"
                class="py-3 px-4 text-center text-sm font-medium text-gray-600"
              >
                {{ date }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="habit in habits" :key="habit.name" class="border-b">
              <td class="py-3 px-4 text-left text-sm font-medium text-gray-800">
                {{ habit.name }}
              </td>
              <td
                v-for="date in uniqueDates"
                :key="date"
                class="py-3 px-4 text-center text-sm text-gray-800"
              >
                <span v-if="getHabitStatus(habit, date)">✅</span>
                <span v-else>❌</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useHabits } from "../../useHabits";
const habits = ref([]);

// Exemple de données, remplacer par des données réelles venant de l'API ou du store
// const habits = [
//   {
//     name: "Habit 1",
//     daysDone: [
//       { date: "2025-03-06", isDone: true },
//       { date: "2025-04-06", isDone: true },
//       { date: "2025-05-06", isDone: true },
//       { date: "2025-06-06", isDone: true },
//       { date: "2025-07-06", isDone: true },
//       { date: "2025-08-06", isDone: true },
//       { date: "2025-09-06", isDone: true },
//       { date: "2025-10-06", isDone: true },
//       { date: "2025-11-06", isDone: true },
//       { date: "2025-12-06", isDone: true },
//       { date: "2025-13-06", isDone: true },
//       { date: "2025-14-06", isDone: true },
//       { date: "2025-15-06", isDone: true },
//       { date: "2025-16-06", isDone: true },
//       { date: "2025-03-06", isDone: true },
//       { date: "2025-03-06", isDone: true },
//       { date: "2025-03-06", isDone: true },
//       { date: "2025-03-06", isDone: true },
//       { date: "2025-03-06", isDone: true },
//       { date: "2025-03-06", isDone: true },
//       { date: "2025-03-06", isDone: true },
//       { date: "2025-03-06", isDone: true },
//       { date: "2025-03-05", isDone: false },
//     ],
//   },
//   {
//     name: "Habit 2",
//     daysDone: [
//       { date: "2025-03-06", isDone: false },
//       { date: "2025-03-05", isDone: true },
//     ],
//   },
// ];

// Utiliser une fonction asynchrone pour charger les habitudes
const { fetchAllUserHabit } = useHabits();

onMounted(async () => {
  // Appeler la fonction pour récupérer les données d'habitudes
  habits.value = await fetchAllUserHabit;
  console.log("habits : ", habits.value);
});
// Extraire toutes les dates uniques
const uniqueDates = computed(() => {
  const dates = habits.value.flatMap((habit) =>
    habit.daysDone.map((day) => day.date)
  );
  return Array.from(new Set(dates)).sort();
});

// Fonction pour obtenir le statut de l'habitude pour une date donnée
const getHabitStatus = (habit, date) => {
  const day = habit.daysDone.find((day) => day.date === date);
  return day ? day.isDone : false;
};

const emit = defineEmits(["close"]);
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
}

th {
  background-color: #f4f4f4;
}

td {
  text-align: center;
}
</style>
