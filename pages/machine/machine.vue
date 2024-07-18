<template>
	<view class="container">
		<Menu></Menu>
		<view class="main">
			<view class="title">
				{{$t('mac.txt1')}}
			</view>
			<view class="card wow fadeInDown">
				<view class="tits">
					<view class="titn">
						{{$t('mac.txt2')}}
					</view>
					<view class="nums">
						1:1 {{$t('mac.txt3')}}
					</view>
				</view>
				<image src="../../static/hkj.png" mode="widthFix" class="node"></image>
				<view class="cashs">
					<view class="left">
						<view class="ctit">
							{{$t('mac.txt6')}}
						</view>
						<view class="adds">
							<view class="del ope" @click="hdel">
								<image src="../../static/del.png" class="dicon"></image>
							</view>
							<view class="num">
								{{hnumber}}
							</view>
							<view class="add ope" @click="hadd">
								<image src="../../static/add.png" class="aicon"></image>
							</view>
						</view>
					</view>
					<view class="prices">
						<image src="../../static/token.png" class="token"></image>
						<span class="amount">100</span> <span class="unit">usdt</span>
					</view>
				</view>
				<view class="opers">
					<block v-if="grantNumber > 0">
						<button class="btn" v-if="buy1 === 0" @click="beforBuy(1)">{{$t('node.txt4')}}</button>
						<button class="btn" v-if="buy1 === 1">{{$t('node.txt15')}}...</button>
					</block>
					<block v-else>
						<button class="btn" v-if="auth1 === 0" @click="approve(1)">{{$t('node.txt4')}}</button>
						<button class="btn" v-if="auth1 === 1">{{$t('node.txt15')}}...</button>
					</block>
				</view>
				<view class="power">
					<view class="get">
						{{$t('node.txt5')}}：{{getHPower}}
					</view>
					<view class="bals">
						{{$t('node.txt22')}}：{{assets | cutOutNums}}
					</view>
				</view>
			</view>
			<view class="card wow fadeInDown">
				<view class="tits">
					<view class="titn">
						{{$t('mac.txt4')}}
					</view>
					<view class="nums">
						1:1.5 {{$t('mac.txt3')}}
					</view>
				</view>
				<image src="../../static/mkj.png" mode="widthFix" class="node"></image>
				<view class="cashs">
					<view class="left">
						<view class="ctit">
							{{$t('mac.txt6')}}
						</view>
						<view class="adds">
							<view class="del ope" @click="mdel">
								<image src="../../static/del.png" class="dicon"></image>
							</view>
							<view class="num">
								{{mnumber}}
							</view>
							<view class="add ope" @click="madd">
								<image src="../../static/add.png" class="aicon"></image>
							</view>
						</view>
					</view>
					<view class="prices">
						<image src="../../static/token.png" class="token"></image>
						<span class="amount">1000</span> <span class="unit">usdt</span>
					</view>
				</view>
				<view class="opers">
					<block v-if="grantNumber > 0">
						<button class="btn" v-if="buy2 === 0" @click="beforBuy(2)">{{$t('node.txt4')}}</button>
						<button class="btn" v-if="buy2 === 1">{{$t('node.txt15')}}...</button>
					</block>
					<block v-else>
						<button class="btn" v-if="auth2 === 0" @click="approve(2)">{{$t('node.txt4')}}</button>
						<button class="btn" v-if="auth2 === 1">{{$t('node.txt15')}}...</button>
					</block>
				</view>
				<view class="power">
					<view class="get">
						{{$t('node.txt5')}}：{{getMPower}}
					</view>
					<view class="bals">
						{{$t('node.txt22')}}：{{assets | cutOutNums}}
					</view>
				</view>
			</view>
			<view class="card wow fadeInDown">
				<view class="tits">
					<view class="titn">
						{{$t('mac.txt5')}}
					</view>
					<view class="nums">
						1:2 {{$t('mac.txt3')}}
					</view>
				</view>
				<image src="../../static/tkj.png" mode="widthFix" class="node"></image>
				<view class="cashs">
					<view class="left">
						<view class="ctit">
							{{$t('mac.txt6')}}
						</view>
						<view class="adds">
							<view class="del ope" @click="tdel">
								<image src="../../static/del.png" class="dicon"></image>
							</view>
							<view class="num">
								{{tnumber}}
							</view>
							<view class="add ope" @click="tadd">
								<image src="../../static/add.png" class="aicon"></image>
							</view>
						</view>
					</view>
					<view class="prices">
						<image src="../../static/token.png" class="token"></image>
						<span class="amount">10000</span> <span class="unit">usdt</span>
					</view>
				</view>
				<view class="opers">
					<block v-if="grantNumber > 0">
						<button class="btn" v-if="buy3 === 0" @click="beforBuy(3)">{{$t('node.txt4')}}</button>
						<button class="btn" v-if="buy3 === 1">{{$t('node.txt15')}}...</button>
					</block>
					<block v-else>
						<button class="btn" v-if="auth3 === 0" @click="approve(3)">{{$t('node.txt4')}}</button>
						<button class="btn" v-if="auth3 === 1">{{$t('node.txt15')}}...</button>
					</block>
				</view>
				<view class="power">
					<view class="get">
						{{$t('node.txt5')}}：{{getTPower}}
					</view>
					<view class="bals">
						{{$t('node.txt22')}}：{{assets | cutOutNums}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Clipboard from 'clipboard';
	import {
		ethers
	} from 'ethers';
	import {
		cutOutNum
	} from '@/plugins/decimals';
	import 'wowjs/css/libs/animate.css';
	import WOW from 'wowjs';
	import Menu from '@/components/menu/menu.vue';
	import Conn from '@/components/connect/connect.vue';
	import usdtAbi from '@/common/USDT';
	import aisAbi from '@/common/AIS';
	export default {
		components: {
			Menu,
			Conn
		},
		data() {
			return {
				hnumber: 0,
				mnumber: 0,
				tnumber: 0,
				getHPower: 0,
				getMPower: 0,
				getTPower: 0,
				usdtContract: '0x0098eEB6a512B8b0cd496b9fF67B549FC9d97552',
				aisContract: "0x263ab84638cc7fabdbC2c9bB598a20Ecc7d22bfE",
				assets: 0,
				buy1: 0,
				buy2: 0,
				buy3: 0,
				auth1: 0,
				auth2: 0,
				auth3: 0,
				grantNumber: 0
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
					this.nodeList = [];
					this.share = 'https://aiscm.cc?inviter=';
					uni.showToast({
						title: this.$t('common.txt22'),
						icon: 'error'
					})
				}
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
			this.getUserInfo();
			this.checkGrantNumber()
		},
		methods: {
			hdel() {
				if (this.hnumber <= 0) {
					this.hnumber = 0;
					this.getHPower = 0;
					return false;
				} else {
					this.hnumber = this.hnumber - 1;
					this.getHPower = parseInt(this.hnumber) * 100;
				}
			},
			hadd() {
				this.hnumber += 1;
				this.getHPower = parseInt(this.hnumber) * 100;
			},
			mdel() {
				if (this.mnumber <= 0) {
					this.mnumber = 0;
					this.getMPower = 0;
					return false;
				} else {
					this.mnumber = this.mnumber - 1;
					this.getMPower = parseInt(this.mnumber) * 1500;
				}
			},
			madd() {
				this.mnumber += 1;
				this.getMPower = parseInt(this.mnumber) * 1500;
			},
			tdel() {
				if (this.tnumber <= 0) {
					this.tnumber = 0;
					this.getTPower = 0;
					return false;
				} else {
					this.tnumber = this.tnumber - 1;
					this.getTPower = parseInt(this.tnumber) * 20000;
				}
			},
			tadd() {
				this.tnumber += 1;
				this.getTPower = parseInt(this.tnumber) * 20000;
			},
			async getUserInfo() {
				const accounts = await window.ethereum.request({
					method: 'eth_requestAccounts'
				})
				const address = accounts[0];
				const provider = new ethers.providers.Web3Provider(window.ethereum);
				//usdt
				const abiKeyContract = new ethers.Contract(this.usdtContract, usdtAbi, provider);
				const usdtTotal = await abiKeyContract.balanceOf(address);
				this.assets = ethers.utils.formatUnits(String(usdtTotal), 'ether');
			},
			async checkGrantNumber() {
				const accounts = await window.ethereum.request({
					method: 'eth_requestAccounts'
				})
				const address = accounts[0];
				const provider = new ethers.providers.Web3Provider(window.ethereum);
				//授权数量
				const abiKeyContract = new ethers.Contract(this.usdtContract, usdtAbi, provider);
				const abiUsdtBalance = await abiKeyContract.allowance(address, this.aisContract);
				this.grantNumber = ethers.utils.formatUnits(String(abiUsdtBalance), 'ether');
				console.log('balance', this.grantNumber)
			},
			//授权
			async approve(type) {
				if (type === 1) {
					this.auth1 = 1;
				} else if (type === 2) {
					this.auth2 = 1;
				} else {
					this.auth3 = 1;
				}
				const accounts = await window.ethereum.request({
					method: 'eth_requestAccounts'
				})
				const amount = ethers.constants.MaxUint256;
				const provider = new ethers.providers.Web3Provider(window.ethereum);
				const signer = provider.getSigner(accounts[0]);
				const abiContract = new ethers.Contract(this.usdtContract, usdtAbi, signer);
				const that = this;
				try {
					const Tx = await abiContract.approve(that.aisContract, BigInt(amount));
					if (Tx.hash) {
						const approveTimer = setInterval(() => {
							that.checkGrantNumber();
							if (that.grantNumber > 0) {
								that.auth1 = 0;
								that.auth2 = 0;
								that.auth3 = 0;
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
								that.auth1 = 0;
								that.auth2 = 0;
								that.auth3 = 0;
							}
						})
					}
				} catch (error) {
					uni.showToast({
						title: that.$t("common.txt27"),
						icon: 'error',
						success() {
							that.auth1 = 0;
							that.auth2 = 0;
							that.auth3 = 0;
						}
					})
				}
			},
			async beforBuy(type) {
				const token = this.$store.state.token;
				if (token) {
					if (type === 1) {
						if (this.hnumber > 0) {
							const total = parseInt(this.hnumber) * 100;
							console.log('amount', total)
							if (parseFloat(this.assets) >= parseFloat(total)) {
								this.buy1 = 1;
								this.buyMachine(type, this.hnumber);
							} else {
								uni.showToast({
									title: this.$t("node.txt18"),
									icon: 'error'
								})
							}
						} else {
							uni.showToast({
								title: this.$t("common.txt28"),
								icon: 'error'
							})
						}
					} else if (type === 2) {
						if (this.mnumber > 0) {
							const total = parseInt(this.mnumber) * 1000;
							console.log('amount', total)
							if (parseFloat(this.assets) >= parseFloat(total)) {
								this.buy2 = 1;
								this.buyMachine(type, this.mnumber);
							} else {
								uni.showToast({
									title: this.$t("node.txt18"),
									icon: 'error'
								})
							}
						} else {
							uni.showToast({
								title: this.$t("common.txt28"),
								icon: 'error'
							})
						}
					} else {
						if (this.tnumber > 0) {
							const total = parseInt(this.tnumber) * 10000;
							console.log('amount', total)
							if (parseFloat(this.assets) >= parseFloat(total)) {
								this.buy3 = 1;
								this.buyMachine(type, this.tnumber);
							} else {
								uni.showToast({
									title: this.$t("node.txt18"),
									icon: 'error'
								})
							}
						} else {
							uni.showToast({
								title: this.$t("common.txt28"),
								icon: 'error'
							})
						}
					}

				} else {
					uni.showToast({
						title: this.$t('common.txt22'),
						icon: 'error'
					})
				}
			},
			async buyMachine(type, count) {
				if (count > 0) {
					const accounts = await window.ethereum.request({
						method: 'eth_requestAccounts'
					})
					const provider = new ethers.providers.Web3Provider(window.ethereum);
					const signer = provider.getSigner(accounts[0]);
					const abiContract = new ethers.Contract(this.aisContract, aisAbi, signer);
					const that = this;
					try {
						const Tx = await abiContract.buyMining(type, count);
						if (Tx.hash) {
							that.buy1 = 0;
							that.buy2 = 0;
							that.buy3 = 0;
							uni.showToast({
								title: that.$t("node.txt16"),
								icon: 'success'
							})
						} else {
							that.buy1 = 0;
							that.buy2 = 0;
							that.buy3 = 0;
							uni.showToast({
								title: that.$t("node.txt17"),
								icon: 'error'
							})
						}
					} catch (error) {
						console.log('error', error)
						that.buy1 = 0;
						that.buy2 = 0;
						that.buy3 = 0;
						uni.showToast({
							title: that.$t("node.txt17"),
							icon: 'error'
						})
					}
				} else {
					uni.showToast({
						title: this.$t("common.txt28"),
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
		font-size: 40rpx;
		font-weight: bold;
		text-align: center;
	}

	.tits {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 10rpx;
	}

	.card {
		margin-top: 60rpx;
		padding-bottom: 60rpx;
	}

	.tit {
		color: #FFCF82;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.titn {
		color: #fff;
		font-size: 32rpx;
	}

	.ti {
		font-size: 34rpx;
		font-weight: bold;
	}

	.nums {
		color: #FFCF82;
		font-size: 36rpx;
		font-family: 'Bold';
	}

	.node {
		width: 100%;
		margin-top: 40rpx;
	}

	.token {
		width: 50rpx;
		height: 50rpx;
	}

	.cashs {
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #fff;
		font-size: 30rpx;
		padding: 20rpx 10rpx;
	}

	.left {
		align-items: center;
		display: flex;
	}

	.ctit {
		font-family: 'Bold';
		font-size: 32rpx;
		padding-right: 30rpx;
	}

	.prices {
		display: flex;
		align-items: center;
	}

	.amount {
		padding-left: 20rpx;
		font-size: 36rpx;
		font-weight: bold;
	}

	.unit {
		padding-left: 10rpx;
		font-size: 32rpx;
	}

	.opers {
		display: flex;
		justify-content: center;
		margin-top: 40rpx;
	}

	.btn {
		background-color: #EEA32C;
		color: #fff;
		width: 80%;
	}

	.btned {
		border: 1rpx solid #8f8f8f;
		background-color: #795116;
		color: #aeaeae;
		width: 80%;
	}

	.power {
		color: #C5A779;
		text-align: center;
		padding-top: 30rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.bals {
		color: #fff;
		padding-left: 50rpx;
	}

	.copy {
		border: 1rpx solid #EEA32C;
		color: #FFCF82;
		padding: 10rpx 30rpx;
		border-radius: 16rpx;
	}

	.url {
		border: 1rpx solid #EEA32C;
		color: #FFCF82;
		padding: 30rpx;
		border-radius: 20rpx;
		word-break: break-all;
		margin: 30rpx 0;
	}

	.adds {
		display: flex;
		align-items: center;
	}

	.del {
		width: 58rpx;
		height: 58rpx;
		background-color: #656C76;
		border-radius: 10rpx;
	}

	.add {
		width: 58rpx;
		height: 58rpx;
		background-color: #EEA32C;
		border-radius: 10rpx;
	}

	.ope {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.num {
		font-size: 40rpx;
		font-family: 'Bold';
		padding: 0 30rpx;
	}

	.dicon {
		width: 30rpx;
		height: 6rpx;
	}

	.aicon {
		width: 30rpx;
		height: 30rpx;
	}
</style>