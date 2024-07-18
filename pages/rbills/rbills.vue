<template>
	<view class="container">
		<Menu></Menu>
		<view class="main">
			<view class="tops">
				<image src="../../static/back.png" class="back" @click="back"></image>
				<view class="title">
					{{$t('mine.txt13')}}
				</view>
				<view class="null">

				</view>
			</view>
			<view class="card wow fadeInDown">
				<view class="tabs">
					<view :class="active === index?'tabed':'tab'" v-for="(item,index) in tabs" :key="index"
						@click="changeTab(index)">
						{{item.val}}
					</view>
				</view>
				<view class="tables">
					<view class="th">
						<view class="td">
							{{$t('mine.txt14')}}
						</view>
						<view class="td">
							{{$t('mine.txt15')}}
						</view>
					</view>
					<view class="tbody">
						<view class="tr">
							<view class="td">
								--
							</view>
							<view class="td">
								--
							</view>
						</view>
						<view class="tr">
							<view class="td">
								--
							</view>
							<view class="td">
								--
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
						val: this.$t("mine.txt16")
					},
					{
						id: 1,
						val: this.$t("mine.txt17")
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
						val: this.$t("mine.txt16")
					},
					{
						id: 1,
						val: this.$t("mine.txt17")
					}
				]
			},
			changeTab(index) {
				this.active = index;
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
		border: 1rpx solid #EEA32C;
		font-size: 32rpx;
		font-weight: bold;
	}

	.tabed {
		background-color: #EEA32C;
		width: 50%;
		text-align: center;
		padding: 26rpx 0;
	}

	.tab {
		width: 50%;
		text-align: center;
		padding: 26rpx 0;
		border-right: 1rpx solid #EEA32C;
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

	.td {
		width: 50%;
		text-align: center;
	}
</style>