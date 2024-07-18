//引入刚才的http.js文件
import https from './http.js';

let apiFun = {};

//直推
apiFun.getDirectInfo = function(params) {
	return https.get('/direct', params)
}

//节点购买记录
apiFun.getNodeInfo = function(params) {
	return https.get('/node', params)
}

//矿机购买记录
apiFun.getMachineInfo = function(params) {
	return https.get('/mining', params)
}

//算力记录
apiFun.getPowerInfo = function(params) {
	return https.get('/share', params)
}

//会员总数
apiFun.getMemberAcounts = function(params) {
	return https.get('/sumMember', params)
}

//挂单大厅
apiFun.getAllPendingOrders = function(params) {
	return https.get('/allOrder', params)
}

//个人挂单
apiFun.getMyPendingOrders = function(params) {
	return https.get('/order', params)
}

//获取沉淀算力
apiFun.getMyHeapPowers = function(params) {
	return https.get('/inactivated', params)
}

//签名交易
apiFun.getMySigns = function(params) {
	return https.get('/getSign', params)
}

//首页数据
apiFun.getDashboardDatas = function(params) {
	return https.get('/sumInfo', params)
}

export default apiFun;