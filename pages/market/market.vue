<template>
	<view class="container">
		<Menu></Menu>
		<view class="main">
			<view class="title">
				{{$t('mac.txt7')}}
			</view>
			<view class="card wow fadeInDown">
				<view class="ths">
					<view class="tabs">
						<view :class="active === index?'tabed':'tab'" v-for="(item,index) in tabs" :key="index"
							@click="changeTab(index)">
							{{item.val}}
						</view>
					</view>
					<view class="sales" @click="toSell">
						{{$t('mac.txt8')}}
					</view>
				</view>
				<view class="lists" v-if="active === 0">
					<view class="list" v-if="list.length > 0" v-for="(item,index) in list" :key="index">
						<view class="infos">
							<view class="info">
								<view class="tits">
									<image src="../../static/ais.png" class="ais"></image>
									<view class="tit">
										{{$t('mac.txt9')}}
									</view>
								</view>
								<view class="nums">
									{{item.amt}}
								</view>
							</view>
							<view class="info">
								<view class="tits">
									<view class="tit">
										{{$t('mac.txt10')}}
									</view>
								</view>
								<view class="numss">
									$ {{item.totalPrice}}
								</view>
							</view>
						</view>
						<view class="opers">
							<button class="btn" v-if="buy === 0" @click="buyToken(item.id)">{{$t('mac.txt11')}}</button>
							<button class="btn" v-if="buy === 1">{{$t('mac.txt11')}}...</button>
						</view>
					</view>
					<view class="nones" v-else>
						{{$t('common.txt29')}}
					</view>
				</view>
				<view class="lists" v-if="active === 1">
					<view class="list" v-if="list.length > 0" v-for="(item,index) in list" :key="index">
						<view class="infos">
							<view class="info">
								<view class="tits">
									<image src="../../static/ais.png" class="ais"></image>
									<view class="tit">
										{{$t('mac.txt12')}}
									</view>
								</view>
								<view class="nums">
									{{item.amt}}
								</view>
							</view>
							<view class="info">
								<view class="tits">
									<view class="tit">
										{{$t('mac.txt13')}}
									</view>
								</view>
								<view class="numss">
									$ {{item.totalPrice}}
								</view>
							</view>
						</view>
						<view class="opers">
							<button class="btn" v-if="sell === 0"
								@click="sellToken(item.id)">{{$t('mac.txt14')}}</button>
							<button class="btn" v-if="sell === 1">{{$t('mac.txt14')}}...</button>
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
	import sellAbi from '@/common/SELL';
	import usdtAbi from '@/common/USDT';
	import tokenAbi from '@/common/Token';
	export default {
		components: {
			Menu
		},
		data() {
			return {
				active: 0,
				tabs: [{
						id: 0,
						val: this.$t("mac.txt15")
					},
					{
						id: 1,
						val: this.$t("mac.txt16")
					}
				],
				list: '',
				sellContract: "0xf591869237d293Aee9C49DaFDF8E656EeCFe986D",
				usdtContract: '0x0098eEB6a512B8b0cd496b9fF67B549FC9d97552',
				tokenContract: "0x2af2697499b0e2f978b77615D1bC5bF65b5c065c",
				aisAssets: 0,
				usdtAssets: 0,
				buy: 0,
				sell: 0
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
			this.getUserInfo();
			this.getOrderList(1);
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
						val: this.$t("mac.txt15")
					},
					{
						id: 1,
						val: this.$t("mac.txt16")
					}
				]
			},
			changeTab(index) {
				this.active = index;
				if (index === 0) {
					this.getOrderList(1)
				} else {
					this.getOrderList(2)
				}
			},
			getOrderList(type) {
				const data = {
					type: type,
					page: 1,
					pageSize: 100,
					state: 2
				}
				this.$apiFun.getAllPendingOrders(data).then(res => {
					if (res.code == 200) {
						this.list = res.data;
					}
				});
			},
			toSell() {
				uni.navigateTo({
					url: '/pages/sell/sell'
				})
			},
			async getUserInfo() {
				const accounts = await window.ethereum.request({
					method: 'eth_requestAccounts'
				})
				const address = accounts[0];
				const provider = new ethers.providers.Web3Provider(window.ethereum);
				//ais余额
				const abiKeyContract = new ethers.Contract(this.tokenContract, tokenAbi, provider);
				const tokenTotal = await abiKeyContract.balanceOf(address);
				this.aisAssets = ethers.utils.formatUnits(String(tokenTotal), 'ether');
				console.log('ais', this.aisAssets)
				//usdt余额
				const abiuContract = new ethers.Contract(this.usdtContract, usdtAbi, provider);
				const usdtTotal = await abiuContract.balanceOf(address);
				this.usdtAssets = ethers.utils.formatUnits(String(usdtTotal), 'ether');
				console.log('usdt', this.usdtAssets)
			},
			async buyToken(id) {
				this.buy = 1;
				const accounts = await window.ethereum.request({
					method: 'eth_requestAccounts'
				})
				const address = accounts[0];
				const provider = new ethers.providers.Web3Provider(window.ethereum);
				const signer = provider.getSigner(accounts[0]);
				const abiContract = new ethers.Contract(this.sellContract, sellAbi, signer);
				const that = this;
				try {
					const Tx = await abiContract.buyTokens(id);
					if (Tx.hash) {
						uni.showToast({
							title: that.$t("common.txt35"),
							icon: 'success'
						})
						that.buy = 0;
					} else {
						that.buy = 0;
						uni.showToast({
							title: that.$t("common.txt36"),
							icon: 'error'
						})
					}
				} catch (error) {
					that.buy = 0;
					uni.showToast({
						title: that.$t("common.txt36"),
						icon: 'error'
					})
				}
			},
			async sellToken(id) {
				this.sell = 1;
				const accounts = await window.ethereum.request({
					method: 'eth_requestAccounts'
				})
				const address = accounts[0];
				const provider = new ethers.providers.Web3Provider(window.ethereum);
				const signer = provider.getSigner(accounts[0]);
				const abiContract = new ethers.Contract(this.sellContract, sellAbi, signer);
				const that = this;
				try {
					const Tx = await abiContract.sellTokens(id);
					if (Tx.hash) {
						uni.showToast({
							title: that.$t("common.txt37"),
							icon: 'success'
						})
						that.sell = 0;
					} else {
						that.sell = 0;
						uni.showToast({
							title: that.$t("common.txt38"),
							icon: 'error'
						})
					}
				} catch (error) {
					that.sell = 0;
					uni.showToast({
						title: that.$t("common.txt38"),
						icon: 'error'
					})
				}
			}
		}
	}
</script>

<style scoped>
	.main {
		padding: 150rpx 30rpx 30rpx 30rpx;
	}

	.title {
		color: #fff;
		font-size: 36rpx;
		font-weight: bold;
		text-align: center;
	}

	.card {
		margin-top: 50rpx;
	}

	.ths {
		display: flex;
		align-items: center;
		justify-content: space-between;
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
		width: 75%;
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
		background-color: #fff;
		color: #000;
		border-right: 1rpx solid #EEA32C;
	}

	.tab:last-child {
		border-right: unset;
	}

	.sales {
		border: 1rpx solid #EEA32C;
		width: 20%;
		text-align: center;
		padding: 26rpx 0;
		color: #fff;
		border-radius: 10rpx;
		font-size: 32rpx;
	}

	.lists {
		padding: 40rpx 0;
	}

	.list {
		padding: 50rpx 30rpx;
		border: 1rpx solid #EEA32C;
		border-radius: 20rpx;
		margin-bottom: 30rpx;
	}

	.ais {
		width: 40rpx;
		height: 40rpx;
	}

	.infos {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.info {
		width: 50%;
		text-align: center;
	}

	.tits {
		display: flex;
		align-items: center;
		color: #fff;
		justify-content: center;
	}

	.tit {
		padding-left: 20rpx;
	}

	.nums {
		color: #46BCFF;
		font-size: 36rpx;
		font-family: 'Bold';
		padding: 30rpx 0;
	}

	.numss {
		color: #FDB31A;
		font-size: 36rpx;
		font-family: 'Bold';
		padding: 30rpx 0;
	}

	.opers {
		margin-top: 30rpx;
	}

	.btn {
		width: 80%;
		background-color: #E59A23;
		color: #fff;
	}
</style>