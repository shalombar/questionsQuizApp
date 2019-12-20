export const get_questions = (callback) => {
    return {
        type: 'API',
        payload: { type: 'None', method: 'get', path: 'questions.json', callback }
    }
}

export const get_answers = (callback) => {
    return {
        type: 'API',
        payload: { type: 'None', method: 'get', path: 'answers.json', callback }
    }
}

export const setAnswers = (data) => {
    return {
        type: 'SET_ANSWERS',
        payload: data
    }
}

export const setQuestions = (data) => {
    return {
        type: 'SET_QUESTIONS',
        payload: data
    }
}

export const setCurrentQuestionIndex = (data) => {
    return {
        type: 'SET_CURRENT_QUESTION_INDEX',
        payload: data
    }
}

export const finish = (data) => {
    return {
        type: 'FINISH',
    }
}

export const api = (type, payload, additional) => {
    return {
        type: type,
        payload: payload,
        additional: additional
    }
}