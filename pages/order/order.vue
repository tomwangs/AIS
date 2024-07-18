<template>
	<view class="container">
		<Menu></Menu>
		<view class="main">
			<view class="tops">
				<image src="../../static/back.png" class="back" @click="back"></image>
				<view class="title">
					{{$t('order.txt1')}}
				</view>
				<view class="null">

				</view>
			</view>
			<view class="box">
				<view class="tabs">
					<view :class="active === index?'tabed':'tab'" v-for="(item,index) in tabs" :key="index"
						@click="changeTab(index)">
						{{item.val}}
					</view>
				</view>
				<view class="team wow fadeInDown" v-if="active === 0">
					<view class="th">
						<view class="td">
							{{$t('order.txt2')}}
						</view>
						<view class="td">
							{{$t('order.txt3')}}
						</view>
						<view class="td">
							{{$t('node.txt21')}}
						</view>
					</view>
					<view class="tbody" v-if="nodeList.length > 0">
						<view class="tr" v-for="(item,index) in nodeList" :key="index">
							<view class="td">
								<span v-if="item.type === 1">{{$t('node.txt2')}}</span>
								<span v-if="item.type === 2">{{$t('node.txt6')}}</span>
								<span v-if="item.type === 3">{{$t('node.txt7')}}</span>
							</view>
							<view class="td">
								<span v-if="item.type === 1">100</span>
								<span v-if="item.type === 2">500</span>
								<span v-if="item.type === 3">3000</span>
							</view>
							<view class="td">
								{{item.createdAtFormatted}}
							</view>
						</view>
					</view>
					<view class="nones" v-else>
						{{$t('common.txt29')}}
					</view>
				</view>
				<view class="team wow fadeInDown" v-if="active === 1">
					<view class="th">
						<view class="td">
							{{$t('order.txt4')}}
						</view>
						<view class="td">
							{{$t('order.txt3')}}
						</view>
						<view class="td">
							{{$t('node.txt21')}}
						</view>
					</view>
					<view class="tbody" v-if="macList.length > 0">
						<view class="tr" v-for="(item,index) in macList" :key="index">
							<view class="td">
								<span v-if="item.type === 1">H {{$t('order.txt9')}}</span>
								<span v-if="item.type === 2">M {{$t('order.txt9')}}</span>
								<span v-if="item.type === 3">T {{$t('order.txt9')}}</span>
							</view>
							<view class="td">
								{{item.share | cutOutNums}}
							</view>
							<view class="td">
								{{item.createdAtFormatted}}
							</view>
						</view>
					</view>
					<view class="nones" v-else>
						{{$t('common.txt29')}}
					</view>
				</view>
				<view class="team wow fadeInDown" v-if="active === 2">
					<view class="th">
						<view class="td1">
							{{$t('node.txt21')}}
						</view>
						<view class="tds">
							{{$t('order.txt5')}}
						</view>
						<view class="tds">
							{{$t('order.txt3')}}
						</view>
						<view class="tds">
							{{$t('order.txt6')}}
						</view>
					</view>
					<view class="tbody" v-if="zyList.length > 0">
						<view class="tr" v-for="(item,index) in teamList" :key="index">
							<view class="td1">
								{{item.createdAtFormatted}}
							</view>
							<view class="tds">
								H{{$t('order.txt9')}}
							</view>
							<view class="tds">
								0.00
							</view>
							<view class="tds y">
								{{$t('order.txt7')}}
							</view>
						</view>
					</view>
					<view class="nones" v-else>
						{{$t('common.txt29')}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		ethers
	} from 'ethers';
	import {
		cutOutNum
	} from '@/plugins/decimals';
	import 'wowjs/css/libs/animate.css';
	import WOW from 'wowjs';
	import Menu from '@/components/menu/menu.vue';
	export default {
		components: {
			Menu
		},
		data() {
			return {
				nodeList: [],
				macList: [],
				zyList: [],
				active: 0,
				tabs: [{
						id: 0,
						val: this.$t("order.txt2")
					},
					{
						id: 1,
						val: this.$t("order.txt4")
					},
					{
						id: 2,
						val: this.$t("order.txt10")
					}
				]
			}
		},
		filters: {
			addrFilter(value) {
				if (value) {
					const start = value.slice(0, 4);
					const end = value.slice(-6);
					return `${start}***${end}`;
				}
			},
			cutOutNums(num) {
				if (num) {
					return cutOutNum(num, 2)
				} else {
					return '0.00'
				}
			}
		},
		mounted() {
			const wow = new WOW.WOW();
			wow.init();
		},
		watch: {
			'$store.state.token': function(newData) {
				if (newData) {
					this.getNodeList();
					this.getZyList()
				} else {
					this.nodeList = [];
					this.macList = [];
					this.zyList = [];
					uni.showToast({
						title: this.$t('common.txt22'),
						icon: 'error'
					})
				}
			},
			'$i18n.locale'() {
				this.getTabs();
			}
		},
		created() {
			const token = this.$store.state.token;
			if (token) {
				this.getNodeList();
				this.getZyList()
			} else {
				uni.showToast({
					title: this.$t('common.txt22'),
					icon: 'error'
				})
			}
		},
		methods: {
			getTabs() {
				this.tabs = [{
						id: 0,
						val: this.$t("order.txt2")
					},
					{
						id: 1,
						val: this.$t("order.txt4")
					},
					{
						id: 2,
						val: this.$t("order.txt10")
					}
				]
			},
			changeTab(index) {
				this.active = index;
				if (index === 0) {
					this.getNodeList()
				} else if (index === 1) {
					this.getMacList()
				} else if (index === 2) {
					this.getZyList()
				}
			},
			async getNodeList() {
				const accounts = await window.ethereum.request({
					method: 'eth_requestAccounts'
				})
				const data = {
					address: accounts[0],
					page: 1,
					pageSize: 100
				}
				this.$apiFun.getNodeInfo(data).then(res => {
					if (res.code == 200) {
						this.nodeList = res.data;
					}
				});
			},
			async getMacList() {
				const accounts = await window.ethereum.request({
					method: 'eth_requestAccounts'
				})
				const data = {
					address: accounts[0],
					page: 1,
					pageSize: 100
				}
				this.$apiFun.getMachineInfo(data).then(res => {
					if (res.code == 200) {
						this.macList = res.data;
					}
				});
			},
			async getZyList() {

			},
			back() {
				let canNavBack = getCurrentPages();
				if (canNavBack && canNavBack.length > 1) {
					uni.navigateBack()
				} else {
					history.back();
				}
			}
		}
	}
</script>

<style scoped>
	.main {
		padding-top: 120rpx;
	}

	.tops {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: rgba(60, 60, 60, 0.7);
		padding: 30rpx;
	}

	.back {
		width: 36rpx;
		height: 26rpx;
	}

	.title {
		color: #fff;
		font-family: 'Bold';
		font-size: 32rpx;
	}

	.null {
		width: 70rpx;
	}

	.box {
		padding: 40rpx 30rpx;
	}

	.tabs {
		display: flex;
		align-items: center;
		color: #fff;
		border-radius: 10rpx;
		overflow: hidden;
		border: 1rpx solid #EEA32C;
		font-size: 32rpx;
		font-weight: bold;
	}

	.tabed {
		background-color: #EEA32C;
		width: 33.3%;
		text-align: center;
		padding: 26rpx 0;
	}

	.tab {
		width: 33.3%;
		text-align: center;
		padding: 26rpx 0;
		border-right: 1rpx solid #EEA32C;
	}

	.tab:last-child {
		border-right: unset;
	}

	.team {
		padding-bottom: 100rpx;
	}

	.th {
		display: flex;
		align-items: center;
		color: #fff;
		margin-top: 30rpx;
		background: rgba(60, 60, 60, 0.7);
		padding: 26rpx 0;
	}

	.tbody {
		padding: 20rpx 0;
		min-height: 300rpx;
	}

	.tr {
		display: flex;
		align-items: center;
		color: #fff;
		padding: 24rpx 0;
		border-bottom: 1rpx solid #1d1d1d;
	}

	.tr:last-child {
		border-bottom: unset;
	}

	.td1 {
		width: 30%;
		text-align: center;
	}

	.td {
		width: 33.3%;
		text-align: center;
	}

	.tds {
		width: 20%;
		text-align: center;
	}

	.tda {
		width: 50%;
		text-align: center;
	}

	.y {
		color: #EEA32C;
	}
</style>