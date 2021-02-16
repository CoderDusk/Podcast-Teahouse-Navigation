<template>
	<view>
		<view class="logo">
			<image :src="link.logo" mode="widthFix"></image>
		</view>
		<view class="info">
			<view class="infoBox">
				<u-icon name="bookmark" color="gray" size="48"></u-icon>
				<text class="infoText">{{link.name}}</text>
			</view>
			<view class="infoBox">
				<u-icon name="info-circle" color="gray" size="48"></u-icon>
				<text class="infoText">{{link.description}}</text>
			</view>
		</view>
		<view  class="gotoLinkPageButton">
			<a :href="link.link">
				<u-button type="success" shape="circle" size="medium" class="btn" plain>前往页面</u-button>
			</a>
		</view>
		<pageFooter></pageFooter>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				link:{}
			};
		},
		onLoad(options) {
			uniCloud.callFunction({
				name:'getLink',
				data:{
					id:options.id
				}
			}).then(res=>{
				this.link = res.result.data[0]
			})
		}
	}
</script>

<style lang="scss" scoped>
	page {
		padding: 30rpx;
	}

	.logo {
		display: flex;
		justify-content: center;
		padding-top: 20px;
		image{
			width: 250rpx;
		}
	}

	.info {
		border: 1px solid gray;
		border-radius: 5px;
		margin-top: 30px;
		font-size: 35rpx;
		padding: 20rpx;

		.infoBox {
			display: flex;
			align-items: center;
			margin: 5px 0;

			text {
				padding-left: 20rpx;
			}
		}
	}
	.gotoLinkPageButton{
		padding-top: 30px;
		text-align: center;
		a{
			text-decoration: none;
			.btn{
				font-size: 40rpx;
				font-weight: 600;
			}
		}
	}
</style>
