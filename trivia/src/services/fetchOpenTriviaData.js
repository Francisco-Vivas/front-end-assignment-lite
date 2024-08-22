const API_STATUS = {
    OK: 0,
};
const BASE_URL = 'https://opentdb.com';

async function getCategories() {
    try {
        const response = await fetch(`${BASE_URL}/api_category.php`);

        if (!response.ok) {
            return null;
        }

        const data = await response.json();

        return data.trivia_categories;
    } catch (error) {
        // console.log('getCategories –', error.message);
    }
}

async function getQuestions(category, difficulty, sessionToken) {
    try {
        const response = await fetch(`${BASE_URL}/api.php?amount=10&category=${category.value}&difficulty=${difficulty.value.toLowerCase()}${sessionToken.value ? `&token=${sessionToken.value}` : ''}`);

        if (!response.ok) {
            return null;
        }

        const data = await response.json();

        return data.results;
    } catch (error) {
        // console.log('getQuestions –', error.message);
    }
}

async function getSessionToken() {
    try {
        const response = await fetch(`${BASE_URL}/api_token.php?command=request`);

        if (!response.ok) {
            return null;
        }

        const data = await response.json();

        if (data.response_code !== API_STATUS.OK) {
            return null;
        }

        return data.token;
    } catch (error) {
        // console.log('fetching sessionToken –', error.message);
    }
}

export {
    getCategories,
    getQuestions,
    getSessionToken,
};
