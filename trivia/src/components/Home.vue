<script setup>
    import { computed, onMounted, ref  } from 'vue'
    import { useRouter } from 'vue-router'

    import { useQuestionsStore } from '../stores/questions';

    import { getCategories } from '@/services/fetchOpenTriviaData';

    const categories = ref([]);
    const selectedCategory = ref();
    const selectedDifficulty = ref();

    const router = useRouter();
    const store = useQuestionsStore();

    const isReadyToPlay = computed(() => categories.value.length);

    const difficulties = [
        'Easy',
        'Medium',
        'Hard',
    ];

    onMounted(async () => {
        const tempCategories = await getCategories();

        if (!tempCategories) {
            return null;
        }

        categories.value = tempCategories;
        selectedDifficulty.value = store.difficulty;
        selectedCategory.value = tempCategories[0].id;
    });

    const handleCategoryChange = (event) => {
        selectedCategory.value = event.target.value;
    };

    const handleDifficultyChange = (event) => {
        selectedDifficulty.value = event.target.value;
    };

    const startGame = () => {
        store.setCategory(selectedCategory.value);
        store.setDifficulty(selectedDifficulty.value);

        router.push({ name: 'game' })
    };
</script>

<template>
    <div :class="$style.root">
        <div :class="$style.selectorSection">
            <label for="category_selector">
                Select a category
            </label>

            <select
            :class="$style.select"
            id="category_selector"
            name="category_selector"
            @change="handleCategoryChange">
                <option
                :key="category.id"
                :id="category.name"
                :selected="parseInt(selectedCategory) === category.id"
                :value="category.id"
                v-for="category in categories">
                    {{ category.name }}
                </option>
            </select>
        </div>

        <div :class="$style.selectorSection">
            <label for="category_selector">
                Select a difficulty
            </label>

            <select
            :class="$style.select"
            id="difficulty_selector"
            name="difficulty_selector"
            @change="handleDifficultyChange">
                <option
                :key="difficulty"
                :id="difficulty"
                :value="difficulty"
                :selected="selectedDifficulty === difficulty"
                v-for="difficulty in difficulties">
                    {{ difficulty }}
                </option>
            </select>
        </div>

        <div :class="$style.actionButtons">
            <button
            @click="startGame"
            :class="[$style.button, $style.buttonPrimary]"
            v-if="isReadyToPlay">
                Start Game
            </button>
        </div>
    </div>
</template>

<style module>
    .root {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
    }

    .selectorSection {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-bottom: var(--margin-bottom);
    }

    .select {
        padding: 10px 25px;
        border-radius: 20px;
        border: 0;
        color: var(--c-foreground);
        background-color: var(--c-input-base);
    }

    .select:focus {
        outline: var(--outline);
        outline-offset: var(--outline-offset);
    }

    .actionButtons {
        display: flex;
        justify-content: center;
    }

    /*  =============================
        Buttons
        =============================    */

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
        opacity: 0.85;
    }

    /*  Button: Primary
    ----------------------------- */

    .buttonPrimary {
        color: var(--c-background);
        background-color: var(--c-foreground)
    }
</style>
