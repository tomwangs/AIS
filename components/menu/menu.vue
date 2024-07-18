<template>
	<view class="header">
		<view class="head">
			<image src="../../static/logo.png" class="logo"></image>
			<view class="rights">
				<view class="price">
					$ 0.00
				</view>
				<view class="discont" v-if="duan" @click="disConnt">
					<span class="addrd">{{$t('common.txt1')}}</span>
				</view>
				<view class="addr" v-if="address" @click="openDuan">
					{{address | addrFilter}}
				</view>
				<view class="addr" v-else @click="connectWallet">
					{{$t('common.txt2')}}
				</view>
				<image src="../../static/caidan.png" class="cdicon" @click="showDraw"></image>
				<uni-drawer ref="showMenus" mode="left">
					<view class="menus">
						<image src="../../static/guanbi.png" class="gbs" @click="gbMenus"></image>
						<view class="top">
							<image src="../../static/logos.png" class="logs"></image>
						</view>
						<view class="menu">
							<view class="men" @click="homes">
								<image src="../../static/home.png" class="icon"></image>
								<view class="name">
									{{$t('common.txt3')}}
								</view>
							</view>
							<view class="men" @click="nodes">
								<image src="../../static/node.png" class="icon"></image>
								<view class="name">
									{{$t('common.txt4')}}
								</view>
							</view>
							<view class="men" @click="machine">
								<image src="../../static/machine.png" class="icon"></image>
								<view class="name">
									{{$t('common.txt5')}}
								</view>
							</view>
							<view class="" @click="openEcos">
								<view class="men mdown">
									<view class="mdec">
										<image src="../../static/ecology.png" class="icon"></image>
										<view class="name">
											{{$t('common.txt9')}}
										</view>
									</view>
									<image src="../../static/down.png" class="downs"></image>
								</view>
								<view class="ecos" v-if="showEcos">
									<view class="lan" @click="pledge">
										<image src="../../static/pledge.png" class="licon"></image>
										<view class="lname">
											{{$t('common.txt10')}}
										</view>
									</view>
									<view class="lan" @click="market">
										<image src="../../static/market.png" class="licon"></image>
										<view class="lname">
											{{$t('common.txt11')}}
										</view>
									</view>
									<view class="lan" @click="swap">
										<image src="../../static/exchange.png" class="licon"></image>
										<view class="lname">
											{{$t('common.txt12')}}
										</view>
									</view>
								</view>
							</view>
							<!-- <view class="men" @click="team">
								<image src="../../static/team.png" class="icon"></image>
								<view class="name">
									{{$t('common.txt6')}}
								</view>
							</view> -->
							<view class="men" @click="mine">
								<image src="../../static/mine.png" class="icon"></image>
								<view class="name">
									{{$t('common.txt7')}}
								</view>
							</view>
							<view class="men mdown" @click="openLans">
								<view class="mdec">
									<image src="../../static/lang.png" class="icon"></image>
									<view class="name">
										{{$t('common.txt8')}}
									</view>
								</view>
								<image src="../../static/down.png" class="downs"></image>
							</view>
							<view class="lans" v-if="showLang">
								<view class="lan" @click="jtzh">
									<image src="../../static/zh.png" class="licon"></image>
									<view class="lname">
										中文简体
									</view>
								</view>
								<view class="lan" @click="ftzh">
									<image src="../../static/zh.png" class="licon"></image>
									<view class="lname">
										中文繁體
									</view>
								</view>
								<view class="lan" @click="ying">
									<image src="../../static/en.png" class="licon"></image>
									<view class="lname">
										English
									</view>
								</view>
							</view>
							<view class="address" v-if="address">
								<span class="addrs">{{address | addrFilter}}</span>
							</view>
							<view class="address" v-else @click="connectWallet">
								<span class="addrs">{{$t('common.txt2')}}</span>
							</view>
						</view>
					</view>
				</uni-drawer>
			</view>
		</view>
		<uni-popup ref="popup" type="center">
			<view class="regs">
				<view class="rtit">
					{{$t('common.txt13')}}
				</view>
				<image src="../../static/bind.png" mode="widthFix" class="bicon"></image>
				<view class="itits">
					{{$t('common.txt14')}}
				</view>
				<view class="uper">
					{{uper}}
				</view>
				<view class="oper">
					<button class="btns" v-if="bind === 0" @click="bindUser">{{$t('common.txt15')}}</button>
					<button class="btns" v-if="bind === 1">{{$t('common.txt16')}}...</button>
				</view>
			</view>
		</uni-popup>
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
	import aisAbi from '@/common/AIS';
	export default {
		data() {
			return {
				address: '',
				uper: '',
				duan: false,
				showLang: false,
				showEcos: false,
				bind: 0,
				aisContract: "0x263ab84638cc7fabdbC2c9bB598a20Ecc7d22bfE",
				parents: false
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
		created() {
			this.getLang();
			this.checkChain();
			this.checkToken();
			this.changeAddr();
			this.getUserInfo();
			const uper = this.$route.query.inviter;
			const reffer = uni.getStorageSync('uper');
			if (uper) {
				this.uper = uper;
				uni.setStorageSync('uper', uper);
			} else {
				if (reffer) {
					this.uper = reffer;
				} else {
					this.uper = '';
				}
			}
		},
		mounted() {
			const wow = new WOW.WOW();
			wow.init();
		},
		methods: {
			async checkChain() {
				await window.ethereum.request({
					method: 'eth_requestAccounts'
				});
				const provider = new ethers.providers.Web3Provider(window.ethereum);
				const network = await provider.getNetwork();
				const chainId = network.chainId;
				if (chainId === 97) {
					console.log('bsc')
				} else {
					await window.ethereum.request({
						method: 'wallet_switchEthereumChain',
						params: [{
							// chainId: '0x38'
							chainId: '0x61'
						}]
					});
				}
			},
			async checkToken() {
				const accounts = await window.ethereum.request({
					method: 'eth_requestAccounts'
				})
				const token = this.$store.state.token;
				const tokens = localStorage.getItem(accounts[0]);
				if (token == tokens) {
					this.address = accounts[0];
					try {
						this.$store.commit('setToken', tokens);
					} catch (e) {
						console.log('e', e)
					}
				} else {
					this.address = '';
					this.$store.commit('cleanToken', '')
				}
			},
			changeAddr() {
				if (window.ethereum) {
					const that = this;
					ethereum.on('accountsChanged', function(accounts) {
						that.address = '';
						that.$refs.popup.close();
						that.$store.commit('cleanToken', '');
						uni.redirectTo({
							url: '/pages/index/index'
						})
					});
				} else {
					console.log('metamask!')
				}
			},
			connectWallet() {
				if (window.ethereum) {
					window.ethereum.enable().then((res) => {
						this.checkUser();
					});
				} else {
					console.log('metamask!')
				}
			},
			async getUserInfo() {
				const accounts = await window.ethereum.request({
					method: 'eth_requestAccounts'
				})
				const address = accounts[0];
				const provider = new ethers.providers.Web3Provider(window.ethereum);
				const abiContract = new ethers.Contract(this.aisContract, aisAbi, provider);
				const userInfo = await abiContract.users(address);
				const power = ethers.utils.formatUnits(String(userInfo.shares), 'ether');
			},
			async checkUser() {
				const accounts = await window.ethereum.request({
					method: 'eth_requestAccounts'
				})
				const address = accounts[0];
				const provider = new ethers.providers.Web3Provider(window.ethereum);
				const abiContract = new ethers.Contract(this.aisContract, aisAbi, provider);
				const userInfo = await abiContract.users(address);
				if (userInfo.inviter === "0x0000000000000000000000000000000000000000") {
					this.$refs.popup.open()
				} else {
					this.loginAddr(address)
				}
			},
			async checkReg() {
				const accounts = await window.ethereum.request({
					method: 'eth_requestAccounts'
				})
				const address = accounts[0];
				const provider = new ethers.providers.Web3Provider(window.ethereum);
				const abiContract = new ethers.Contract(this.aisContract, aisAbi, provider);
				const userInfo = await abiContract.users(address);
				if (userInfo.inviter != "0x0000000000000000000000000000000000000000") {
					this.parents = true;
				} else {
					console.log('no-reg')
				}
			},
			async loginAddr(address) {
				window.ethereum.request({
					method: "personal_sign",
					params: ["Welcom To AIS", address],
				}).then((signature) => {
					if (signature) {
						this.$store.commit('setToken', signature);
						localStorage.setItem(address, signature);
						this.address = address;
					}
				}).catch((err) => {
					uni.showToast({
						title: err.message,
						icon: 'none'
					});
				});
			},
			disConnt() {
				this.address = "";
				this.$store.commit('cleanToken', '');
				this.duan = false;
			},
			openDuan() {
				this.duan = !this.duan;
			},
			showDraw() {
				this.$refs.showMenus.open();
			},
			gbMenus() {
				this.$refs.showMenus.close();
			},
			getLang() {
				const language = uni.getStorageSync('lang');
				if (language) {
					if (language == 'en') {
						this.$i18n.locale = 'en';
					} else if (language == 'zh') {
						this.$i18n.locale = 'zh';
					} else {
						this.$i18n.locale = 'zhs';
					}
				} else {
					this.$i18n.locale = 'en';
				}
			},
			openLans() {
				this.showLang = !this.showLang;
			},
			openEcos() {
				this.showEcos = !this.showEcos;
			},
			jtzh() {
				this.$i18n.locale = 'zh';
				uni.setStorageSync('lang', 'zh');
				this.showLang = false;
				this.$refs.showMenus.close();
			},
			ftzh() {
				this.$i18n.locale = 'zhs';
				uni.setStorageSync('lang', 'zhs');
				this.showLang = false;
				this.$refs.showMenus.close();
			},
			ying() {
				this.$i18n.locale = 'en';
				uni.setStorageSync('lang', 'en');
				this.showLang = false;
				this.$refs.showMenus.close();
			},
			//绑定
			async bindUser() {
				if (this.uper) {
					this.bind = 1;
					const accounts = await window.ethereum.request({
						method: 'eth_requestAccounts'
					})
					const address = accounts[0];
					const provider = new ethers.providers.Web3Provider(window.ethereum);
					const signer = provider.getSigner(accounts[0]);
					const abiContract = new ethers.Contract(this.aisContract, aisAbi, signer);
					const that = this;
					try {
						const Tx = await abiContract.bindRelation(that.uper);
						if (Tx.hash) {
							const approveTimer = setInterval(() => {
								that.checkReg();
								if (that.parents) {
									that.bind = 0;
									that.$refs.popup.close();
									uni.showToast({
										title: that.$t("common.txt17"),
										icon: 'success'
									})
									clearInterval(approveTimer)
								}
							}, 1000);
						} else {
							that.bind = 0;
							uni.showToast({
								title: that.$t("common.txt18"),
								icon: 'error'
							})
						}
					} catch (error) {
						console.log('err', error)
						that.bind = 0;
						uni.showToast({
							title: that.$t("common.txt18"),
							icon: 'error'
						})
					}
				} else {
					uni.showToast({
						title: this.$t('common.txt19'),
						icon: 'error'
					})
				}
			},
			homes() {
				uni.navigateTo({
					url: '/pages/index/index'
				})
				this.$refs.showMenus.close();
			},
			nodes() {
				uni.navigateTo({
					url: '/pages/node/node'
				})
				this.$refs.showMenus.close();
			},
			team() {
				uni.navigateTo({
					url: '/pages/team/team'
				})
				this.$refs.showMenus.close();
			},
			machine() {
				uni.navigateTo({
					url: '/pages/machine/machine'
				})
				this.$refs.showMenus.close();
			},
			mine() {
				uni.navigateTo({
					url: '/pages/mine/mine'
				})
				this.$refs.showMenus.close();
			},
			market() {
				uni.navigateTo({
					url: '/pages/market/market'
				})
				this.$refs.showMenus.close();
			},
			pledge() {
				uni.navigateTo({
					url: '/pages/pledge/pledge'
				})
				this.$refs.showMenus.close();
			},
			swap() {

			}
		}
	}
</script>

<style scoped lang="less">
	.header {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		z-index: 99;
		background-color: #000;
	}

	.head {
		padding: 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		max-width: 800rpx;
		margin: 0 auto;
	}

	.rights {
		display: flex;
		align-items: center;
		color: #fff;
	}

	.logo {
		width: 190rpx;
		height: 58rpx;
	}

	.addr {
		margin: 0 20rpx;
		padding: 8rpx 16rpx;
		background-color: #EEA42C;
		border-radius: 10rpx;
	}

	.cdicon {
		width: 50rpx;
		height: 36rpx;
	}

	/deep/.uni-drawer__content {
		background-color: #000 !important;
	}

	/deep/.uni-drawer__mask {
		background: rgba(162, 162, 162, 0.1);
	}

	.menus {
		position: relative;
	}

	.gbs {
		width: 36rpx;
		height: 36rpx;
		position: absolute;
		top: 30rpx;
		right: 30rpx;
	}

	.top {
		padding-top: 30rpx;
		padding-left: 80rpx;
	}

	.logs {
		width: 126rpx;
		height: 154rpx;
	}

	.menu {
		padding-top: 40rpx;
	}

	.men {
		position: relative;
		display: flex;
		align-items: center;
		padding: 30rpx 60rpx 30rpx 80rpx;
	}

	.icon {
		width: 44rpx;
		height: 44rpx;
	}

	.name {
		color: #fff;
		padding-left: 20rpx;
		font-size: 30rpx;
	}

	.address {
		margin-top: 60rpx;
		padding-left: 80rpx;
	}

	.addrs {
		background-color: #EEA42C;
		padding: 20rpx;
		border-radius: 10rpx;
	}

	.discont {
		position: absolute;
		top: 120rpx;
		right: 110rpx;
	}

	.addrd {
		background: rgba(238, 164, 44, 0.5);
		padding: 16rpx 50rpx;
		color: #fff;
		border-radius: 10rpx;
	}

	.mdown {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.mdec {
		display: flex;
		align-items: center;
	}

	.downs {
		width: 28rpx;
		height: 16rpx;
	}

	.lans {
		padding-left: 130rpx;
	}

	.lan {
		display: flex;
		align-items: center;
		padding: 20rpx 0;
	}

	.licon {
		width: 40rpx;
		height: 40rpx;
	}

	.lname {
		padding-left: 20rpx;
	}

	.ecos {
		padding-left: 130rpx;
	}

	.regs {
		background: #010200;
		border-radius: 40rpx;
		border: 1rpx solid #FFFFFF;
		padding: 40rpx;
		width: 500rpx;
	}

	.rtit {
		color: #fff;
		font-size: 38rpx;
		font-family: 'Bold';
		text-align: center;
		line-height: 60rpx;
		padding-bottom: 30rpx;
	}

	.bicon {
		width: 100%;
	}

	.itits {
		padding-top: 30rpx;
		color: #fff;
		font-size: 30rpx;
		padding-left: 10rpx;
	}

	.uper {
		border: 1rpx solid #EEA42C;
		margin: 30rpx 0;
		padding: 30rpx;
		border-radius: 20rpx;
		color: #fff;
		word-break: break-all;
		min-height: 60rpx;
	}

	.oper {
		padding-top: 30rpx;
	}

	.btns {
		background-color: #EEA42C;
		color: #fff;
	}
</style>