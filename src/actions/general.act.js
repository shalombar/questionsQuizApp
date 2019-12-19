export const getRulesList = () => {
    return {
        type: 'GET_RULE_LIST',
        payload: data
    }
}



export const login = (data, callback) => {
    return {
        type: 'API',
        payload: { type: 'LOGIN', data, method: 'post', path: 'jwt/create', callback }
    }
}

export const logout = (callback) => {
    return {
        type: 'LOGOUT',
    }
}

export const reset = (data, callback) => {
    return {
        type: 'API',
        payload: { type: 'RESET', data, method: 'post', path: 'api/renew_password', callback }
    }
}


export const api = (type, payload, additional) => {
    return {
        type: type,
        payload: payload,
        additional: additional
    }
}