<template>
	<view>
		<!-- 		<view class="setting-row">
			<view class="setting-name">
				Logo 图片
			</view>
			<view class="setting-value">
				<image :src="setting.logo" mode="widthFix" class="preview-logo"></image>
				<br>
				<el-button type="success" round plain @click="uploadLogo">上传图片</el-button>
			</view>
		</view>

		<el-button type="success" round @click="updateSetting">保存设置</el-button> -->

		<el-form ref="settingForm" label-width="80px" :model="setting">
			<el-form-item label="logo" prop="logo">
				<view v-if="setting.logo !== ''">
					<image style="width: 100px;" mode="widthFix" :src="setting.logo"></image>
					<br>
				</view>
				<el-button type="primary" @click="uploadLogo" size="mini">上传logo</el-button>
				<el-button type="danger" @click="deleteLogo" size="mini">删除logo</el-button>
			</el-form-item>
			<el-form-item label="提交方式" prop="submitMethod">
				<el-input v-model.trim="setting.submitMethod" placeholder="请输入用户提交反馈/播客/链接的方式" type="textarea" :rows="4"></el-input>
			</el-form-item>
			<el-form-item style="display: flex;">
				<el-button type="success" @click="updateSetting" size="medium">保存设置</el-button>
				<el-button @click="cancel" size="medium">取消</el-button>
			</el-form-item>
		</el-form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				setting: {
					logo: '',
					submitMethod:''
				}
			}
		},
		methods: {
			uploadLogo() {
				let that = this
				uni.chooseImage({
					count: 1,
					success(res) {
						let filePath = res.tempFilePaths[0]
						let fileName = res.tempFiles[0].name
						let that2 = that
						uniCloud.uploadFile({
							filePath: filePath,
							cloudPath: fileName,
							success(res) {
								that2.setting.logo = res.fileID
							},
							fail(err) {
								console.log(err)
							}
						})
					}
				})
			},
			updateSetting() {
				uniCloud.callFunction({
					name: 'updateSetting',
					data: {
						logo: this.setting.logo,
						submitMethod:this.setting.submitMethod
					}
				}).then(res => {
					uni.navigateTo({
						url: 'category/list'
					})
				})
			},
			deleteLogo() {
				this.setting.logo = ''
				uni.navigateTo({
					url: 'category/list'
				})
			}
		},
		onLoad() {
			uniCloud.callFunction({
				name: 'getSetting'
			}).then(res => {
				this.setting = res.result.data[0]
			})
		}
	}
</script>

<style lang="scss" scoped>
	page {
		padding: 30px;
	}

	.setting-row {
		// background-color: pink;
		display: flex;
		align-items: center;

		.setting-name {}

		.setting-value {
			padding-left: 30px;
		}
	}

	.preview-logo {
		width: 100px;
		padding-bottom: 10px;
		// background-color:pink;
	}
</style>
