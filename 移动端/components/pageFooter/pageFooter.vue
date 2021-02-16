<template>
	<view class="footer">
		<view class="copyright">
			Made by CoderDusk with ❤️
		</view>
		<view class="links">
			<!-- <u-link href="http://www.uviewui.com" class="link" color="#86C166" font-size="35">开源地址</u-link>
			<u-link href="http://www.uviewui.com" class="link" color="#86C166" font-size="35">提交反馈</u-link>
			<u-link href="http://www.uviewui.com" class="link" color="#86C166" font-size="35">雇用我</u-link> -->
			<text class="link">开源地址</text>
			<text class="link" @click="showHireMe = true">雇佣我</text>
			<text class="link" @click="showSubmitMethod = true">提交反馈、播客</text>
		</view>
		<u-popup v-model="showHireMe" mode="center">
			<view class="hireMe">
				<view>我现在正在寻找一份远程前端工作，全职、兼职、项目外包皆可。</view>
				<view>如果您有工作机会可以提供，欢迎通过邮箱(coderdusk@qq.com)或微信（hellodusk）联系我。</view>
			</view>
		</u-popup>
		<u-popup v-model="showSubmitMethod" mode="center" width="100%">
			<pre class="submitMethod">{{submitMethod}}</pre>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showHireMe:false,
				showSubmitMethod:false,
				submitMethod:''
			};
		},
		created() {
			uniCloud.callFunction({
				name:'getSetting'
			}).then(res=>{
				this.submitMethod = res.result.data[0].submitMethod
			})
		}
	}
</script>

<style lang="scss" scoped>
	.footer{
		// background-color: pink;
		display: flex;
		flex-direction: column;
		align-items: center;

		
		// font-size: 35rpx;
		
		padding: 20px 0;
		
		.links {
			padding-top: 12rpx;
			.link{
				color: $tea-color;
				text-decoration:none;
				padding: 0 15rpx;
				font-size: 35rpx;
			}
		}
	};
	
	.popupCenter{
		text-align: center;
		padding-top: 10px;
	}
	
	.submitMethod{
		padding: 20rpx;
		// flex-wrap:wrap;
		// width: 100%;
		font-size: 35rpx;
		font-weight: bold;
		
		white-space: pre-wrap;
		// word-wrap: break-word;
	}
	
	.hireMe{
		padding: 30rpx;
		font-size:40rpx;
		view{
			padding: 20rpx;
		}
	}
</style>
