// @ts-nocheck
import { computed, onMounted, ref } from "vue";
import { useAuth } from "../store/auth.js";

export function useHabits() {
  const habits = ref([]);
  const store = useAuth();

  const fetchAllUserHabits = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/habits/user/${store.user.id}`
      );
      habits.value = await response.json();
    } catch (error) {
      console.error("Erreur lors de la récupération des habitudes", error);
    }
  };

  const addHabit = async (name) => {
    if (!name.trim()) return;

    try {
      const response = await fetch(`http://localhost:3000/api/habits`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, userId: store.user.id }),
      });

      if (!response.ok) throw new Error("Erreur lors de l'ajout");

      await fetchAllUserHabits();
    } catch (error) {
      console.error(error);
    }
  };

  const removeHabit = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/habits/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Erreur lors de la suppression");

      habits.value = habits.value.filter((habit) => habit._id !== id);
    } catch (error) {
      console.error(error);
    }
  };

  const changeIsDone = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/habits/${id}`, {
        method: "PUT",
      });

      if (!response.ok) throw new Error("Erreur lors de la modification");

      habits.value = habits.value.map((habit) =>
        habit._id === id ? { ...habit, isDone: !habit.isDone } : habit
      );
    } catch (error) {
      console.error(error);
    }
  };

  const filterHabitsByDone = computed(() =>
    habits.value.sort((a, b) => a.isDone - b.isDone)
  );

  const isItAllDone = computed(() =>
    habits.value.every((habit) => habit.isDone)
  );

  onMounted(fetchAllUserHabits);

  return {
    habits,
    fetchAllUserHabits,
    addHabit,
    removeHabit,
    changeIsDone,
    filterHabitsByDone,
    isItAllDone,
  };
}
