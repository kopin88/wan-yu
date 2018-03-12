import axios from 'axios'
import Auth from '../store/auth'

export const apiDomain = 'http://wanyumm.com/api'
export const imgUrl = 'http://wanyumm.com/images/'
// export const apiDomain = 'http://box.dev/api'
// export const imgUrl = 'http://box.dev/images/'


export function get(url) {
    return axios({
    	method: 'GET',
    	url: url,
    	headers: {
    		'Authorization': `Bearer ${Auth.state.api_token}`
    	}
    })
}

export function post(url, payload) {
    return axios({
    	method: 'POST',
    	url: url,
    	data: payload,
    	headers: {
    		'Authorization': `Bearer ${Auth.state.api_token}`
    	}
    })
}
// delete is reserved keyword
export function del(url) {
    return axios({
        method: 'DELETE',
        url: url,
        headers: {
            'Authorization': `Bearer ${Auth.state.api_token}`
        }
    })
}

export function interceptors(cb) {
    axios.interceptors.response.use((res) => {
        return res;
    }, (err) => {
        cb(err)
        return Promise.reject(err)
    })
}
