<template>
	<view class="container">
		<Menu></Menu>
		<view class="main">
			<view class="banner">
				<image src="../../static/mines.png" mode="widthFix" class="bicon wow slideInRight"></image>
				<view class="infos wow slideInLeft">
					<view class="title">
						AIS
					</view>
					<view class="decs">
						{{$t('mine.txt1')}}
					</view>
				</view>
			</view>
			<view class="card wow fadeInUp">
				<view class="tits">
					<view class="titn">
						{{$t('node.txt8')}}
					</view>
					<view class="copy" id="copyBtn" @click="onCopy" :data-clipboard-text="share"
						data-clipboard-action="copy">
						{{$t('node.txt9')}}
					</view>
				</view>
				<view class="url">
					{{share}}
				</view>
			</view>
			<view class="mine wow fadeInDown">
				<view class="tops">
					<view class="level">
						<image src="../../static/v1.png" v-if="nodeLv == 1" class="lvs"></image>
						<image src="../../static/v2.png" v-if="nodeLv == 2" class="lvs"></image>
						<image src="../../static/v3.png" v-if="nodeLv ==3" class="lvs"></image>
						<view class="lvname">
							<span v-if="nodeLv == 1">{{$t('node.txt2')}}</span>
							<span v-if="nodeLv == 2">{{$t('node.txt6')}}</span>
							<span v-if="nodeLv == 3">{{$t('node.txt7')}}</span>
						</view>
					</view>
					<view class="left">

					</view>
					<view class="center">
						<view class="mys">
							{{$t('mine.txt2')}}
						</view>
						<view class="powers">
							{{power | cutOutNums}}
						</view>
					</view>
					<view class="arrow" @click="orders">
						<image src="../../static/arrow.png" class="arr"></image>
					</view>
				</view>
				<view class="boxs">
					<view class="lists">
						<view class="list line">
							<view class="mys">
								{{$t('mine.txt3')}}
							</view>
							<view class="power">
								{{power | cutOutNums}}
							</view>
							<view class="oper">
								<button class="btn" @click="buyMac">{{$t('mine.txt4')}}</button>
							</view>
						</view>
						<view class="list">
							<view class="mys">
								{{$t('mine.txt19')}}
							</view>
							<view class="power">
								{{heap | cutOutNums}}
							</view>
							<view class="oper">
								<button class="btn" v-if="rec === 0" @click="receive">{{$t('mine.txt8')}}</button>
								<button class="btn" v-if="rec === 1">{{$t('mine.txt18')}}</button>
							</view>
						</view>
					</view>
					<view class="reced">
						<view class="recl">
							{{$t('mine.txt20')}}
						</view>
						<view class="recn">
							{{totalCdPowers}}
						</view>
					</view>
					<view class="reces">
						<view class="recl">
							{{$t('mine.txt6')}}
						</view>
						<view class="recn">
							0.00 AIS
						</view>
					</view>
					<view class="listp">
						<view class="jls" @click="recbills">
							{{$t('mine.txt13')}}
						</view>
						<view class="profit">
							<view class="mys">
								{{$t('mine.txt7')}}
							</view>
							<view class="power">
								0.00 AIS
							</view>
							<view class="oper">
								<button class="btn">{{$t('mine.txt8')}}</button>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="team wow fadeInDown">
				<view class="tit">
					<view class="ti">
						{{$t('node.txt10')}}
					</view>
					<view class="mypower" @click="pbills">
						{{$t('order.txt11')}} >
					</view>
				</view>
				<view class="th">
					<view class="td">
						{{$t('node.txt11')}}
					</view>
					<view class="td">
						{{$t('mine.txt5')}}
					</view>
					<view class="td">
						{{$t('mine.txt10')}}
					</view>
				</view>
				<view class="tbody" v-if="teamList.length >0">
					<view class="tr" v-for="(item,index) in teamList" :key="index">
						<view class="td">
							{{item.address | addrFilter}}
						</view>
						<view class="td">
							{{item.shares | cutOutNums}}
						</view>
						<view class="td">
							{{item.group | cutOutNums}}
						</view>
					</view>
				</view>
				<view class="nones" v-else>
					{{$t('common.txt29')}}
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
	import Clipboard from 'clipboard';
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
				aisContract: "0xA7Cc5BF48DdeE519A4391400eFcC4dD407973087",
				share: 'https://test.aiscm.cc?inviter=',
				teamList: [],
				nodeLv: 0,
				power: 0,
				heap: 0,
				rec: 0,
				totalCdPowers: 0
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
					this.getShare();
					this.getTeams()
				} else {
					this.teamList = [];
					this.share = "https://test.aiscm.cc?inviter=";
					this.nodeLv = 0;
					this.power = 0;
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
				this.getUserInfo();
				this.getShare();
				this.getTeams();
				this.getHeaps()
			} else {
				this.share = 'https://test.aiscm.cc?inviter=';
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
				const abiContract = new ethers.Contract(this.aisContract, aisAbi, provider);
				const userInfo = await abiContract.users(address);
				this.nodeLv = String(userInfo.identity);
				this.power = ethers.utils.formatUnits(String(userInfo.shares), 'ether');
			},
			async getHeaps() {
				const accounts = await window.ethereum.request({
					method: 'eth_requestAccounts'
				})
				const data = {
					address: accounts[0]
				}
				this.$apiFun.getMyHeapPowers(data).then(res => {
					if (res.code == 200) {
						this.heap = res.data.activatable;
						this.totalCdPowers = res.data.inactivated;
					}
				});
			},
			async receive() {
				const token = this.$store.state.token;
				if (token) {
					if (this.heap > 0) {
						this.rec = 1;
						const accounts = await window.ethereum.request({
							method: 'eth_requestAccounts'
						})
						const data = {
							address: accounts[0]
						}
						this.$apiFun.getMySigns(data).then(res => {
							if (res.code == 200) {
								this.recHeaps(res.data)
							}
						});
					} else {
						uni.showToast({
							title: this.$t('node.txt18'),
							icon: 'error'
						})
					}
				} else {
					uni.showToast({
						title: this.$t('common.txt22'),
						icon: 'error'
					})
				}
			},
			async recHeaps(pars) {
				const accounts = await window.ethereum.request({
					method: 'eth_requestAccounts'
				})
				const address = accounts[0];
				const provider = new ethers.providers.Web3Provider(window.ethereum);
				const signer = provider.getSigner(accounts[0]);
				const abiContract = new ethers.Contract(this.aisContract, aisAbi, signer);
				const that = this;
				try {
					const Tx = await abiContract.activeShares(pars.receiver, pars.nonce, pars.amount, pars.time,
						pars.signature);
					if (Tx.hash) {
						uni.showToast({
							title: that.$t('mine.txt11'),
							icon: 'success'
						})
						that.rec = 0;
					} else {
						uni.showToast({
							title: that.$t('mine.txt12'),
							icon: 'error'
						})
						that.rec = 0;
					}
				} catch (error) {
					console.log('err', error)
					uni.showToast({
						title: that.$t('mine.txt12'),
						icon: 'error'
					})
					that.rec = 0;
				}
			},
			async getShare() {
				const accounts = await window.ethereum.request({
					method: 'eth_requestAccounts'
				})
				const address = accounts[0];
				this.share = 'https://test.aiscm.cc?inviter=' + address;
			},
			async getTeams() {
				const accounts = await window.ethereum.request({
					method: 'eth_requestAccounts'
				})
				const data = {
					address: accounts[0]
				}
				this.$apiFun.getDirectInfo(data).then(res => {
					if (res.code == 200) {
						this.teamList = res.data;
					}
				});
			},
			onCopy() {
				const token = this.$store.state.token;
				if (token) {
					let clipboard = new Clipboard('#copyBtn');
					clipboard.on('success', e => {
						uni.showToast({
							title: this.$t('common.txt20'),
							icon: 'success'
						});
						clipboard.destroy()
					})
					clipboard.on('error', e => {
						uni.showToast({
							title: this.$t('common.txt21'),
							icon: 'error'
						});
						clipboard.destroy()
					})
				} else {
					uni.showToast({
						title: this.$t('common.txt22'),
						icon: 'error'
					})
				}
			},
			pbills() {
				uni.navigateTo({
					url: '/pages/pbills/pbills'
				})
			},
			orders() {
				uni.navigateTo({
					url: '/pages/order/order'
				})
			},
			recbills() {
				uni.navigateTo({
					url: '/pages/rbills/rbills'
				})
			},
			buyMac() {
				uni.navigateTo({
					url: '/pages/machine/machine'
				})
			}
		}
	}
</script>

<style scoped>
	.main {
		padding: 150rpx 30rpx 30rpx 30rpx;
	}

	.banner {
		position: relative;
	}

	.bicon {
		width: 100%;
	}

	.infos {
		position: absolute;
		top: 80rpx;
		left: 60rpx;
	}

	.title {
		color: #FFDE7B;
		font-size: 80rpx;
		line-height: 90rpx;
		font-weight: bolder;
		letter-spacing: 6rpx;
		font-family: 'ZenDots';
	}

	.decs {
		padding-top: 30rpx;
		color: #fff;
		line-height: 46rpx;
		font-size: 32rpx;
	}

	.tits {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 10rpx;
	}

	.card {
		margin-top: 60rpx;
		padding-bottom: 40rpx;
	}

	.titn {
		color: #FFCF82;
		font-size: 34rpx;
		font-weight: bold;
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

	.mine {
		border: 1rpx solid #EEA32C;
		border-radius: 20rpx;
		overflow: hidden;
	}

	.tops {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 50rpx;
		background-color: #151515;
		border-bottom: 1rpx solid #EEA32C;
		position: relative;
	}

	.level {
		position: absolute;
		top: 0;
		left: 20rpx;
		text-align: center;
	}

	.left {
		width: 28rpx;
	}

	.lvs {
		width: 78rpx;
		height: 94rpx;
	}

	.lvname {
		color: #da9327;
	}

	.arr {
		width: 28rpx;
		height: 36rpx;
	}

	.center {
		text-align: center;
	}

	.mys {
		color: #fff;
		font-size: 32rpx;
		padding-bottom: 20rpx;
	}

	.powers {
		color: #FFC85E;
		font-size: 44rpx;
		font-family: 'Bold';
		line-height: 54rpx;
	}

	.power {
		color: #FFC85E;
		font-size: 34rpx;
		font-family: 'Bold';
	}

	.boxs {}

	.lists {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 50rpx 0;
	}

	.listp {
		padding: 50rpx 0;
		text-align: center;
		position: relative;
	}

	.jls {
		position: absolute;
		color: #fff;
		top: 40rpx;
		right: 40rpx;
		text-decoration: underline;
		color: #EEA32C;
	}

	.list {
		width: 50%;
		text-align: center;
	}

	.oper {
		padding-top: 40rpx;
	}

	.btn {
		background-color: #FEB031;
		color: #fff;
		width: 70%;
		font-size: 32rpx;
	}

	.line {
		border-right: 1rpx solid #EEA32C;
	}

	.reced {
		padding: 30rpx 50rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #151515;
		border-top: 1rpx solid #EEA32C;
		border-bottom: 1rpx solid #EEA32C;
	}

	.reces {
		padding: 30rpx 50rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #151515;
		border-bottom: 1rpx solid #EEA32C;
	}

	.recl {
		color: #C5A779;
		font-size: 30rpx;
	}

	.recn {
		color: #FFC85E;
		font-family: 'Bold';
		font-size: 36rpx;
	}

	.team {
		padding: 60rpx 0;
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
		width: 40%;
		text-align: center;
	}

	.td {
		width: 33.3%;
		text-align: center;
	}

	.tit {
		color: #FFCF82;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 10rpx;
	}

	.ti {
		font-size: 34rpx;
		font-weight: bold;
	}

	.mypower {
		text-decoration: underline;
	}

	.sinks {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1rpx solid #EEA32C;
		padding: 30rpx;
	}

	.sink {
		color: #EEA32C;
		font-size: 32rpx;
		font-family: 'Bold';
	}

	.btnc {
		background-color: #FEB031;
		color: #fff;
		font-size: 32rpx;
	}
</style>