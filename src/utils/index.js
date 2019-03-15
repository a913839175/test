import axios from 'axios';
import qs from 'qs';
import Vue from 'vue';
import storage from '@/utils/storage';
import store from '@/store';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true;
// http request 拦截器
axios.interceptors.request.use(function (config) {
    var token = sessionStorage.getItem('token') ? sessionStorage.getItem('token'): '';
    var user = sessionStorage.getItem('user') ?sessionStorage.getItem('user'): '';
    config.headers.Authorization = token;
    config.headers.username = user;
    return config;
}, function (error) {
    // console.log("======----" + error)
    return Promise.reject(error);
});
// http response 拦截器
axios.interceptors.response.use(function (response) {
    //console.log(response)
    if (response.data.code == '1000') { //具体的判断token失效的参数
        storage.removeItem("token", '{}')
        storage.removeItem("user", '{}')
        window.location.href = '/#/login' //需求方要求一旦出错立即跳转登录，所以采取这种侵入式的手段。
    } else {
        return response
    }
}, function (error) {
    //console.log(error)
    if (error.message.includes('timeout')) {
        Vue.prototype.$message.error('请求超时');
        reject(err) // reject这个错误信息
    } else if (error.message.includes('proxy')) {
        storage.removeItem("token")
        storage.removeItem("user")
        window.location.href = '/#/login'
        reject(err)
    } else {
        Vue.prototype.$message.error('请求超时');
        reject(err) // reject这个错误信息
    }
});


axios.defaults.timeout = 25000;
axios.defaults.baseURL = '';

/**
 * GET请求
 * @param  {[type]} url     url地址
 * @param  {[type]} params  data参数
 * @return {[type]}         [Promise]
 */
var self = this;
export const getData = (url, params) => {
    
    return new Promise((resolve, reject) => {
        // axios.get(url, {
        //         params: params
        //     })
        // params.Authorization=Vue.prototype.$store.getters.Authorization
        axios({
                url: url,
                params: params,
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                method: 'get',
                withCredentials: true
            })
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                console.log("get请求failed")
                reject(err)
            })
    })
}
/**
 * POST请求
 * @param  {[type]} url     url地址
 * @param  {[type]} params  data参数
 * @return {[type]}         [Promise]
 */
export const postJSON = (url, params) => {
    return new Promise((resolve, reject) => {
        // params.Authorization=Vue.prototype.$store.getters.Authorization
        axios({
                method: 'post',
                url: url,
                data: JSON.stringify(params),
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(res => {
                resolve(res)
            })
            .catch(err => {
                // if(res.message.includes('timeout')){   // 判断请求异常信息中是否含有超时timeout字符串
                //     Vue.prototype.$message.error('请求错误');
                //     reject(err)          // reject这个错误信息
                //   }
                reject(err)
            })
    })
}
export const postFile = (url, params) => {
    return new Promise((resolve, reject) => {
        // params.Authorization=Vue.prototype.$store.getters.Authorization
        axios({
                method: 'post',
                url: url,
                data: params,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
                resolve(res)
            })
            .catch(err => {
                // if(res.message.includes('timeout')){   // 判断请求异常信息中是否含有超时timeout字符串
                //     Vue.prototype.$message.error('请求错误');
                //     reject(err)          // reject这个错误信息
                //   }
                reject(err)
            })
    })
}
/**
 * POST请求
 * @param  {[type]} url     url地址
 * @param  {[type]} params  data参数
 * @return {[type]}         [Promise]
 */
export const postData = (url, params) => {
    return new Promise(function (resolve, reject) {
        // params.Authorization=Vue.prototype.$store.getters.Authorization
        axios.post(url, qs.stringify(params))
            .then(function (res) {
                resolve(res.data);
            })
            .catch(function (res) {
                // if(res.message.includes('timeout')){   // 判断请求异常信息中是否含有超时timeout字符串
                //     Vue.prototype.$message.error('请求错误');
                //     reject(err)          // reject这个错误信息
                //   }
                console.log("post请求failed");
                reject(res);
            });
    });
};

export const fileDownload = (url, params) => {
    return new Promise((resolve, reject) => {
        // params.Authorization=Vue.prototype.$store.getters.Authorization
        axios.get(url, {
            params: params
        }, {
            responseType: 'blob'
        }).then(res => {
            let url = window.URL.createObjectURL(new Blob([res]))
            let link = document.createElement('a')
            link.style.display = 'none'
            link.href = url
            link.setAttribute('download', url)
            document.body.appendChild(link)
            link.click()
        }).catch(err => {
            // if(res.message.includes('timeout')){   // 判断请求异常信息中是否含有超时timeout字符串
            //     Vue.prototype.$message.error('请求错误');
            //     reject(err)          // reject这个错误信息
            //   }
            reject(err)
        })
    })
};

export function formatDate(time, fmt) {
    if (arguments.length === 0) {
        return null
    }
    let date
    if (typeof time === 'object') {
        date = time
    } else {
        if (('' + time).length === 10) time = parseInt(time) * 1000
        date = new Date(time)
    }
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }

    function padLeftZero(str) {
        return ('00' + str).substr(str.length);
    }
    return fmt;
};
