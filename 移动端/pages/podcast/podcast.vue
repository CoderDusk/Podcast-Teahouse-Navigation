<template>
	<view>
		<view class="logoArea">
			<image :src="podcastInfo.logo" mode="widthFix" class="podcastLogo"></image>
			<u-button shape="circle" class="button" :class="{cancelAddingButton:isInExportList}" @click="addToExportList">
				<text v-if="isInExportList">
					已在导出列表中
				</text>
				<text v-else>
					添加到导出列表
				</text>
			</u-button>
		</view>
		<view class="title">
			{{podcastInfo.name}}
		</view>
		<view class="info">
			<view class="infoBox">
				<u-icon name="mic" color="gray" size="48"></u-icon>
				<text class="infoText">{{podcastInfo.host}}</text>
			</view>
			<view class="infoBox">
				<u-icon name="file-text" color="gray" size="48"></u-icon>
				<text class="infoText">{{podcastInfo.description}}</text>
			</view>
		</view>
		<view class="app">
			<a :href="`podcast://${podcastInfo.rssLink}`">
				<u-icon class="appLogo" name="../../static/apple-podcast.svg" size="90"></u-icon>
			</a>
			<a :href="`pktc://subscribe/${podcastInfo.rssLink}`">
				<u-icon class="appLogo" name="../../static/pocket-cast.png" size="90"></u-icon>
			</a>
			<a :href="`moonfm://subscribe?url=${podcastInfo.rssLink}`">
				<u-icon class="appLogo" name="../../static/moonfm.png" size="90"></u-icon>
			</a>
			<a :href="podcastInfo.xiaoyuzhouLink" v-if="podcastInfo.xiaoyuzhouLink">
				<u-icon class="appLogo" name="../../static/xiaoyuzhou.png" size="90"></u-icon>
			</a>			
		</view>
		<pageFooter></pageFooter>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				podcastInfo:{
					logo:''
				},
				isInExportList:false
			}
		},
		methods: {
			addToExportList(){
				if(this.isInExportList){
					let exportList =  uni.getStorageSync('exportList')
					let index = exportList.indexOf(this.podcastInfo._id)
					exportList.splice(index,1)
					uni.setStorageSync('exportList', exportList);
					this.isInExportList = false
				}else{
					let exportList =  uni.getStorageSync('exportList')
					if(exportList == ''){
						exportList = []
					}
					exportList.push(this.podcastInfo._id)
					exportList =  Array.from(new Set(exportList))
					uni.setStorageSync('exportList', exportList);
					this.isInExportList = true
				}
			}
		},
		onLoad(options){
			if(options.id == undefined){
				uni.navigateTo({
					url:'../index/index'
				})
			}
			uniCloud.callFunction({
				name:'getPodcast',
				data:{
					id:options.id
				}
			}).then(res=>{
				this.podcastInfo = res.result.data[0]
			})
			let exportList =  uni.getStorageSync('exportList')
			if(exportList.indexOf(options.id) !== -1){
				this.isInExportList = true
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		padding: 40rpx;
	}

	.logoArea {
		display: flex;
		padding-right: 0;

		.podcastLogo {
			width: 250rpx;
			border-radius: 7px;
		}

		.button {
			align-self: flex-end;
			background-color: $tea-color;
			color: white;
		}
		
		.cancelAddingButton{
			background-color: #F4F4F5;
			color: black;
		}
	}
	
	.title {
		margin-top: 30rpx;
		font-size: 50rpx;
		font-weight: bold;
	}

	.info {
		border: 1px solid gray;
		border-radius: 5px;
		margin-top: 20rpx;
		font-size: 35rpx;
		padding: 20rpx;
		

		.infoBox {
			display: flex;
			padding-bottom: 10px;
			.u-icon{
				align-self: flex-start;
			}
			text{
				padding-left: 20rpx;
			}
		}
	}
	
	.latestEpisodes{
		.episode{
			display: flex;
			justify-content: space-around;
			align-items: center;
			border-top: 1px solid gray;
			margin-top: 20rpx;
			
			.episodeInfo{
				.updateTime{
					color: gray;
				}
				.episodeTitle{
					font-size: 35rpx;
					width: 550rpx;
				}
				.duration{
					color: gray;
				}
			}
			.playButton{
				border: 2px solid $tea-color;
				border-radius: 50%;
				width: 70rpx;
				height: 70rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				color: $tea-color;
			}
		}
	}
	
	.app{
		display: flex;
		justify-content: space-around;
		margin-top: 50rpx;
		
		.appLogo{
			border-radius: 50%;
		}
	}
</style>
