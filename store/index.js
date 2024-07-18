import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		token: '',
		exchange: ''
	},
	getters: {
		getToken: state => {
			return state.token;
		},
		getExchange: state => {
			return state.exchange;
		}
	},
	mutations: {
		setToken(state, data) {
			state.token = data
		},
		cleanToken(state, data) {
			state.token = data
		},
		setExchange(state, data) {
			state.exchange = data
		},
		cleanExchange(state, data) {
			state.exchange = data
		},
	},
	actions: {
		async disConnect(context) {
			context.commit('token', "");
			uni.clearStorageSync()
		}
	},
	modules: {

	},
	plugins: [createPersistedState()]
})