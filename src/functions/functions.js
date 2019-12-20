
import React from 'react';

export const loading = () => <div className="animated fadeIn pt-3 text-center"><div className="sk-spinner sk-spinner-pulse"></div></div>;

export const checkApiFailed = (res) => {
    if (res && res.errorMsg) {
        return true
    }

    return false
}