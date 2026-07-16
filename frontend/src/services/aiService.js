import api from "./api";

const getToken = () => {
    return localStorage.getItem("token");
};

// Generate Summary
export const generateSummary = async (noteId) => {

    const response = await api.post(
        `/ai/summarize/${noteId}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    );

    return response.data;
};

export const generateQuiz = async (noteId) => {

    const response = await api.post(
        `/ai/quiz/${noteId}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    );

    return response.data;
};

// Generate Flashcards
export const generateFlashcards = async (noteId) => {

    const response = await api.post(
        `/ai/flashcards/${noteId}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    );

    return response.data;
};