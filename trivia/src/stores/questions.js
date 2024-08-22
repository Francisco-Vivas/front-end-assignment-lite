import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useQuestionsStore = defineStore('questions', () => {
    const category = ref();
    const correctAnswers = ref(0);
    const count = ref(0);
    const difficulty = ref('Medium');
    const incorrectAnswers = ref(0);

    function incrementCorrectAnswers() {
        correctAnswers.value++;
    }

    function incrementCount() {
        count.value++;
    }

    function incrementIncorrectAnswers() {
        incorrectAnswers.value++;
    }

    function resetCounters() {
        correctAnswers.value = 0;
        count.value = 0;
        incorrectAnswers.value = 0;
    }

    function resetCount() {
        count.value = 0;
    }

    function setCategory(newCategory) {
        category.value = newCategory;
    }

    function setDifficulty(newDifficulty) {
        difficulty.value = newDifficulty;
    }

    return {
        category,
        correctAnswers,
        count,
        difficulty,
        incorrectAnswers,
        incrementCorrectAnswers,
        incrementCount,
        incrementIncorrectAnswers,
        setCategory,
        setDifficulty,
        resetCounters,
        resetCount,
    };
});
