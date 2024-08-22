import { ref, onMounted, watchEffect } from 'vue';
import { defineStore, storeToRefs } from 'pinia';

import { useQuestionsStore } from '../stores/questions';

import { decodeHtml } from '../utils/decodeHtml';

import { getQuestions, getSessionToken } from '@/services/fetchOpenTriviaData';

export const useOpenTriviaStore = defineStore('openTrivia', () => {
    const sessionToken = ref('');
    const questions = ref([]);

    const store = useQuestionsStore();
    const { category, count, difficulty } = storeToRefs(store);

    onMounted(async () => {
        try {
            const response = await getSessionToken();

            sessionToken.value = response;
        } catch (error) {
            // console.log('defining sessionToken –', error.message);
        }
    });

    watchEffect(async () => {
        if (
            !category.value
            || !difficulty.value
        ) {
            return null;
        }

        const tempQuestions = await getQuestions(category, difficulty, sessionToken);

        setQuestions(tempQuestions);
    });

    function setQuestions(tempQuestions){
        questions.value = tempQuestions;
    }

    function getQuestion() {
        if (!questions.value?.length) {
            return {};
        }

        const selectedQuestion = questions.value[count.value];

        return {
            category: decodeHtml(selectedQuestion.category),
            correctAnswer: decodeHtml(selectedQuestion.correct_answer),
            incorrectAnswers: selectedQuestion.incorrect_answers.map(item => decodeHtml(item)),
            question: decodeHtml(selectedQuestion.question),
        };
    }

    return {
        getQuestion,
        questions,
        setQuestions,
    };
});
