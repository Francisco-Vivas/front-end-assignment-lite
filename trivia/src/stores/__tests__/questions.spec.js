import { beforeEach, describe, it, expect } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';

import { useQuestionsStore } from '../questions';

describe('Questions Store', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it('increments count', () => {
        const store = useQuestionsStore();
        expect(store.count).toBe(0);
        store.incrementCount();
        expect(store.count).toBe(1);
    });

    it('reset count', () => {
        const store = useQuestionsStore();

        store.incrementCount();
        store.incrementCount();
        store.incrementCount();
        store.incrementCount();
        expect(store.count).toBe(4);

        store.resetCount();
        expect(store.count).toBe(0);
    });

    if('sets a category', () => {
        const store = useQuestionsStore();

        store.setCategory('customCategory');
        expect(store.category).toBe('customCategory');
    });

    if('sets a difficulty', () => {
        const store = useQuestionsStore();

        store.setDifficulty('customDifficulty');
        expect(store.difficulty).toBe('customDifficulty');
    });
});
