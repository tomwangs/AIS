<template>
	<view class="container">
		<Menu></Menu>
		<view class="main">
			<view class="banner">
				<image src="../../static/banner.png" mode="widthFix" class="bicon wow slideInRight"></image>
				<view class="infos wow slideInLeft">
					<view class="title">
						AIS
					</view>
					<view class="decs">
						{{$t('index.txt1')}}
					</view>
				</view>
			</view>
			<view class="cards wow flipInX">
				<view class="items">
					<view class="item">
						<view class="itit">
							{{$t('index.txt2')}}
						</view>
						<view class="inum">
							{{allPower | cutOutNums}}
						</view>
					</view>
					<view class="item">
						<view class="itit">
							{{$t('index.txt3')}}
						</view>
						<view class="inum">
							{{allNums}}
						</view>
					</view>
					<view class="item">
						<view class="itit">
							{{$t('index.txt4')}}
						</view>
						<view class="inum">
							0.00
						</view>
					</view>
				</view>
				<view class="items center">
					<view class="item">
						<view class="itit">
							{{$t('index.txt5')}}
						</view>
						<view class="inum">
							{{hnums}}
						</view>
					</view>
					<view class="item">
						<view class="itit">
							{{$t('index.txt6')}}
						</view>
						<view class="inum">
							{{mnums}}
						</view>
					</view>
					<view class="item">
						<view class="itit">
							{{$t('index.txt7')}}
						</view>
						<view class="inum">
							{{tnums}}
						</view>
					</view>
				</view>
				<view class="items">
					<view class="item">
						<view class="itit">
							{{$t('index.txt8')}}
						</view>
						<view class="inum">
							0.00
						</view>
					</view>
					<view class="item">
						<view class="itit">
							{{$t('index.txt9')}}
						</view>
						<view class="inum">
							0.00
						</view>
					</view>
					<view class="item">
						<view class="itit">
							{{$t('index.txt10')}}
						</view>
						<view class="inum">
							0.00
						</view>
					</view>
				</view>
			</view>
			<view class="kline wow fadeInDown">
				<view class="ktop">
					<image src="../../static/logo.png" class="kicon"></image>
					<view class="oths">
						<view class="oth">
							{{$t('index.txt11')}}: $0.00
						</view>
						<view class="oth">
							{{$t('index.txt12')}}: +0.00%
						</view>
					</view>
				</view>
				<view class="lines">
					<view class="kprice">
						<view class="kdate">
							{{$t('index.txt13')}}: 2024/{{currDate}}
						</view>
						<view class="curr">
							$ {{topPrice}}
						</view>
					</view>
					<view class="klines">
						<qiun-data-charts type="area" :opts="opts" :chartData="chartData" />
					</view>
				</view>
			</view>
			<view class="advans wow fadeInUp">
				<view class="atit">
					{{$t('index.txt14')}}
				</view>
				<view class="advs">
					<view class="adtit">
						{{$t('index.txt15')}}
					</view>
					<view class="ads">
						<view class="ad">
							<image src="../../static/p1.png" mode="widthFix" class="aicon"></image>
							<view class="adec">
								{{$t('index.txt16')}} <br>
								{{$t('index.txt17')}}
							</view>
						</view>
						<view class="ad">
							<image src="../../static/p2.png" mode="widthFix" class="aicon"></image>
							<view class="adec">
								{{$t('index.txt18')}} <br>
								{{$t('index.txt17')}}
							</view>
						</view>
					</view>
				</view>
				<view class="advs">
					<view class="adtit">
						{{$t('index.txt19')}}
					</view>
					<view class="ads">
						<view class="ad">
							<image src="../../static/p3.png" mode="widthFix" class="aicon"></image>
							<view class="adec">
								{{$t('index.txt20')}}
							</view>
						</view>
						<view class="ad">
							<image src="../../static/p4.png" mode="widthFix" class="aicon"></image>
							<view class="adec">
								{{$t('index.txt21')}}
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="advans wow fadeInDown">
				<view class="atit">
					{{$t('index.txt22')}}
				</view>
				<view class="tokens">
					<view class="t1">
						{{$t('index.txt23')}} <br>
						{{$t('index.txt24')}}：<br>
						{{$t('index.txt25')}}
					</view>
					<view class="t2">
						{{$t('index.txt26')}}：
					</view>
					<view class="t3">
						<view class="td">
							<view class="txt">
								{{$t('index.txt27')}}：
							</view>
							<view class="tnums">
								360000
							</view>
						</view>
						<view class="td">
							<view class="txt">
								{{$t('index.txt28')}}：
							</view>
							<view class="tnums">
								5000
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="advans wow flipInX">
				<view class="atit">
					{{$t('index.txt29')}}
				</view>
				<view class="hbs">
					<view class="hb">
						<image src="../../static/par1.png" mode="widthFix" class="pa1"></image>
					</view>
					<view class="hb">
						<image src="../../static/par2.png" mode="widthFix" class="pa2"></image>
					</view>
					<view class="hb">
						<image src="../../static/par3.png" mode="widthFix" class="pa3"></image>
					</view>
					<view class="hb">
						<image src="../../static/par4.png" mode="widthFix" class="pa4"></image>
					</view>
					<view class="hb">
						<image src="../../static/par5.png" mode="widthFix" class="pa5"></image>
					</view>
					<view class="hb">
						<image src="../../static/par6.png" mode="widthFix" class="pa6"></image>
					</view>
				</view>
			</view>
			<view class="advans wow fadeInDown">
				<view class="atit">
					{{$t('index.txt30')}}
				</view>
				<view class="medis">
					<view class="medi" @click="Twitter">
						<image src="../../static/med1.png" class="meicon"></image>
						<view class="mname">
							Twitter
						</view>
					</view>
					<view class="medi" @click="Telegram">
						<image src="../../static/med2.png" class="meicon"></image>
						<view class="mname">
							Telegram
						</view>
					</view>
					<view class="medi" @click="Discord">
						<image src="../../static/med3.png" class="meicon"></image>
						<view class="mname">
							Discord
						</view>
					</view>
				</view>
			</view>
			<view class="foot wow fadeInUp">
				©️2024 ais，All Rights Resved.
			</view>
		</view>
	</view>
</template>

<script>
	import {
		cutOutNum
	} from '@/plugins/decimals';
	import {
		ethers
	} from 'ethers';
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
				aisContract: "0x263ab84638cc7fabdbC2c9bB598a20Ecc7d22bfE",
				allPower: 0,
				allNums: 0,
				hnums: 0,
				mnums: 0,
				tnums: 0,
				currDate: '',
				topPrice: '',
				chartData: [{
						id: 0,
						date: '07/03',
						price: '0.00'
					},
					{
						id: 1,
						date: '07/04',
						price: '0.01'
					},
					{
						id: 2,
						date: '07/05',
						price: '0.02'
					},
					{
						id: 3,
						date: '07/06',
						price: '0.01'
					},
					{
						id: 4,
						date: '07/07',
						price: '0.02'
					}
				],
				opts: {
					timing: "easeOut",
					duration: 1000,
					rotate: false,
					rotateLock: false,
					color: ["#05ECE0"],
					padding: [10, 20, 20, 0],
					fontSize: 12,
					fontColor: "#fff",
					dataLabel: false,
					dataPointShape: true,
					dataPointShapeType: false,
					touchMoveLimit: 60,
					enableScroll: false,
					enableMarkLine: false,
					legend: {
						show: false
					},
					xAxis: {
						type: 'categorical',
						disabled: true,
						axisLineColor: '#423D3F'
					},
					yAxis: {
						type: 'value',
						yAxisLabel: true,
						showTitle: false,
						disabled: true,
						disableGrid: false,
						splitNumber: 3,
						gridType: 'solid',
						gridColor: '#423D3F',
						dashLength: 1,
						data: [{
							min: '',
							max: '',
							tofix: 1
						}]
					},
					extra: {
						area: {
							type: "curve",
							width: 2,
							activeType: "hollow",
							gradient: true
						}
					}
				}
			}
		},
		mounted() {
			const wow = new WOW.WOW();
			wow.init();
		},
		filters: {
			cutOutNums(num) {
				if (num) {
					return cutOutNum(num, 2)
				} else {
					return '0.00'
				}
			}
		},
		onShow() {
			this.getServerData(this.chartData);
			this.getDatas()
		},
		methods: {
			getDatas() {
				this.$apiFun.getDashboardDatas().then(res => {
					if (res.code == 200) {
						this.allPower = res.data.sumShares;
						this.allNums = res.data.memberCount;
						this.hnums = res.data.miningCount[0].total;
						this.mnums = res.data.miningCount[1].total;
						this.tnums = res.data.miningCount[2].total;
					}
				});
			},
			async getServerData(chartDatas) {
				const topPrice = parseFloat(chartDatas[4].price);
				this.topPrice = topPrice;
				const lowPrice = parseFloat(chartDatas[0].price);
				this.opts.yAxis.data[0].max = parseFloat(topPrice);
				this.opts.yAxis.data[0].min = parseFloat(lowPrice);
				this.currDate = chartDatas[4].date;
				var data = await Promise.all(chartDatas.map(item => {
					return item.price;
				}));
				var date = await Promise.all(chartDatas.map(item => {
					return item.date;
				}));
				let res = {
					categories: date,
					series: [{
						name: 'value',
						data: data,
						lineType: 'solid',
					}]
				};
				this.chartData = JSON.parse(JSON.stringify(res));
			},
			Twitter() {
				window.open('', '_blank')
			},
			Telegram() {
				window.open('https://t.me/AISCM', '_blank')
			},
			Discord() {
				window.open('', '_blank')
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
		top: 40rpx;
		left: 40rpx;
	}

	.title {
		color: #FDB41A;
		font-size: 60rpx;
		font-weight: bolder;
		letter-spacing: 6rpx;
		font-family: 'ZenDots';
	}

	.decs {
		padding-top: 30rpx;
		color: #fff;
		width: 55%;
		line-height: 46rpx;
	}

	.cards {
		padding: 30rpx;
		border: 1rpx solid #EEA42C;
		border-radius: 20rpx;
		margin-top: 30rpx;
	}

	.items {
		display: flex;
		align-items: center;
	}

	.item {
		text-align: center;
		width: 33.3%;
	}

	.itit {
		color: #D2D2D2;
	}

	.inum {
		color: #FDB41A;
		padding-top: 10rpx;
		font-size: 32rpx;
	}

	.center {
		padding: 30rpx 0;
	}

	.kline {
		border: 1rpx solid #EEA42C;
		border-radius: 20rpx;
		margin-top: 30rpx;
	}

	.ktop {
		padding: 20rpx 30rpx;
		border-bottom: 1rpx solid #EEA42C;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.kicon {
		width: 186rpx;
		height: 54rpx;
	}

	.oths {
		display: flex;
		align-items: center;
		color: #fff;
	}

	.oth:last-child {
		padding-left: 30rpx;
	}

	.lines {
		padding: 30rpx;
	}

	.kprice {
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #fff;
	}

	.advans {
		margin-top: 100rpx;
	}

	.atit {
		text-align: center;
		color: #fff;
		font-size: 38rpx;
		font-weight: bold;
	}

	.ads {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.ad {
		width: 48%;
	}

	.aicon {
		width: 100%;
	}

	.adtit {
		color: #EEA42C;
		padding-top: 50rpx;
		padding-bottom: 30rpx;
		padding-left: 10rpx;
		font-size: 32rpx;
	}

	.adec {
		color: #fff;
		line-height: 50rpx;
		padding-left: 10rpx;
	}

	.tokens {
		padding-top: 30rpx;
	}

	.t1 {
		color: #fff;
		line-height: 50rpx;
	}

	.t2 {
		padding-top: 30rpx;
		padding-bottom: 20rpx;
		color: #fff;
		line-height: 50rpx;
	}

	.t3 {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.td {
		display: flex;
		align-items: center;
		width: 50%;
	}

	.txt {
		color: #fff;
	}

	.tnums {
		color: #EEA42C;
		font-size: 38rpx;
		font-weight: bold;
	}

	.hbs {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		justify-content: space-between;
		margin-top: 40rpx;
	}

	.hb {
		width: 30%;
		border: 1rpx solid #EEA42C;
		border-radius: 30rpx;
		padding: 10rpx 0;
		margin: 16rpx 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.pa1 {
		width: 100rpx;
	}

	.pa2 {
		width: 146rpx;
	}

	.pa3 {
		width: 136rpx;
	}

	.pa4 {
		width: 200rpx;
	}

	.pa5 {
		width: 160rpx;
	}

	.pa6 {
		width: 104rpx;
	}

	.medis {
		display: flex;
		align-items: center;
		padding: 60rpx 0;
		justify-content: center;
	}

	.medi {
		display: flex;
		align-items: center;
		margin: 0 20rpx;
	}

	.meicon {
		width: 40rpx;
		height: 40rpx;
	}

	.mname {
		padding-left: 20rpx;
		color: #fff;
		font-size: 30rpx;
	}

	.foot {
		text-align: center;
		color: #fff;
		font-size: 26rpx;
		padding-top: 30rpx;
	}

	.curr {
		padding-right: 60rpx;
	}

	.klines {
		height: 340rpx;
	}
</style>