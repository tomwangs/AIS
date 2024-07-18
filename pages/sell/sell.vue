<template>
	<view class="container">
		<Menu></Menu>
		<view class="main">
			<view class="tops">
				<image src="../../static/back.png" class="back" @click="back"></image>
				<view class="title">
					{{$t('oth.txt8')}}
				</view>
				<view class="null">

				</view>
			</view>
			<view class="card wow fadeInDown">
				<view class="ths">
					<view class="tabs">
						<view :class="active === index?'tabed':'tab'" v-for="(item,index) in tabs" :key="index"
							@click="changeTab(index)">
							{{item.val}}
						</view>
					</view>
					<view class="sales" @click="sellBill">
						<image src="../../static/bills.png" class="bicon"></image>
					</view>
				</view>
				<view class="lists" v-if="active === 0">
					<view class="list">
						<view class="bts">
							{{$t('oth.txt9')}}
						</view>
						<view class="inp">
							<input class="in" v-model="samount" :placeholder="this.$t('oth.txt9')" />
						</view>
					</view>
					<view class="list">
						<view class="bts">
							{{$t('oth.txt10')}}
						</view>
						<view class="inp">
							<input class="in" v-model="sprice" :placeholder="this.$t('oth.txt10')" />
						</view>
					</view>
					<view class="opers">
						<block v-if="grantNumber > 0">
							<button class="btn" v-if="sell === 0" @click="beforePending">{{$t('oth.txt8')}}</button>
							<button class="btn" v-if="sell === 1">{{$t('oth.txt8')}}...</button>
						</block>
						<block v-else>
							<button class="btn" v-if="auths === 0" @click="approveToken">{{$t('oth.txt8')}}</button>
							<button class="btn" v-if="auths === 1">{{$t('oth.txt8')}}...</button>
						</block>
					</view>
					<view class="yues">
						AIS{{$t('node.txt22')}}: {{assets | cutOutNums}}
					</view>
				</view>
				<view class="lists" v-if="active === 1">
					<view class="list">
						<view class="bts">
							{{$t('oth.txt11')}}
						</view>
						<view class="inp">
							<input class="in" v-model="bamount" :placeholder="this.$t('oth.txt11')" />
						</view>
					</view>
					<view class="list">
						<view class="bts">
							{{$t('oth.txt12')}}
						</view>
						<view class="inp">
							<input class="in" v-model="bprice" :placeholder="this.$t('oth.txt12')" />
						</view>
					</view>
					<view class="opers">
						<block v-if="grantUsdtNumber > 0">
							<button class="btn" v-if="buy === 0" @click="beforeBuy">{{$t('oth.txt13')}}</button>
							<button class="btn" v-if="buy === 1">{{$t('oth.txt13')}}...</button>
						</block>
						<block v-else>
							<button class="btn" v-if="authb === 0" @click="approveUsdt">{{$t('oth.txt13')}}</button>
							<button class="btn" v-if="authb === 1">{{$t('oth.txt13')}}...</button>
						</block>
					</view>
					<view class="yues">
						USDT{{$t('node.txt22')}}: {{usdts | cutOutNums}}
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
	import tokenAbi from '@/common/Token';
	import usdtAbi from '@/common/USDT';
	export default {
		components: {
			Menu
		},
		data() {
			return {
				active: 0,
				tabs: [{
						id: 0,
						val: this.$t("oth.txt8")
					},
					{
						id: 1,
						val: this.$t("oth.txt13")
					}
				],
				sellContract: "0xf591869237d293Aee9C49DaFDF8E656EeCFe986D",
				tokenContract: "0x2af2697499b0e2f978b77615D1bC5bF65b5c065c",
				usdtContract: '0x0098eEB6a512B8b0cd496b9fF67B549FC9d97552',
				assets: 0,
				usdts: 0,
				samount: '',
				sprice: '',
				bamount: '',
				bprice: '',
				grantNumber: 0,
				grantUsdtNumber: 0,
				auths: 0,
				authb: 0.,
				sell: 0,
				buy: 0
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
			this.checkGrantNumber();
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
			async getUserInfo() {
				const accounts = await window.ethereum.request({
					method: 'eth_requestAccounts'
				})
				const address = accounts[0];
				const provider = new ethers.providers.Web3Provider(window.ethereum);
				//ais余额
				const abiKeyContract = new ethers.Contract(this.tokenContract, tokenAbi, provider);
				const tokenTotal = await abiKeyContract.balanceOf(address);
				this.assets = ethers.utils.formatUnits(String(tokenTotal), 'ether');
				console.log('ass', this.assets)
				//usdt余额
				const abiuContract = new ethers.Contract(this.usdtContract, usdtAbi, provider);
				const usdtTotal = await abiuContract.balanceOf(address);
				this.usdts = ethers.utils.formatUnits(String(usdtTotal), 'ether');
			},
			beforePending() {
				if (this.samount > 0) {
					if (this.sprice > 0) {
						this.pendingAis()
					} else {
						uni.showToast({
							title: this.$t('common.txt31'),
							icon: 'error'
						})
					}
				} else {
					uni.showToast({
						title: this.$t('common.txt32'),
						icon: 'error'
					})
				}
			},
			beforeBuy() {
				if (this.bamount > 0) {
					if (this.bprice > 0) {
						this.buyAis()
					} else {
						uni.showToast({
							title: this.$t('common.txt33'),
							icon: 'error'
						})
					}
				} else {
					uni.showToast({
						title: this.$t('common.txt34'),
						icon: 'error'
					})
				}
			},
			async checkGrantNumber() {
				const accounts = await window.ethereum.request({
					method: 'eth_requestAccounts'
				})
				const address = accounts[0];
				const provider = new ethers.providers.Web3Provider(window.ethereum);
				//授权AIS数量
				const abiContract = new ethers.Contract(this.tokenContract, tokenAbi, provider);
				const abiTokenBalance = await abiContract.allowance(address, this.sellContract);
				this.grantNumber = ethers.utils.formatUnits(String(abiTokenBalance), 'ether');
				console.log('aisg', this.grantNumber)
				//授权USDT数量
				const abiUsdtContract = new ethers.Contract(this.usdtContract, usdtAbi, provider);
				const abiUsdtBalance = await abiUsdtContract.allowance(address, this.sellContract);
				this.grantUsdtNumber = ethers.utils.formatUnits(String(abiUsdtBalance), 'ether');
				console.log('ug', this.grantUsdtNumber)
			},
			//授权AIS
			async approveToken() {
				this.auths = 1;
				const accounts = await window.ethereum.request({
					method: 'eth_requestAccounts'
				})
				const amount = ethers.constants.MaxUint256;
				const provider = new ethers.providers.Web3Provider(window.ethereum);
				const signer = provider.getSigner(accounts[0]);
				const abiContract = new ethers.Contract(this.tokenContract, tokenAbi, signer);
				const that = this;
				try {
					const Tx = await abiContract.approve(that.sellContract, BigInt(amount));
					if (Tx.hash) {
						const approveTimer = setInterval(() => {
							that.checkGrantNumber();
							if (that.grantNumber > 0) {
								that.auths = 0;
								uni.showToast({
									title: that.$t("common.txt26"),
									icon: 'success'
								})
								clearInterval(approveTimer)
							}
						}, 1000);
					} else {
						uni.showToast({
							title: that.$t("common.txt27"),
							icon: 'error',
							success() {
								that.auths = 0;
							}
						})
					}
				} catch (error) {
					uni.showToast({
						title: that.$t("common.txt27"),
						icon: 'error',
						success() {
							that.auths = 0;
						}
					})
				}
			},
			//授权USDT
			async approveUsdt() {
				this.authb = 1;
				const accounts = await window.ethereum.request({
					method: 'eth_requestAccounts'
				})
				const amount = ethers.constants.MaxUint256;
				const provider = new ethers.providers.Web3Provider(window.ethereum);
				const signer = provider.getSigner(accounts[0]);
				const abiContract = new ethers.Contract(this.usdtContract, usdtAbi, signer);
				const that = this;
				try {
					const Tx = await abiContract.approve(that.sellContract, BigInt(amount));
					if (Tx.hash) {
						const approveTimer = setInterval(() => {
							that.checkGrantNumber();
							if (that.grantUsdtNumber > 0) {
								that.authb = 0;
								uni.showToast({
									title: that.$t("common.txt26"),
									icon: 'success'
								})
								clearInterval(approveTimer)
							}
						}, 1000);
					} else {
						uni.showToast({
							title: that.$t("common.txt27"),
							icon: 'error',
							success() {
								that.authb = 0;
							}
						})
					}
				} catch (error) {
					uni.showToast({
						title: that.$t("common.txt27"),
						icon: 'error',
						success() {
							that.authb = 0;
						}
					})
				}
			},
			async pendingAis() {
				this.sell = 1;
				const accounts = await window.ethereum.request({
					method: 'eth_requestAccounts'
				})
				const provider = new ethers.providers.Web3Provider(window.ethereum);
				const signer = provider.getSigner(accounts[0]);
				const abiContract = new ethers.Contract(this.sellContract, sellAbi, signer);
				const amount = ethers.utils.parseUnits(String(this.samount), 'ether');
				const prices = ethers.utils.parseUnits(String(this.sprice), 'ether');
				const that = this;
				try {
					const Tx = await abiContract.listTokens(amount, prices);
					if (Tx.hash) {
						that.sell = 0;
						uni.showToast({
							title: that.$t("oth.txt14"),
							icon: 'success'
						})
					} else {
						that.sell = 0;
						uni.showToast({
							title: that.$t("oth.txt15"),
							icon: 'error'
						})
					}
				} catch (error) {
					that.sell = 0;
					uni.showToast({
						title: that.$t("oth.txt15"),
						icon: 'error'
					})
				}
			},
			async buyAis() {
				this.buy = 1;
				const accounts = await window.ethereum.request({
					method: 'eth_requestAccounts'
				})
				const provider = new ethers.providers.Web3Provider(window.ethereum);
				const signer = provider.getSigner(accounts[0]);
				const abiContract = new ethers.Contract(this.sellContract, sellAbi, signer);
				const amount = ethers.utils.parseUnits(String(this.bamount), 'ether');
				const prices = ethers.utils.parseUnits(String(this.bprice), 'ether');
				const that = this;
				try {
					const Tx = await abiContract.makeOffer(amount, prices);
					if (Tx.hash) {
						that.buy = 0;
						uni.showToast({
							title: that.$t("oth.txt14"),
							icon: 'success'
						})
					} else {
						that.buy = 0;
						uni.showToast({
							title: that.$t("oth.txt15"),
							icon: 'error'
						})
					}
				} catch (error) {
					console.log('error', error)
					that.buy = 0;
					uni.showToast({
						title: that.$t("oth.txt15"),
						icon: 'error'
					})
				}
			},
			getTabs() {
				this.tabs = [{
						id: 0,
						val: this.$t("oth.txt8")
					},
					{
						id: 1,
						val: this.$t("oth.txt13")
					}
				]
			},
			sellBill() {
				uni.navigateTo({
					url: '/pages/sbills/sbills'
				})
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
		padding: 50rpx 60rpx;
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
		border-radius: 10rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 26rpx 0;
	}

	.bicon {
		width: 54rpx;
		height: 44rpx;
	}

	.lists {
		margin-top: 60rpx;
	}

	.list {
		padding-bottom: 40rpx;
	}

	.bts {
		color: #fff;
		padding-bottom: 20rpx;
		font-size: 30rpx;
		font-weight: bold;
	}

	.in {
		background-color: #fff;
		padding: 30rpx;
		border-radius: 10rpx;
	}

	.opers {
		margin-top: 40rpx;
	}

	.btn {
		background-color: #EEA32C;
		color: #fff;
	}

	.yues {
		color: #ebebeb;
		padding: 30rpx 10rpx;
	}
</style>