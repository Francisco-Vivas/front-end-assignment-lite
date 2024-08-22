import { beforeEach, describe, it, expect, vi } from 'vitest';
import { getCategories, getQuestions, getSessionToken } from '../fetchOpenTriviaData';

global.fetch = vi.fn();

function createFetchResponse(data, okStatus) {
    return {
        ok: okStatus,
        json: () => new Promise((resolve) => resolve(data)),
    }
}

describe('fetchOpenTriviaData service', () => {
    beforeEach(() => {
        global.fetch.mockReset();
    });

    it('should get categories', async () => {
        const mockedResponse = {"trivia_categories":[{"id":9,"name":"General Knowledge"},{"id":10,"name":"Entertainment: Books"},{"id":11,"name":"Entertainment: Film"},{"id":12,"name":"Entertainment: Music"},{"id":13,"name":"Entertainment: Musicals & Theatres"},{"id":14,"name":"Entertainment: Television"},{"id":15,"name":"Entertainment: Video Games"},{"id":16,"name":"Entertainment: Board Games"},{"id":17,"name":"Science & Nature"},{"id":18,"name":"Science: Computers"},{"id":19,"name":"Science: Mathematics"},{"id":20,"name":"Mythology"},{"id":21,"name":"Sports"},{"id":22,"name":"Geography"},{"id":23,"name":"History"},{"id":24,"name":"Politics"},{"id":25,"name":"Art"},{"id":26,"name":"Celebrities"},{"id":27,"name":"Animals"},{"id":28,"name":"Vehicles"},{"id":29,"name":"Entertainment: Comics"},{"id":30,"name":"Science: Gadgets"},{"id":31,"name":"Entertainment: Japanese Anime & Manga"},{"id":32,"name":"Entertainment: Cartoon & Animations"}]};

        fetch.mockResolvedValue(createFetchResponse(mockedResponse, true))

        const data = await getCategories();

        expect(fetch).toHaveBeenCalledWith('https://opentdb.com/api_category.php');

        expect(data).toStrictEqual(mockedResponse.trivia_categories);
    });

    it('should not get categories when response is not okay', async () => {
        const mockedResponse = {"trivia_categories":[{"id":9,"name":"General Knowledge"},{"id":10,"name":"Entertainment: Books"},{"id":11,"name":"Entertainment: Film"},{"id":12,"name":"Entertainment: Music"},{"id":13,"name":"Entertainment: Musicals & Theatres"},{"id":14,"name":"Entertainment: Television"},{"id":15,"name":"Entertainment: Video Games"},{"id":16,"name":"Entertainment: Board Games"},{"id":17,"name":"Science & Nature"},{"id":18,"name":"Science: Computers"},{"id":19,"name":"Science: Mathematics"},{"id":20,"name":"Mythology"},{"id":21,"name":"Sports"},{"id":22,"name":"Geography"},{"id":23,"name":"History"},{"id":24,"name":"Politics"},{"id":25,"name":"Art"},{"id":26,"name":"Celebrities"},{"id":27,"name":"Animals"},{"id":28,"name":"Vehicles"},{"id":29,"name":"Entertainment: Comics"},{"id":30,"name":"Science: Gadgets"},{"id":31,"name":"Entertainment: Japanese Anime & Manga"},{"id":32,"name":"Entertainment: Cartoon & Animations"}]};

        fetch.mockResolvedValue(createFetchResponse(mockedResponse, false))

        const data = await getCategories();

        expect(fetch).toHaveBeenCalledWith('https://opentdb.com/api_category.php');

        expect(data).toStrictEqual(null);
    });

    it('should get session token', async () => {
        const mockedResponse = {response_code: 0, token: '999e23521156c244fb039412fa7ab8b24dba4ff49f04af80e3585baeb648fe84' };

        fetch.mockResolvedValue(createFetchResponse(mockedResponse, true))

        const data = await getSessionToken();

        expect(fetch).toHaveBeenCalledWith('https://opentdb.com/api_token.php?command=request');

        expect(data).toStrictEqual(mockedResponse.token);
    });

    it('should not get session token when response is not okay', async () => {
        const mockedResponse = {response_code: 0, token: '999e23521156c244fb039412fa7ab8b24dba4ff49f04af80e3585baeb648fe84' };

        fetch.mockResolvedValue(createFetchResponse(mockedResponse, false))

        const data = await getSessionToken();

        expect(fetch).toHaveBeenCalledWith('https://opentdb.com/api_token.php?command=request');

        expect(data).toStrictEqual(null);
    });

    it('should not get session token when response_code !== 0', async () => {
        const mockedResponse = {response_code: 1, token: '999e23521156c244fb039412fa7ab8b24dba4ff49f04af80e3585baeb648fe84' };

        fetch.mockResolvedValue(createFetchResponse(mockedResponse, true))

        const data = await getSessionToken();

        expect(fetch).toHaveBeenCalledWith('https://opentdb.com/api_token.php?command=request');

        expect(data).toStrictEqual(null);
    });

    it('should get questions', async () => {
        const mockedResponse = {"response_code":0,"results":[{"type":"multiple","difficulty":"medium","category":"General Knowledge","question":"Who invented Pastafarianism?","correct_answer":"Bobby Henderson","incorrect_answers":["Eric Tignor","Bill Nye","Zach Soldi"]},{"type":"multiple","difficulty":"medium","category":"General Knowledge","question":"In the Morse code, which letter is indicated by 3 dots? ","correct_answer":"S","incorrect_answers":["O","A","C"]},{"type":"multiple","difficulty":"medium","category":"General Knowledge","question":"Which of these is the name of a Japanese system of alternative medicine, literally meaning &quot;finger pressure&quot;?","correct_answer":"Shiatsu","incorrect_answers":["Ukiyo","Majime","Ikigai"]},{"type":"multiple","difficulty":"medium","category":"General Knowledge","question":"Apple co-founder Steve Jobs died from complications of which form of cancer?","correct_answer":"Pancreatic","incorrect_answers":["Bone","Liver","Stomach"]},{"type":"multiple","difficulty":"medium","category":"General Knowledge","question":"Which logical fallacy means to attack the character of your opponent rather than their arguments?","correct_answer":"Ad hominem","incorrect_answers":["Post hoc ergo propter hoc","Tu quoque","Argumentum ad populum"]},{"type":"boolean","difficulty":"medium","category":"General Knowledge","question":"The term &quot;Spam&quot; came before the food product &quot;Spam&quot;.","correct_answer":"False","incorrect_answers":["True"]},{"type":"multiple","difficulty":"medium","category":"General Knowledge","question":"What is the romanized Japanese word for &quot;university&quot;?","correct_answer":"Daigaku","incorrect_answers":["Toshokan","Jimusho","Shokudou"]},{"type":"multiple","difficulty":"medium","category":"General Knowledge","question":"What year was Apple Inc. founded?","correct_answer":"1976","incorrect_answers":["1978","1980","1974"]},{"type":"multiple","difficulty":"medium","category":"General Knowledge","question":"After how many years would you celebrate your crystal anniversary?","correct_answer":"15","incorrect_answers":["20","10","25"]},{"type":"multiple","difficulty":"medium","category":"General Knowledge","question":"Which of these companies does NOT manufacture automobiles?","correct_answer":"Ducati","incorrect_answers":["Nissan","GMC","Fiat"]}]};

        fetch.mockResolvedValue(createFetchResponse(mockedResponse, true))

        const data = await getQuestions({ value: 9 }, { value: 'medium'}, { value: '999e23521156c244fb039412fa7ab8b24dba4ff49f04af80e3585baeb648fe84' });

        expect(fetch).toHaveBeenCalledWith('https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&token=999e23521156c244fb039412fa7ab8b24dba4ff49f04af80e3585baeb648fe84');

        expect(data).toStrictEqual(mockedResponse.results);
    });

    it('should not get questions when response is not okay', async () => {
        const mockedResponse = {"response_code":0,"results":[{"type":"multiple","difficulty":"medium","category":"General Knowledge","question":"Who invented Pastafarianism?","correct_answer":"Bobby Henderson","incorrect_answers":["Eric Tignor","Bill Nye","Zach Soldi"]},{"type":"multiple","difficulty":"medium","category":"General Knowledge","question":"In the Morse code, which letter is indicated by 3 dots? ","correct_answer":"S","incorrect_answers":["O","A","C"]},{"type":"multiple","difficulty":"medium","category":"General Knowledge","question":"Which of these is the name of a Japanese system of alternative medicine, literally meaning &quot;finger pressure&quot;?","correct_answer":"Shiatsu","incorrect_answers":["Ukiyo","Majime","Ikigai"]},{"type":"multiple","difficulty":"medium","category":"General Knowledge","question":"Apple co-founder Steve Jobs died from complications of which form of cancer?","correct_answer":"Pancreatic","incorrect_answers":["Bone","Liver","Stomach"]},{"type":"multiple","difficulty":"medium","category":"General Knowledge","question":"Which logical fallacy means to attack the character of your opponent rather than their arguments?","correct_answer":"Ad hominem","incorrect_answers":["Post hoc ergo propter hoc","Tu quoque","Argumentum ad populum"]},{"type":"boolean","difficulty":"medium","category":"General Knowledge","question":"The term &quot;Spam&quot; came before the food product &quot;Spam&quot;.","correct_answer":"False","incorrect_answers":["True"]},{"type":"multiple","difficulty":"medium","category":"General Knowledge","question":"What is the romanized Japanese word for &quot;university&quot;?","correct_answer":"Daigaku","incorrect_answers":["Toshokan","Jimusho","Shokudou"]},{"type":"multiple","difficulty":"medium","category":"General Knowledge","question":"What year was Apple Inc. founded?","correct_answer":"1976","incorrect_answers":["1978","1980","1974"]},{"type":"multiple","difficulty":"medium","category":"General Knowledge","question":"After how many years would you celebrate your crystal anniversary?","correct_answer":"15","incorrect_answers":["20","10","25"]},{"type":"multiple","difficulty":"medium","category":"General Knowledge","question":"Which of these companies does NOT manufacture automobiles?","correct_answer":"Ducati","incorrect_answers":["Nissan","GMC","Fiat"]}]};

        fetch.mockResolvedValue(createFetchResponse(mockedResponse, false))

        const data = await getQuestions({ value: 9 }, { value: 'medium'}, { value: '999e23521156c244fb039412fa7ab8b24dba4ff49f04af80e3585baeb648fe84' });

        expect(fetch).toHaveBeenCalledWith('https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&token=999e23521156c244fb039412fa7ab8b24dba4ff49f04af80e3585baeb648fe84');

        expect(data).toStrictEqual(null);
    });
});
