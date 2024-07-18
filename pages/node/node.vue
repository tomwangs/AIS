<template>
	<view class="container">
		<Menu></Menu>
		<view class="main">
			<view class="title">
				{{$t('node.txt1')}}
			</view>
			<view class="card wow fadeInDown">
				<view class="tits">
					<view class="titn">
						{{$t('node.txt2')}}
					</view>
					<view class="nums">
						{{node1}}/--
					</view>
				</view>
				<image src="../../static/node1.png" mode="widthFix" class="node"></image>
				<view class="cashs">
					<view class="ctit">
						{{$t('node.txt3')}}
					</view>
					<view class="prices">
						<image src="../../static/token.png" class="token"></image>
						<span class="amount">100</span> <span class="unit">usdt</span>
					</view>
				</view>
				<view class="opers">
					<block v-if="isBuy">
						<button class="btned">{{$t('node.txt23')}}</button>
					</block>
					<block v-else>
						<block v-if="grantNumber > 0">
							<button class="btn" v-if="buy1 === 0" @click="before(100,1)">{{$t('node.txt4')}}</button>
							<button class="btn" v-if="buy1 === 1">{{$t('node.txt15')}}...</button>
						</block>
						<block v-else>
							<button class="btn" v-if="auth1 === 0" @click="approve(1)">{{$t('node.txt4')}}</button>
							<button class="btn" v-if="auth1 === 1">{{$t('node.txt15')}}...</button>
						</block>
					</block>
				</view>
				<view class="power">
					<view class="get">
						{{$t('node.txt5')}}: 150
					</view>
					<view class="nums">
						USDT{{$t('node.txt22')}}: {{assets | cutOutNums}}
					</view>
				</view>
			</view>
			<view class="card wow fadeInUp">
				<view class="tits">
					<view class="titn">
						{{$t('node.txt6')}}
					</view>
					<view class="nums">
						{{node2}}/99
					</view>
				</view>
				<image src="../../static/node2.png" mode="widthFix" class="node"></image>
				<view class="cashs">
					<view class="ctit">
						{{$t('node.txt3')}}
					</view>
					<view class="prices">
						<image src="../../static/token.png" class="token"></image>
						<span class="amount">500</span> <span class="unit">usdt</span>
					</view>
				</view>
				<view class="opers">
					<block v-if="isBuy">
						<button class="btned">{{$t('node.txt23')}}</button>
					</block>
					<block v-else>
						<block v-if="grantNumber > 0">
							<button class="btn" v-if="buy2 === 0" @click="before(500,2)">{{$t('node.txt4')}}</button>
							<button class="btn" v-if="buy2 === 1">{{$t('node.txt15')}}...</button>
						</block>
						<block v-else>
							<button class="btn" v-if="auth2 === 0" @click="approve(2)">{{$t('node.txt4')}}</button>
							<button class="btn" v-if="auth2 === 1">{{$t('node.txt15')}}...</button>
						</block>
					</block>
				</view>
				<view class="power">
					<view class="get">
						{{$t('node.txt5')}}: 1000
					</view>
					<view class="nums">
						USDT{{$t('node.txt22')}}: {{assets | cutOutNums}}
					</view>
				</view>
			</view>
			<view class="card wow fadeInDown">
				<view class="tits">
					<view class="titn">
						{{$t('node.txt7')}}
					</view>
					<view class="nums">
						{{node3}}/31
					</view>
				</view>
				<image src="../../static/node3.png" mode="widthFix" class="node"></image>
				<view class="cashs">
					<view class="ctit">
						{{$t('node.txt3')}}
					</view>
					<view class="prices">
						<image src="../../static/token.png" class="token"></image>
						<span class="amount">3000</span> <span class="unit">usdt</span>
					</view>
				</view>
				<view class="opers">
					<block v-if="isBuy">
						<button class="btned">{{$t('node.txt23')}}</button>
					</block>
					<block v-else>
						<block v-if="grantNumber > 0">
							<button class="btn" v-if="buy3 === 0" @click="before(3000,3)">{{$t('node.txt4')}}</button>
							<button class="btn" v-if="buy3 === 1">{{$t('node.txt15')}}...</button>
						</block>
						<block v-else>
							<button class="btn" v-if="auth3 === 0" @click="approve(3)">{{$t('node.txt4')}}</button>
							<button class="btn" v-if="auth3 === 1">{{$t('node.txt15')}}...</button>
						</block>
					</block>
				</view>
				<view class="power">
					<view class="get">
						{{$t('node.txt5')}}: 6000
					</view>
					<view class="nums">
						USDT{{$t('node.txt22')}}: {{assets | cutOutNums}}
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
			<view class="team wow fadeInDown">
				<view class="tit">
					<view class="ti">
						{{$t('node.txt10')}}
					</view>
					<view class="mypower">
						{{$t('node.txt19')}}: {{myPower}}
					</view>
				</view>
				<view class="th">
					<view class="td">
						{{$t('node.txt11')}}
					</view>
					<view class="td">
						{{$t('node.txt20')}}
					</view>
					<view class="td">
						{{$t('node.txt21')}}
					</view>
				</view>
				<view class="tbody" v-if="nodeList.length > 0">
					<view class="tr" v-for="(item,index) in nodeList" :key="index">
						<view class="td">
							{{item.address | addrFilter}}
						</view>
						<view class="td">
							<span v-if="item.node === 0">{{$t('node.txt24')}}</span>
							<span v-if="item.node === 1">{{$t('node.txt2')}}</span>
							<span v-if="item.node === 2">{{$t('node.txt6')}}</span>
							<span v-if="item.node === 3">{{$t('node.txt7')}}</span>
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
				usdtContract: '0x0098eEB6a512B8b0cd496b9fF67B549FC9d97552',
				aisContract: "0x263ab84638cc7fabdbC2c9bB598a20Ecc7d22bfE",
				assets: 0,
				showTips: false,
				buy1: 0,
				buy2: 0,
				buy3: 0,
				auth1: 0,
				auth2: 0,
				auth3: 0,
				grantNumber: 0,
				share: 'https://test.aiscm.cc?inviter=',
				nodeList: [],
				myPower: 0,
				isBuy: false,
				node1: 0,
				node2: 0,
				node3: 0
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
					this.getShare();
					this.getTeams()
				} else {
					this.isBuy = false;
					this.nodeList = [];
					this.share = 'https://test.aiscm.cc?inviter=';
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
				this.getShare();
				this.getTeams()
			} else {
				uni.showToast({
					title: this.$t('common.txt22'),
					icon: 'error'
				})
			}
			this.getUserInfo();
			this.checkGrantNumber();
			this.getNodes()
		},
		methods: {
			getNodes() {
				this.$apiFun.getDashboardDatas().then(res => {
					if (res.code == 200) {
						this.node1 = res.data.node1;
						this.node2 = res.data.node2;
						this.node3 = res.data.node3;
					}
				});
			},
			sureConnect(res) {
				this.showTips = res;
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
						this.nodeList = res.data;
					}
				});
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
				const abiContract = new ethers.Contract(this.aisContract, aisAbi, provider);
				const userInfo = await abiContract.users(address);
				const nodeLv = String(userInfo.identity);
				if (nodeLv > 0) {
					this.isBuy = true;
				} else {
					this.isBuy = false;
				}
				this.myPower = ethers.utils.formatUnits(String(userInfo.shares), 'ether');
				// const nodeCount = await abiContract.nodeCount();
				// this.node1 = String(nodeCount[0]);
				// this.node2 = String(nodeCount[1]);
				// this.node3 = String(nodeCount[2]);
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
			before(number, type) {
				const token = this.$store.state.token;
				if (token) {
					if (parseFloat(this.assets) >= parseFloat(number)) {
						if (type === 1) {
							this.buy1 = 1;
							this.buyNode(100, 1)
						} else if (type === 2) {
							if (this.node2 < 99) {
								this.buy2 = 1;
								this.buyNode(500, 2)
							} else {
								uni.showToast({
									title: this.$t("common.txt30"),
									icon: 'error'
								})
							}
						} else {
							if (this.node3 < 31) {
								this.buy3 = 1;
								this.buyNode(3000, 3)
							} else {
								uni.showToast({
									title: this.$t("common.txt30"),
									icon: 'error'
								})
							}
						}
					} else {
						uni.showToast({
							title: this.$t("node.txt18"),
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
			async buyNode(number, type) {
				const accounts = await window.ethereum.request({
					method: 'eth_requestAccounts'
				})
				const provider = new ethers.providers.Web3Provider(window.ethereum);
				const signer = provider.getSigner(accounts[0]);
				const abiContract = new ethers.Contract(this.aisContract, aisAbi, signer);
				const that = this;
				try {
					const Tx = await abiContract.buyNode(type);
					if (Tx.hash) {
						that.isBuy = true;
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
					that.buy1 = 0;
					that.buy2 = 0;
					that.buy3 = 0;
					uni.showToast({
						title: that.$t("node.txt17"),
						icon: 'error'
					})
				}
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
		color: #FFCF82;
		font-size: 34rpx;
		font-weight: bold;
	}

	.ti {
		font-size: 34rpx;
		font-weight: bold;
	}

	.nums {
		color: #fff;
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
		align-items: center;
		justify-content: center;
	}

	.get {
		padding-right: 60rpx;
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

	.team {
		margin-top: 30rpx;
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
		width: 40%;
		text-align: center;
	}

	.td {
		width: 33.3%;
		text-align: center;
	}
</style>