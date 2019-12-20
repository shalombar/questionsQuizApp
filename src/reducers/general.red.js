export default (state = {}, action) => {
    state = {
        answers: {},
        questions: [],
        current_question_index: 0,
        isFinisedTest: false,
        ...state
    }
    switch (action.type) {
        case 'SET_ANSWERS':
            return {
                ...state,
                answers: { ...action.payload }
            }

        case 'SET_QUESTIONS':
            return {
                ...state,
                questions: [...action.payload]
            }

        case 'SET_CURRENT_QUESTION_INDEX':
            return {
                ...state,
                current_question_index: action.payload
            }

        case 'FINISH':
            return {
                ...state,
                isFinisedTest: true
            }

        default:
            return state
    }
}