<script setup>
    import { computed, ref, watchEffect } from 'vue';
    import { useRouter } from 'vue-router';

    import { useQuestionsStore } from '../stores/questions';
    import { useOpenTriviaStore } from '../stores/openTrivia';

    const selectedAnswer = ref();
    const selectedQuestion = ref({});

    const answers = computed(() => {
        if (!selectedQuestion.value.correctAnswer && !selectedQuestion.value.incorrectAnswers) {
            return [];
        }

        return [
            selectedQuestion.value.correctAnswer,
            ...selectedQuestion.value.incorrectAnswers,
        ].sort((a, b) => a.localeCompare(b));
    });

    const router = useRouter();
    const store = useQuestionsStore();
    const openTriviaStore = useOpenTriviaStore();

    if (
        !store.category
        || !store.difficulty
    ) {
        router.push({ name: 'home' });
    }

    watchEffect(() => {
        const tempSelectedQuestion = openTriviaStore.getQuestion();

        if (!tempSelectedQuestion) {
            return null;
        }

        selectedQuestion.value = tempSelectedQuestion;
    });

    const handleSeeResults = () => {
        router.push({ name: 'results' });
    };

    const handleNextQuestion = () => {
        store.incrementCount();

        selectedAnswer.value = null;
    };

    const handleOptionClick = event => {
        selectedAnswer.value = event.target.id;

        if (selectedQuestion.value.correctAnswer === event.target.id) {
            store.incrementCorrectAnswers();
        } else {
            store.incrementIncorrectAnswers();
        }
    };
</script>

<template>
    <div :class="$style.root">
        <p>
            Question {{ store.count + 1 }} / {{ openTriviaStore.questions.length }}
        </p>

        <p>
            Category: {{ selectedQuestion.category }}
        </p>

        <p :class="$style.lead">
            {{ selectedQuestion.question }}
        </p>

        <div :class="$style.answers">
            <button
            @click="handleOptionClick"
            :key="answer"
            :id="answer"
            :disabled="selectedAnswer"
            :class="[
                $style.button,
                $style.option,
                { [$style.correctAnswer]: selectedAnswer && selectedAnswer === answer ? selectedAnswer === selectedQuestion.correctAnswer : null },
                { [$style.incorrectAnswer]: selectedAnswer && selectedAnswer === answer ? selectedAnswer !== selectedQuestion.correctAnswer : null }
            ]"
            v-for="answer in answers">
                {{ answer }}
            </button>
        </div>

        <button
        :class="[$style.button, $style.buttonPrimary]"
        @click="handleNextQuestion"
        v-if="selectedAnswer && store.count + 1 !== openTriviaStore.questions.length">
            Next Question
        </button>

        <button
        :class="[$style.button, $style.buttonPrimary]"
        @click="handleSeeResults"
        v-if="selectedAnswer && store.count + 1 === openTriviaStore.questions.length">
            See Results
        </button>
    </div>
</template>

<style module>
    .root {
        display: flex;
        justify-content: center;
        flex-direction: column;
    }

    .lead {
        font-size: var(--font-size-lg);
    }

    .answers {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr auto;
        gap: var(--gap);
        margin-bottom: var(--margin-bottom);
    }

    .button {
        min-height: 40px;
        padding: 5px 20px;
        border: 0;
        border-radius: 5px;
        font-size: 1rem;
        font-weight: 600;
        letter-spacing: 0.1em;
    }

    .button:focus {
        outline: var(--outline);
        outline-offset: var(--outline-offset);
    }

    .button:hover {
        opacity: 0.7;
    }

    .buttonPrimary {
        color: var(--c-background);
        background-color: var(--c-foreground)
    }

    .option {
        width: 100%;
        color: var(--c-foreground);
        background-color: var(--c-input-base);
    }

    .correctAnswer {
        color: var(--c-background);
        background-color: #bdecb6;
    }

    .incorrectAnswer {
        color: var(--c-background);
        background-color: #ff6961;
    }
</style>
