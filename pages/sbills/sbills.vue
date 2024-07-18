<template>
	<view class="container">
		<Menu></Menu>
		<view class="main">
			<view class="tops">
				<image src="../../static/back.png" class="back" @click="back"></image>
				<view class="title">
					{{$t('oth.txt1')}}
				</view>
				<view class="null">

				</view>
			</view>
			<view class="card wow fadeInDown">
				<view class="tabs">
					<view :class="active === index?'tabed':'tab'" v-for="(item,index) in tabs" :key="index"
						@click="changeTab(index)">
						<span class="name">
							{{item.val}}
						</span>
					</view>
				</view>
				<view class="lists" v-if="active === 0">
					<view class="list">
						<view class="ones">
							<view class="one">
								{{$t('oth.txt5')}}: 0.00 USDT
							</view>
							<view class="one">
								{{$t('oth.txt6')}}: 0.00
							</view>
						</view>
						<view class="ones">
							<view class="one">
								{{$t('oth.txt7')}}: --
							</view>
							<view class="status">
								{{$t('oth.txt3')}}
							</view>
						</view>
					</view>
				</view>
				<view class="lists" v-if="active === 1">
					<view class="list">
						<view class="ones">
							<view class="one">
								{{$t('oth.txt5')}}: 0.00 USDT
							</view>
							<view class="one">
								{{$t('oth.txt6')}}: 0.00
							</view>
						</view>
						<view class="ones">
							<view class="one">
								{{$t('oth.txt7')}}: --
							</view>
							<view class="status">
								{{$t('oth.txt3')}}
							</view>
						</view>
					</view>
				</view>
				<view class="lists" v-if="active === 2">
					<view class="list">
						<view class="ones">
							<view class="one">
								{{$t('oth.txt5')}}: 0.00 USDT
							</view>
							<view class="one">
								{{$t('oth.txt6')}}: 0.00
							</view>
						</view>
						<view class="ones">
							<view class="one">
								{{$t('oth.txt7')}}: --
							</view>
							<view class="status">
								{{$t('oth.txt3')}}
							</view>
						</view>
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
				active: 0,
				tabs: [{
						id: 0,
						val: this.$t('oth.txt2')
					},
					{
						id: 1,
						val: this.$t('oth.txt3')
					},
					{
						id: 2,
						val: this.$t('oth.txt4')
					}
				],
				list: ''
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
					this.getOrderList(1);
				} else {
					this.teamList = [];
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
				this.getOrderList(1);
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
						val: this.$t('oth.txt2')
					},
					{
						id: 1,
						val: this.$t('oth.txt3')
					},
					{
						id: 2,
						val: this.$t('oth.txt4')
					}
				]
			},
			changeTab(index) {
				this.active = index;
				if (index === 0) {
					this.getOrderList(1)
				} else if (index === 1) {
					this.getOrderList(1)
				} else {
					this.getOrderList(2)
				}
			},
			async getOrderList(type) {
				const accounts = await window.ethereum.request({
					method: 'eth_requestAccounts'
				})
				const address = accounts[0];
				const data = {
					type: type,
					address: address,
					page: 1,
					pageSize: 100,
					state: 2
				}
				this.$apiFun.getMyPendingOrders(data).then(res => {
					if (res.code == 200) {
						this.list = res.data;
					}
				});
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

	.card {
		padding: 40rpx;
	}

	.tabs {
		display: flex;
		align-items: center;
		color: #fff;
		border-radius: 10rpx;
		overflow: hidden;
		font-size: 32rpx;
		background: rgba(60, 60, 60, 0.7);
		;
	}

	.tabed {
		width: 33.3%;
		text-align: center;
		padding: 30rpx 0;
		color: #EEA32C;
	}

	.tabed .name {
		border-bottom: 4rpx solid #EEA32C;
		padding-bottom: 16rpx;
	}

	.tab {
		width: 33.3%;
		text-align: center;
		padding: 30rpx 0;
		color: #fff;
	}

	.lists {
		padding: 40rpx 0;
	}

	.list {
		border: 1rpx solid #a7701e;
		border-radius: 10rpx;
		padding: 30rpx;
		margin-bottom: 30rpx;
	}

	.ones {
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #fff;
		padding: 10rpx 0;
	}

	.status {
		color: #EEA32C;
		font-weight: bold;
	}
</style>