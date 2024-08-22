import { beforeEach, describe, it, expect, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';

import { useOpenTriviaStore } from '../openTrivia';
import { useQuestionsStore } from '../questions';
import { decodeHtml } from '@/utils/decodeHtml';

const mockedResponse = {"response_code":0,"results":[{"type":"multiple","difficulty":"medium","category":"General Knowledge","question":"Who invented Pastafarianism?","correct_answer":"Bobby Henderson","incorrect_answers":["Eric Tignor","Bill Nye","Zach Soldi"]},{"type":"multiple","difficulty":"medium","category":"General Knowledge","question":"In the Morse code, which letter is indicated by 3 dots? ","correct_answer":"S","incorrect_answers":["O","A","C"]},{"type":"multiple","difficulty":"medium","category":"General Knowledge","question":"Which of these is the name of a Japanese system of alternative medicine, literally meaning &quot;finger pressure&quot;?","correct_answer":"Shiatsu","incorrect_answers":["Ukiyo","Majime","Ikigai"]},{"type":"multiple","difficulty":"medium","category":"General Knowledge","question":"Apple co-founder Steve Jobs died from complications of which form of cancer?","correct_answer":"Pancreatic","incorrect_answers":["Bone","Liver","Stomach"]},{"type":"multiple","difficulty":"medium","category":"General Knowledge","question":"Which logical fallacy means to attack the character of your opponent rather than their arguments?","correct_answer":"Ad hominem","incorrect_answers":["Post hoc ergo propter hoc","Tu quoque","Argumentum ad populum"]},{"type":"boolean","difficulty":"medium","category":"General Knowledge","question":"The term &quot;Spam&quot; came before the food product &quot;Spam&quot;.","correct_answer":"False","incorrect_answers":["True"]},{"type":"multiple","difficulty":"medium","category":"General Knowledge","question":"What is the romanized Japanese word for &quot;university&quot;?","correct_answer":"Daigaku","incorrect_answers":["Toshokan","Jimusho","Shokudou"]},{"type":"multiple","difficulty":"medium","category":"General Knowledge","question":"What year was Apple Inc. founded?","correct_answer":"1976","incorrect_answers":["1978","1980","1974"]},{"type":"multiple","difficulty":"medium","category":"General Knowledge","question":"After how many years would you celebrate your crystal anniversary?","correct_answer":"15","incorrect_answers":["20","10","25"]},{"type":"multiple","difficulty":"medium","category":"General Knowledge","question":"Which of these companies does NOT manufacture automobiles?","correct_answer":"Ducati","incorrect_answers":["Nissan","GMC","Fiat"]}]};

describe('OpenTrivia Store', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it('set questions', () => {
        const openTriviaStore = useOpenTriviaStore();

        openTriviaStore.setQuestions(mockedResponse.results);

        expect(openTriviaStore.questions).toStrictEqual(mockedResponse.results);;
    });

    it('get question of index store.counter', () => {
        const openTriviaStore = useOpenTriviaStore();
        const store = useQuestionsStore();

        openTriviaStore.setQuestions(mockedResponse.results);

        const firstQuestion = openTriviaStore.getQuestion();

        store.incrementCount();
        store.incrementCount();
        store.incrementCount();
        store.incrementCount();
        store.incrementCount();

        const fifthQuestion = openTriviaStore.getQuestion();

        const firstMocked = mockedResponse.results[0];
        const fifthMocked = mockedResponse.results[5];

        expect(firstQuestion).toStrictEqual({
            category: decodeHtml(firstMocked.category),
            correctAnswer: decodeHtml(firstMocked.correct_answer),
            incorrectAnswers: firstMocked.incorrect_answers.map(item => decodeHtml(item)),
            question: decodeHtml(firstMocked.question),
        });
        expect(fifthQuestion).toStrictEqual({
            category: decodeHtml(fifthMocked.category),
            correctAnswer: decodeHtml(fifthMocked.correct_answer),
            incorrectAnswers: fifthMocked.incorrect_answers.map(item => decodeHtml(item)),
            question: decodeHtml(fifthMocked.question),
        });
    })
});
