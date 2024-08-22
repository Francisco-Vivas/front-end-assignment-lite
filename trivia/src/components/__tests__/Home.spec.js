import { nextTick } from 'vue';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { flushPromises, mount, shallowMount } from '@vue/test-utils';

import Home from '../Home.vue';

global.fetch = vi.fn();

function createFetchResponse(data, okStatus) {
    return {
        ok: okStatus,
        json: () => new Promise((resolve) => resolve(data)),
    }
}

describe('Home', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it('renders properly', async () => {
        const wrapper = mount(Home);

        const $categorySelector = wrapper.find("select[name='category_selector']");
        const $difficultySelector = wrapper.find("select[name='difficulty_selector']");

        expect(wrapper.text()).toContain('Select a category');
        expect(wrapper.text()).toContain('Select a difficulty');
        expect($categorySelector.exists()).toBeTruthy();
        expect($difficultySelector.exists()).toBeTruthy();
    });

    it('selects any category', async () => {
        const mockedResponse = {"trivia_categories":[{"id":9,"name":"General Knowledge"},{"id":10,"name":"Entertainment: Books"},{"id":11,"name":"Entertainment: Film"},{"id":12,"name":"Entertainment: Music"},{"id":13,"name":"Entertainment: Musicals & Theatres"},{"id":14,"name":"Entertainment: Television"},{"id":15,"name":"Entertainment: Video Games"},{"id":16,"name":"Entertainment: Board Games"},{"id":17,"name":"Science & Nature"},{"id":18,"name":"Science: Computers"},{"id":19,"name":"Science: Mathematics"},{"id":20,"name":"Mythology"},{"id":21,"name":"Sports"},{"id":22,"name":"Geography"},{"id":23,"name":"History"},{"id":24,"name":"Politics"},{"id":25,"name":"Art"},{"id":26,"name":"Celebrities"},{"id":27,"name":"Animals"},{"id":28,"name":"Vehicles"},{"id":29,"name":"Entertainment: Comics"},{"id":30,"name":"Science: Gadgets"},{"id":31,"name":"Entertainment: Japanese Anime & Manga"},{"id":32,"name":"Entertainment: Cartoon & Animations"}]};

        fetch.mockResolvedValue(createFetchResponse(mockedResponse, true))

        const wrapper = shallowMount(Home);
        await nextTick();
        await flushPromises();

        const $categorySelector = wrapper.find("select[name='category_selector']");
        const $categoryOption = wrapper.find("option[id='Entertainment: Music']");

        $categorySelector.setValue('12');
        await nextTick();

        expect($categorySelector.element.value).toBe($categoryOption.element.value);
    });

    it('selects any difficulty', async () => {
        const wrapper = mount(Home);

        const $difficultySelector = wrapper.find("select[name='difficulty_selector']");
        const $difficultyOption = wrapper.find("option[value='Easy']");

        $difficultySelector.trigger('click');
        await nextTick();
        $difficultyOption.trigger('click');
        await nextTick();

        expect($difficultySelector.element.value).toBe('Easy');
    });
});
