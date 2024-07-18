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
					<view class="tbody" v-if="list.length > 0">
						<view class="tr" v-for="(item,index) in list" :key="index">
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
					<view class="tbody" v-if="list.length > 0">
						<view class="tr" v-for="(item,index) in list" :key="index">
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
							{{$t('order.txt26')}}
						</view>
						<view class="tds">
							{{$t('order.txt3')}}(AIS)
						</view>
						<view class="tds y">
							{{$t('order.txt6')}}
						</view>
					</view>
					<view class="tbody" v-if="zyList.length > 0">
						<view class="tr" v-for="(item,index) in zyList" :key="index">
							<view class="td1">
								{{item.start | showDate}}
							</view>
							<view class="tds">
								{{item.day}}
							</view>
							<view class="tds">
								{{item.tokenAmt | cutOutNums}}
							</view>
							<view class="tds y">
								<block v-if="item.end >= currTemp">
									{{$t('order.txt7')}}
								</block>
								<block v-else>
									<span class="btnj" v-if="stake === 0"
										@click="unStake(index)">{{$t('order.txt8')}}</span>
									<span class="btnj" v-if="stake === 1">{{$t('order.txt8')}}...</span>
								</block>
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
		BigNumber,
		ethers
	} from 'ethers';
	import {
		cutOutNum
	} from '@/plugins/decimals';
	import {
		formatDate
	} from '@/plugins/filter.js';
	import 'wowjs/css/libs/animate.css';
	import WOW from 'wowjs';
	import Menu from '@/components/menu/menu.vue';
	import aisAbi from '@/common/AIS';
	export default {
		components: {
			Menu
		},
		data() {
			return {
				list: [],
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
				],
				aisContract: "0x263ab84638cc7fabdbC2c9bB598a20Ecc7d22bfE",
				currTemp: 0,
				stake: 0
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
			showDate(value) {
				let date = new Date(value * 1000);
				return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
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
					this.getBills(5)
					this.getUserInfo();
				} else {
					this.list = [];
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
				this.getBills(1)
				this.getUserInfo();
			} else {
				uni.showToast({
					title: this.$t('common.txt22'),
					icon: 'error'
				})
			}
		},
		methods: {
			async getUserInfo() {
				const accounts = await window.ethereum.request({
					method: 'eth_requestAccounts'
				})
				const address = accounts[0];
				const provider = new ethers.providers.Web3Provider(window.ethereum);
				const aisAbiContract = new ethers.Contract(this.aisContract, aisAbi, provider);
				let lockPower = await aisAbiContract.getUserStakings(address);
				const currs = new Date().getTime();
				this.currTemp = Math.floor(currs / 1000);
				const length = lockPower.length;
				if (length > 0) {
					lockPower = lockPower.map(item => {
						return {
							...item,
							shares: ethers.utils.formatUnits(item.shares),
							tokenAmt: ethers.utils.formatUnits(item.tokenAmt),
							day: item.day.toString(),
							start: item.start.toString(),
							end: item.end.toString()
						};
					});
				}
				this.zyList = lockPower;
				console.log('list', lockPower)
			},
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
					this.getBills(1)
				} else if (index === 1) {
					this.getBills(2)
				} else if (index === 2) {
					this.getUserInfo()
				}
			},
			async getBills(type) {
				const accounts = await window.ethereum.request({
					method: 'eth_requestAccounts'
				})
				const data = {
					type: type,
					address: accounts[0],
					page: 1,
					pageSize: 100
				}
				this.$apiFun.getPowerInfo(data).then(res => {
					if (res.code == 200) {
						this.list = res.data;
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
			async unStake(index) {
				this.stake = 1;
				const accounts = await window.ethereum.request({
					method: 'eth_requestAccounts'
				})
				const provider = new ethers.providers.Web3Provider(window.ethereum);
				const signer = provider.getSigner(accounts[0]);
				const abiContract = new ethers.Contract(this.aisContract, aisAbi, signer);
				const that = this;
				try {
					const Tx = await abiContract.removeStaking(index);
					if (Tx.hash) {
						that.stake = 0;
						uni.showToast({
							title: that.$t("order.txt27"),
							icon: 'success'
						})
					} else {
						that.stake = 0;
						uni.showToast({
							title: that.$t("order.txt28"),
							icon: 'error'
						})
					}
				} catch (error) {
					console.log('err', error)
					that.stake = 0;
					uni.showToast({
						title: that.$t("order.txt28"),
						icon: 'error'
					})
				}
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
		width: 23.3%;
		text-align: center;
	}

	.tda {
		width: 50%;
		text-align: center;
	}

	.y {
		color: #EEA32C;
		text-align: center;
	}

	.btnj {
		background-color: #EEA32C;
		color: #fff;
		padding: 10rpx 20rpx;
		border-radius: 10rpx;
	}
</style>