<script setup>
    import { useRouter } from 'vue-router';

    import { useQuestionsStore } from '../stores/questions';

    const store = useQuestionsStore();
    const router = useRouter();

    const handlePlayAgain = () => {
        store.resetCounters();
        router.push({ name: 'home' });
    };
</script>

<template>
    <div :class="$style.root">
        <p :class="$style.lead">
            You have finished!
        </p>

        <p>
            Correct: <span :class="$style.correct">{{ store.correctAnswers }}</span> | Incorrect: <span :class="$style.incorrect">{{ store.incorrectAnswers }}</span>
        </p>

        <p v-if="store.correctAnswers === store.count">
            Perfect!
        </p>

        <p v-if="store.correctAnswers !== store.count">
            Soo close! Try again to improve your performance!
        </p>

        <button
        :class="[$style.button, $style.buttonPrimary]"
        @click="handlePlayAgain">
            Play Again
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
        margin-bottom: 0;
    }

    .correct {
        color: #bdecb6;
    }

    .incorrect {
        color: #ff6961;
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
</style>
