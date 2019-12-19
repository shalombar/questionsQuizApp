import * as actions from '../actions/general.act';
import * as actions_noc from '../actions/Products/noc/noc.act';
// import * as Functions from '../common/functions/functions';
import { getToken, print_log, server_endpoint, kill_timeout, set_timeout } from '../common/functions/functions'
const axios = require('axios');
// import SERVER_ENDPOINT from '../../build/lorex';

export default store => next => action => {
    if (action.type === 'API') {
        // const SERVER_ENDPOINT = "https://lorexapi-stage.smartgreen.co.il/";
        // const SERVER_ENDPOINT = "https://lorexapi.smartgreen.co.il/";
        const SERVER_ENDPOINT = server_endpoint();
        let { type, method, newDatas, path, data, callback, additional, errorCallbak, isMock } = action.payload;
        let urlApi = isMock ? path : (SERVER_ENDPOINT + path);
        const logOut = () => {
            localStorage.clear();
            store.dispatch(actions.logout());
        }
        const returnData = (resData) => {
            if (!!callback) {
                callback(resData);
            }
            if (type !== "None") {
                store.dispatch(actions.api(type, resData))
            }
        }
        const succeedApiResFunc = (res) => {
            print_log('api response - ', res)


            if (res.status == '200') {
                let resData = res.data;

                if (resData && resData.results) {
                    resData = resData.results
                }

                if (resData != 'failure') {
                    returnData(resData)
                }
                else {
                    print_log('second change for api', res)

                    api[method]()
                        .then((res) => {
                            if (res.status == '200') {
                                let resData = res.data;

                                if (resData && resData.results) {
                                    resData = resData.results
                                }

                                returnData(resData)
                            }

                        })
                        .catch((err) => {
                            print_log('api error,', err)
                        })
                }
            }
        }
        const refreshApi = () => {
            if (localStorage.getItem('refresh_token')) {
                print_log('refresh token sending...')
                axios(
                    {
                        method: 'post',
                        url: SERVER_ENDPOINT + 'jwt/refresh',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'JWT ' + localStorage.getItem('refresh_token')
                        },
                        data: { refresh: localStorage.getItem('refresh_token') }
                    }
                )
                    .then(r => {
                        print_log('refresh_response', r)

                        localStorage.setItem("user_token", r.data.access)
                        api[method]()
                    })
                    .catch(err => {
                        print_log('refresh_response_error', err)

                        if (errorCallbak) {
                            errorCallbak();
                        }
                        logOut()
                    })
            }
            else {
                logOut()
            }
        }
        const errorHandling = (err) => {
            print_log('api error', err.response)

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
                axios({
                    method: 'get',
                    url: urlApi,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'JWT ' + localStorage.getItem('user_token')
                    },
                    params: data
                })
                    .then((res) => {
                        succeedApiResFunc(res)
                    })
                    .catch((err) => {
                        if (err && err.response && err.response.data && err.response.data.code && err.response.data.code === 'token_not_valid') {
                            refreshApi()
                        }
                        else {
                            errorHandling(err)
                        }
                    })
            },
            'post': () => {
                axios({
                    method: 'post',
                    url: urlApi,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'JWT ' + getToken()
                    },
                    data: data
                })
                    .then((res) => {
                        succeedApiResFunc(res)
                    })
                    .catch((err) => {
                        if (err && err.response && err.response.data && err.response.data.code && err.response.data.code === 'token_not_valid') {
                            refreshApi()
                        }
                        else {
                            errorHandling(err)
                        }
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
    if (action.type == 'API_DEMO') {
        let { type, data, callback } = action.payload;

        if (callback) {
            callback(data);
        }
        store.dispatch(actions_noc.api_demo(type, data))


    }
    return next(action)
}