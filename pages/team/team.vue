<template>
	<view class="container">
		<Menu></Menu>
		<view class="main">
			<view class="team wow fadeInDown">
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
				<view class="tbody" v-if="teamList.length > 0">
					<view class="tr" v-for="(item,index) in teamList" :key="index">
						<view class="td">
							{{item.address | addrFilter}}
						</view>
						<view class="td">
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
				teamList: []
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
					this.getTeams()
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
			const token = this.$store.state.token;
			if (token) {
				this.getTeams()
			} else {
				uni.showToast({
					title: this.$t('common.txt22'),
					icon: 'error'
				})
			}
		},
		methods: {
			async getTeams() {
				// const accounts = await window.ethereum.request({
				// 	method: 'eth_requestAccounts'
				// })
				// const data = {
				// 	address: accounts[0]
				// }
				// this.$apiFun.getDirectInfo(data).then(res => {
				// 	if (res.code == 200) {
				// 		this.teamList = res.data;
				// 	}
				// });
			},
		}
	}
</script>

<style scoped>
	.main {
		padding: 150rpx 30rpx 30rpx 30rpx;
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
		width: 40%;
		text-align: center;
	}
	
	.td {
		width: 33.3%;
		text-align: center;
	}
</style>