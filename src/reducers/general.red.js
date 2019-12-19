export default (state = {}, action) => {
    state = {
        ...state
    }
    switch (action.type) {
        case 'LOGIN':
            let data = action.payload;

            return {
                ...state,
                user: data
            }

        case 'SET_FLAG_API':
            return {
                ...state,
                flag_api: JSON.parse(JSON.stringify(action.payload))
            }

        default:
            return state
    }
}