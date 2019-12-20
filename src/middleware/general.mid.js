import * as actions from '../actions/general.act';
const axios = require('axios');
// import file from '../../mock'

export default store => next => action => {
    if (action.type === 'API') {
        const SERVER_ENDPOINT = "http://localhost:3000/";
        let { type, method, newDatas, path, data, callback, additional, errorCallbak, isMock } = action.payload;
        let urlApi = (SERVER_ENDPOINT + path);

        const returnData = (resData) => {
            if (!!callback) {
                callback(resData);
            }
            if (type !== "None") {
                store.dispatch(actions.api(type, resData))
            }
        }
        const succeedApiResFunc = (res) => {
            returnData(res)
        }

        const errorHandling = (err) => {
            let errorMsgArr;

            if (err && err.response && err.response.data) {
                errorMsgArr = err.response.data;
            }
            else {
                errorMsgArr = err.toString().split(' ');
            }
            let errorCode = err.toString().split(' ')[err.toString().split(' ').length - 1];
            let errorObj = { errorCode: errorCode, errorMsg: errorMsgArr }
            if (!!callback) {
                callback(errorObj)
            }
        }
        let api = {
            'get': () => {
                axios.get(urlApi)
                    .then((res) => {
                        succeedApiResFunc(res)
                    })
                    .catch((err) => {
                        errorHandling(err)
                    })
            },
            'post': () => {
                axios({
                    method: 'post',
                    url: urlApi,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'JWT '
                    },
                    data: data
                })
                    .then((res) => {
                        succeedApiResFunc(res)
                    })
                    .catch((err) => {
                        errorHandling(err)
                    })
            },
            'put': () => {
                if (type !== "None")
                    store.dispatch(actions.api(type, newDatas))

            },
            'delete': () => {
                if (type !== "None")
                    store.dispatch(actions.api(type, data))

            }
        }

        api[method]();
    }
    return next(action)
}