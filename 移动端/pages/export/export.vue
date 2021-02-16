<template>
	<view>
		<view v-for="podcast in podcastList" :key="podcast._id">
			<view class="podcast">
				<view class="content" @click="gotoPodcastPage()">
					<view class="logo">
						<image :src="podcast.logo" mode="widthFix"></image>
					</view>
					<view class="info">
						<view class="title">
							{{podcast.name}}
						</view>
						<view class="description">
							{{podcast.description}}
						</view>
					</view>
				</view>
				<view class="deleteButton" @click="removeFromExportList(podcast.id)">
					<u-icon name="close-circle" color="red" size="64" style="margin-left: 10rpx;"></u-icon>
				</view>
			</view>
		</view>
	
		<u-button type="success" class="exportButton" plain shape="circle" @click="exportOPMLFile">导出OPML文件</u-button>
		
		<pageFooter></pageFooter>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				podcastList:[],
				exportList:[]
			};
		},
		onShow() {
			this.exportList= uni.getStorageSync('exportList')
			if(this.exportList == ''){
				this.exportList = []
			}
			this.updatePodcastList()
			
			
		},
		methods:{
			removeFromExportList(id) {
				let index = this.exportList.indexOf(id)
				this.exportList.splice(index,1)
				uni.setStorageSync('exportList', this.exportList)
				this.updatePodcastList()
			},
			updatePodcastList(){
				this.podcastList = []
				this.exportList.forEach(id=>{
					uniCloud.callFunction({
						name:'getPodcast',
						data:{
							id:id
						}
					}).then(res=>{
						let podcast = res.result.data[0]
						this.podcastList.push({
							id:podcast._id,
							logo:podcast.logo,
							name:podcast.name,
							description:podcast.description,
							rssLink:podcast.rssLink
						})
					})
				})
			},
			exportOPMLFile(){
				let fileContent = `<?xml version="1.0" encoding="utf-8"?><opml version="2.0"><head><title>播客茶馆导出的OPML</title></head><body>`
				this.podcastList.forEach(podcast=>{
					fileContent += `<outline title="${podcast.name}" text="${podcast.description}" xmlUrl="${podcast.rssLink}" type="rss"/>`
				})
				fileContent += `</body></opml>`
				let downLoadLink = document.createElement('a')
				downLoadLink.setAttribute('href','data:text/plain;charset=utf-8,'+fileContent)
				let date = new Date().getTime()
				downLoadLink.setAttribute('download','bokechaguan_export_opml_'+date+".xml")
				downLoadLink.style.display = "none"
				document.body.appendChild(downLoadLink)
				downLoadLink.click()
				document.body.removeChild(downLoadLink)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.podcast {
		display: flex;
		justify-content: space-between;
		padding-top: 30rpx;
	
		.content{
			display: flex;
			.logo {
				padding: 0 30rpx;
				image {
					width: 150rpx;
					border-radius: 7px;
				}
			}
			.info{
				.title{
					font-size: 40rpx;
				}
				.description{
					padding-top: 10rpx;
					font-size: 30rpx;
					
					overflow: hidden;
					display: -webkit-box; //将元素设为盒子伸缩模型显示
					-webkit-box-orient: vertical; //伸缩方向设为垂直方向
					-webkit-line-clamp: 3; //超出3行隐藏，并显示省略号
				}
			}
		}
		
		.deleteButton{
			align-self: center;
			margin-right: 30rpx;
			justify-self: end;
		}
	}
	
	.exportButton{
		width: 500rpx;
		margin-top: 100rpx;
	}
</style>
