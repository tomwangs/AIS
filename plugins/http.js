import axios from 'axios'
let baseURL = 'https://jk.aiscm.cc/api/v1'

let config = {
	baseURL: baseURL,
	timeout: 30000, //设置最大请求时间,
}
const _axios = axios.create(config);

/* 请求拦截器（请求之前的操作） */
_axios.interceptors.request.use(
	config => {
		uni.showLoading({
			mask: true,
		});
		return config;
	},
	err => Promise.reject(err)
);

/* 请求之后的操作 */
_axios.interceptors.response.use(
	res => {
		uni.hideLoading();
		if (res.data.code === 401) {
			uni.showToast({
				title: 'Please connect wallet!',
				icon: 'none'
			})
		}
		if (res.data.code === 501) {
			uni.showToast({
				title: 'Network Rrror!',
				icon: 'none'
			})
		}
		if (res.data.code === 404) {
			uni.showToast({
				title: 'Not Find!',
				icon: 'none'
			})
		}
		if (res.data.code === 403) {
			uni.showToast({
				title: 'Please connect wallet!',
				icon: 'none'
			})
		}
		return res;
	},
	err => {
		if (err) {
			uni.hideLoading();
			uni.showToast({
				title: 'Request network failure!',
				icon: 'none'
			})
		}
		return Promise.reject(err);
	}
);

//封装post,get方法
const http = {
	get(url = '', params = {}) {
		return new Promise((resolve, reject) => {
			_axios({
				url,
				params,
				headers: {
					'Content-Type': 'application/json;charset=UTF-8'
				},
				method: 'GET'
			}).then(res => {
				resolve(res.data)
				return res
			}).catch(error => {
				reject(error)
			})
		})
	},
	post(url = '', params = {}) {
		return new Promise((resolve, reject) => {
			_axios({
				url,
				data: params,
				headers: {
					'Content-Type': 'application/json;charset=UTF-8'
				},
				method: 'POST'
			}).then(res => {
				resolve(res.data)
				return res
			}).catch(error => {
				reject(error)
			})
		})
	}
}


export default http