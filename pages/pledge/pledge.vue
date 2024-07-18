<template>
	<view class="container">
		<Menu></Menu>
		<view class="main">
			<view class="title">
				{{$t('order.txt10')}}
			</view>
			<view class="card wow fadeInDown">
				<view class="tops">
					<view class="tit">
						{{$t('order.txt10')}} AIS
					</view>
					<view class="tips">
						{{$t('order.txt17')}}
					</view>
				</view>
				<view class="infos">
					<view class="info">
						<view class="tokens">
							<image src="../../static/ais.png" class="ais"></image>
							<view class="name">
								AIS
							</view>
						</view>
						<view class="power">
							{{$t('order.txt16')}}x2
						</view>
						<view class="assets">
							{{$t('node.txt22')}}: {{aisAssets | cutOutNums}}
						</view>
					</view>
					<view class="inps">
						<view class="inp">
							<view class="ins">
								<input v-model="day" class="in" @blur="changeDay" />
								<view class="units">
									{{$t('order.txt18')}}
								</view>
							</view>
							<view class="ins">
								<input v-model="amount" class="in" disabled :placeholder="this.$t('order.txt19')" />
								<view class="units">
									AIS
								</view>
							</view>
						</view>
						<view class="adds">
							<view class="del ope" @click="hdel">
								<image src="../../static/del.png" class="dicon"></image>
							</view>
							<view class="num">
								{{number}}
							</view>
							<view class="add ope" @click="hadd">
								<image src="../../static/add.png" class="aicon"></image>
							</view>
						</view>
					</view>
					<view class="zys">
						<block v-if="grantNumber > 0">
							<button class="btn" v-if="stake === 0" @click="beforeStake">{{$t('order.txt10')}}</button>
							<button class="btn" v-if="stake === 1">{{$t('order.txt10')}}...</button>
						</block>
						<block v-else>
							<button class="btn" v-if="auth === 0" @click="approveAis">{{$t('order.txt10')}}</button>
							<button class="btn" v-if="auth === 1">{{$t('order.txt10')}}...</button>
						</block>
						<view class="gets">
							{{$t('order.txt20')}}: {{power}}
						</view>
					</view>
				</view>
			</view>
			<view class="bills wow fadeInUp">
				<view class="title">
					AIS {{$t('order.txt21')}}
					<view class="record" @click="toOrder">
						{{$t('oth.txt19')}}>
					</view>
				</view>
				<view class="cards">
					<view class="suos">
						<view class="suo">
							<view class="stit">
								{{$t('order.txt22')}}
							</view>
							<view class="snums">
								{{lockAis | cutOutNums}}
							</view>
						</view>
						<view class="suo">
							<view class="stit">
								{{$t('order.txt25')}}
							</view>
							<view class="snums">
								{{lockPowers | cutOutNums}}
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="rules wow fadeInDown">
				<view class="ritit">
					<view class="rtit">
						{{$t('order.txt23')}}
					</view>
				</view>
				<view class="rule">
					<view class="rul">
						{{$t('order.txt24')}}
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
	import aisAbi from '@/common/AIS';
	import tokenAbi from '@/common/Token';
	export default {
		components: {
			Menu
		},
		data() {
			return {
				day: 7,
				amount: '',
				number: 0,
				power: 0,
				aisContract: "0x263ab84638cc7fabdbC2c9bB598a20Ecc7d22bfE",
				tokenContract: "0x2af2697499b0e2f978b77615D1bC5bF65b5c065c",
				aisAssets: 0,
				grantNumber: 0,
				auth: 0,
				stake: 0,
				lockAis: 0,
				lockPowers: 0
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
					this.getUserInfo();
				} else {
					this.teamList = [];
					uni.showToast({
						title: this.$t('common.txt22'),
						icon: 'error'
					})
				}
			}
		},
		created() {
			this.checkGrantNumber();
			const token = this.$store.state.token;
			if (token) {
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
				const abiContract = new ethers.Contract(this.tokenContract, tokenAbi, provider);
				const tokenTotal = await abiContract.balanceOf(address);
				this.aisAssets = ethers.utils.formatUnits(String(tokenTotal), 'ether');
				const aisAbiContract = new ethers.Contract(this.aisContract, aisAbi, provider);
				const lockPower = await aisAbiContract.getUserStakings(address);
				const length = lockPower.length;
				let totalSumPower = 0;
				let totalSumAis = 0;
				if (length > 0) {
					for (let i = 0; i < length; i++) {
						totalSumPower += parseFloat(ethers.utils.formatUnits(String(lockPower[i].shares), 'ether'));
						totalSumAis += parseFloat(ethers.utils.formatUnits(String(lockPower[i].tokenAmt), 'ether'));
					}
					console.log('totalSumPower', totalSumPower)
					console.log('totalSumAis', totalSumAis)
					this.lockPowers = totalSumPower;
					this.lockAis = totalSumAis;
				}
				console.log('lockPower', lockPower)
			},
			async checkGrantNumber() {
				const accounts = await window.ethereum.request({
					method: 'eth_requestAccounts'
				})
				const address = accounts[0];
				const provider = new ethers.providers.Web3Provider(window.ethereum);
				//授权AIS数量
				const abiContract = new ethers.Contract(this.tokenContract, tokenAbi, provider);
				const abiTokenBalance = await abiContract.allowance(address, this.aisContract);
				this.grantNumber = ethers.utils.formatUnits(String(abiTokenBalance), 'ether');
				console.log('aisg', this.grantNumber)
			},
			//授权AIS
			async approveAis() {
				this.auth = 1;
				const accounts = await window.ethereum.request({
					method: 'eth_requestAccounts'
				})
				const amount = ethers.constants.MaxUint256;
				const provider = new ethers.providers.Web3Provider(window.ethereum);
				const signer = provider.getSigner(accounts[0]);
				const abiContract = new ethers.Contract(this.tokenContract, tokenAbi, signer);
				const that = this;
				try {
					const Tx = await abiContract.approve(that.aisContract, BigInt(amount));
					if (Tx.hash) {
						const approveTimer = setInterval(() => {
							that.checkGrantNumber();
							if (that.grantNumber > 0) {
								that.auth = 0;
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
								that.auth = 0;
							}
						})
					}
				} catch (error) {
					uni.showToast({
						title: that.$t("common.txt27"),
						icon: 'error',
						success() {
							that.auth = 0;
						}
					})
				}
			},
			changeDay() {
				if (this.day >= 7) {
					return true;
				} else {
					uni.showToast({
						title: this.$t("oth.txt16"),
						icon: 'error'
					})
				}
			},
			hdel() {
				if (this.number <= 0) {
					this.number = 0;
					this.amount = 0;
					this.power = 0;
					return false;
				} else {
					this.number = this.number - 1;
					this.amount = parseInt(this.number) * 5;
					this.power = parseInt(this.number) * 10;
				}
			},
			hadd() {
				this.number += 1;
				this.amount = parseInt(this.number) * 5;
				this.power = parseInt(this.number) * 10;
			},
			beforeStake() {
				if (this.day >= 7) {
					if (this.amount >= 5 && this.number > 0) {
						this.stakeAis()
					} else {
						uni.showToast({
							title: this.$t("order.txt17"),
							icon: 'error'
						})
					}
				} else {
					uni.showToast({
						title: this.$t("oth.txt16"),
						icon: 'error'
					})
				}
			},
			async stakeAis() {
				this.stake = 1;
				const accounts = await window.ethereum.request({
					method: 'eth_requestAccounts'
				})
				const amount = ethers.utils.parseUnits(String(this.amount), 'ether');;
				const provider = new ethers.providers.Web3Provider(window.ethereum);
				const signer = provider.getSigner(accounts[0]);
				const abiContract = new ethers.Contract(this.aisContract, aisAbi, signer);
				const that = this;
				try {
					const Tx = await abiContract.flexibleStaking(that.day, amount);
					if (Tx.hash) {
						that.stake = 0;
						uni.showToast({
							title: that.$t("oth.txt17"),
							icon: 'success'
						})
					} else {
						that.stake = 0;
						uni.showToast({
							title: that.$t("oth.txt18"),
							icon: 'error'
						})
					}
				} catch (error) {
					console.log('err', error)
					that.stake = 0;
					uni.showToast({
						title: that.$t("oth.txt18"),
						icon: 'error'
					})
				}
			},
			toOrder() {
				uni.navigateTo({
					url: '/pages/order/order'
				})
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
		position: relative;
	}

	.record {
		position: absolute;
		right: 10rpx;
		top: 10rpx;
		font-size: 28rpx;
		font-weight: 500;
		color: #EEA32C;
		text-decoration: underline;
		font-style: oblique;
	}

	.card {
		border: 1rpx solid #EEA32C;
		margin: 50rpx 0;
		border-radius: 20rpx;
		overflow: hidden;
	}

	.tops {
		padding: 30rpx;
		background-color: #151515;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1rpx solid #9e6a1d;
	}

	.tit {
		color: #fff;
		font-size: 32rpx;
		font-family: 'Bold';
	}

	.tips {
		color: #EFCC96;
	}

	.ais {
		width: 44rpx;
		height: 50rpx;
	}

	.name {
		color: #fff;
		font-family: 'ZenDots';
		padding-left: 20rpx;
		font-size: 34rpx;
	}

	.infos {
		padding: 40rpx;
	}

	.info {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.tokens {
		display: flex;
		align-items: center;
	}

	.power {
		border: 1rpx solid #EEA32C;
		color: #fff;
		padding: 10rpx 30rpx;
		border-radius: 10rpx;
	}

	.assets {
		color: #FFC85E;
	}

	.inps {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
	}

	.inp {
		padding-top: 30rpx;
		width: 58%;
	}

	.ins {
		position: relative;
		padding-top: 30rpx;
	}

	.in {
		background-color: #fff;
		padding: 20rpx 30rpx;
		border-radius: 10rpx;
		font-size: 32rpx;
		font-family: 'Bold';
	}

	.units {
		position: absolute;
		top: 50rpx;
		right: 30rpx;
		font-size: 30rpx;
		font-weight: bold;
	}

	.adds {
		display: flex;
		align-items: center;
		width: 42%;
		justify-content: flex-end;
		padding-bottom: 10rpx;
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
		color: #fff;
	}

	.dicon {
		width: 30rpx;
		height: 6rpx;
	}

	.aicon {
		width: 30rpx;
		height: 30rpx;
	}

	.zys {
		padding-top: 60rpx;
	}

	.btn {
		color: #fff;
		background-color: #EEA32C;
	}

	.gets {
		color: #C5A779;
		text-align: center;
		padding-top: 30rpx;
		font-size: 30rpx;
	}

	.bills {
		margin-top: 60rpx;
	}

	.cards {
		border: 1rpx solid #EEA32C;
		margin: 50rpx 0;
		border-radius: 20rpx;
		overflow: hidden;
		padding: 40rpx 0;
	}

	.suos {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.suo {
		width: 50%;
		text-align: center;
	}

	.stit {
		color: #fff;
	}

	.snums {
		color: #FDB31A;
		font-size: 36rpx;
		font-family: 'Bold';
		padding-top: 20rpx;
	}

	.rules {
		border: 1rpx solid #EEA32C;
		margin: 100rpx 0;
		border-radius: 20rpx;
		padding: 40rpx 0;
		position: relative;
	}

	.ritit {
		margin-top: -76rpx;
		display: flex;
		justify-content: center;
	}

	.rtit {
		color: #fff;
		text-align: center;
		width: 342rpx;
		background: url('../../static/rules.png');
		background-size: 100%;
		background-repeat: no-repeat;
		height: 80rpx;
		line-height: 70rpx;
		position: relative;
		z-index: 2;
		font-weight: bold;
	}

	.rule {
		padding: 40rpx;
	}

	.rul {
		color: #fff;
		padding: 10rpx 0;
	}
</style>