<template>
	<view class="container">
		<view class="connect wow fadeInDown">
			<view class="box">
				<view class="rtit">
					{{$t('common.txt23')}}
				</view>
				<image src="../../static/wallet.png" mode="widthFix" class="bicon"></image>
				<view class="itits">
					{{$t('common.txt22')}}
				</view>
				<view class="oper">
					<button class="btns" @click="confirm">{{$t('common.txt15')}}</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import 'wowjs/css/libs/animate.css';
	import WOW from 'wowjs';
	export default {
		data() {
			return {

			}
		},
		mounted() {
			const wow = new WOW.WOW();
			wow.init();
		},
		created() {

		},
		methods: {
			confirm() {
				this.$emit('sure', false)
			}
		}
	}
</script>

<style scoped>
	.connect {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.8);
		z-index: 9;
	}

	.box {
		background: #010200;
		border-radius: 40rpx;
		border: 1rpx solid #FFFFFF;
		padding: 40rpx;
		width: 500rpx;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
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
		font-size: 36rpx;
		text-align: center;
	}

	.oper {
		padding-top: 30rpx;
	}

	.btns {
		background-color: #EEA42C;
		color: #fff;
	}
</style>