import Vue from 'vue';
import VueI18n from 'vue-i18n';
import en from './en.js'
import zh from './zh.js'
import zhs from './zhs.js'
Vue.use(VueI18n);
const messages = {
	en: {
		...en
	},
	zh: {
		...zh
	},
	zhs: {
		...zhs
	}
}
const i18n = new VueI18n({
	locale: uni.getStorageSync('lang') || 'en',
	messages,
});

export default i18n;