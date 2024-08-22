import { nextTick } from 'vue';
import { beforeEach, describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';

import { useQuestionsStore } from '@/stores/questions';
import { useOpenTriviaStore } from '@/stores/openTrivia';

import Questions from '../Questions.vue';

const mockedResponse = {"response_code":0,"results":[{"type":"multiple","difficulty":"medium","category":"General Knowledge","question":"Who invented Pastafarianism?","correct_answer":"Bobby Henderson","incorrect_answers":["Eric Tignor","Bill Nye","Zach Soldi"]},{"type":"multiple","difficulty":"medium","category":"General Knowledge","question":"In the Morse code, which letter is indicated by 3 dots? ","correct_answer":"S","incorrect_answers":["O","A","C"]},{"type":"multiple","difficulty":"medium","category":"General Knowledge","question":"Which of these is the name of a Japanese system of alternative medicine, literally meaning &quot;finger pressure&quot;?","correct_answer":"Shiatsu","incorrect_answers":["Ukiyo","Majime","Ikigai"]},{"type":"multiple","difficulty":"medium","category":"General Knowledge","question":"Apple co-founder Steve Jobs died from complications of which form of cancer?","correct_answer":"Pancreatic","incorrect_answers":["Bone","Liver","Stomach"]},{"type":"multiple","difficulty":"medium","category":"General Knowledge","question":"Which logical fallacy means to attack the character of your opponent rather than their arguments?","correct_answer":"Ad hominem","incorrect_answers":["Post hoc ergo propter hoc","Tu quoque","Argumentum ad populum"]},{"type":"boolean","difficulty":"medium","category":"General Knowledge","question":"The term &quot;Spam&quot; came before the food product &quot;Spam&quot;.","correct_answer":"False","incorrect_answers":["True"]},{"type":"multiple","difficulty":"medium","category":"General Knowledge","question":"What is the romanized Japanese word for &quot;university&quot;?","correct_answer":"Daigaku","incorrect_answers":["Toshokan","Jimusho","Shokudou"]},{"type":"multiple","difficulty":"medium","category":"General Knowledge","question":"What year was Apple Inc. founded?","correct_answer":"1976","incorrect_answers":["1978","1980","1974"]},{"type":"multiple","difficulty":"medium","category":"General Knowledge","question":"After how many years would you celebrate your crystal anniversary?","correct_answer":"15","incorrect_answers":["20","10","25"]},{"type":"multiple","difficulty":"medium","category":"General Knowledge","question":"Which of these companies does NOT manufacture automobiles?","correct_answer":"Ducati","incorrect_answers":["Nissan","GMC","Fiat"]}]};

describe('Questions', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it('renders properly', () => {
        const store = useQuestionsStore();
        const openTriviaStore = useOpenTriviaStore();

        store.setCategory(9);
        store.setDifficulty('Medium');
        openTriviaStore.setQuestions(mockedResponse.results);

        const wrapper = mount(Questions);
        expect(wrapper.text()).toContain('Question 1 / 10');
        expect(wrapper.text()).toContain('Category: General Knowledge');
    });

    it('fails when the incorrect option is selected', async () => {
        const store = useQuestionsStore();
        const openTriviaStore = useOpenTriviaStore();

        store.setCategory(9);
        store.setDifficulty('Medium');
        openTriviaStore.setQuestions(mockedResponse.results);

        const wrapper = mount(Questions);

        const incorrectOption = mockedResponse.results[0].incorrect_answers[0];
        const $incorrectOption = wrapper.find(`button[id='${incorrectOption}']`);
        $incorrectOption.trigger("click");
        await nextTick();

        expect($incorrectOption.classes().join(' ')).toContain('incorrectAnswer');
    });

    it('win when the correct option is selected', async () => {
        const store = useQuestionsStore();
        const openTriviaStore = useOpenTriviaStore();

        store.setCategory(9);
        store.setDifficulty('Medium');
        openTriviaStore.setQuestions(mockedResponse.results);

        const wrapper = mount(Questions);

        const correctOption = mockedResponse.results[0].correct_answer;
        const $correctOption = wrapper.find(`button[id='${correctOption}']`);
        $correctOption.trigger('click');
        await nextTick();

        expect($correctOption.classes().join(' ')).toContain('correctAnswer');
    });
});
