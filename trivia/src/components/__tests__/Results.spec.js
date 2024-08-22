import { nextTick } from 'vue';
import { beforeEach, describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';

import { useQuestionsStore } from '@/stores/questions';

import Results from '../Results.vue';

describe('Results', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it('renders properly', () => {
        const wrapper = mount(Results);
        expect(wrapper.text()).toContain('You have finished!');
        expect(wrapper.text()).toContain('Play Again');
    });

    it('has the exact amount of correct answers', () => {
        const store = useQuestionsStore();

        store.incrementCorrectAnswers();
        store.incrementCorrectAnswers();
        store.incrementCorrectAnswers();
        store.incrementCorrectAnswers();
        store.incrementCorrectAnswers();

        store.incrementIncorrectAnswers();
        store.incrementIncorrectAnswers();
        store.incrementIncorrectAnswers();
        store.incrementIncorrectAnswers();
        store.incrementIncorrectAnswers();

        const wrapper = mount(Results);

        expect(wrapper.text()).toContain('Correct: 5 | Incorrect: 5');
        expect(wrapper.text()).toContain('Soo close! Try again to improve your performance!');
    });

    it('has a perfect score', () => {
        const store = useQuestionsStore();

        store.incrementCorrectAnswers();
        store.incrementCorrectAnswers();
        store.incrementCorrectAnswers();
        store.incrementCorrectAnswers();
        store.incrementCorrectAnswers();
        store.incrementCorrectAnswers();
        store.incrementCorrectAnswers();
        store.incrementCorrectAnswers();
        store.incrementCorrectAnswers();
        store.incrementCorrectAnswers();

        store.incrementCount();
        store.incrementCount();
        store.incrementCount();
        store.incrementCount();
        store.incrementCount();
        store.incrementCount();
        store.incrementCount();
        store.incrementCount();
        store.incrementCount();
        store.incrementCount();

        const wrapper = mount(Results);

        expect(wrapper.text()).toContain('Correct: 10');
        expect(wrapper.text()).toContain('Perfect!');
    });
});
