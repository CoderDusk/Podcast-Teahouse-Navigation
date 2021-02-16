<template>
	<view>
		<el-form ref="podcastForm" label-width="100px" :rules="validateRules" :model="podcast">
			<el-form-item label="播客名称" prop="name">
				<el-input v-model="podcast.name" placeholder="请输入播客名称"></el-input>
			</el-form-item>
			<el-form-item label="logo" prop="logo">
				<view v-if="podcast.logo !== ''">
					<image style="width: 100px;" mode="widthFix" :src="podcast.logo"></image>
					<br>
				</view>
				<el-button type="success" @click="uploadLogo" size="medium">上传logo</el-button>
			</el-form-item>
			<el-form-item label="播客分类" prop="category">
				<el-select v-model="categoryIndex" placeholder="请选择分类">
					<el-option v-for="item,index in categoryList" :key="item._id" :label="item.name" :value="index">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="主持人" prop="host">
				<el-input v-model="podcast.host" placeholder="请输入主持人"></el-input>
			</el-form-item>
			<el-form-item label="简介" prop="description">
				<el-input v-model="podcast.description" placeholder="请输入简介"></el-input>
			</el-form-item>
			<el-form-item label="RSS 链接" prop="rssLink">
				<el-input v-model="podcast.rssLink" placeholder="请输入RSS链接"></el-input>
			</el-form-item>
			<el-form-item label="小宇宙链接" prop="xiaoyuzhouLink">
				<el-input v-model="podcast.xiaoyuzhouLink" placeholder="请输入小宇宙链接"></el-input>
			</el-form-item>
			<el-form-item label="播客排序" prop="sort">
				<el-input v-model.number="podcast.sort" placeholder="请输入播客排序,数字越大越靠前,仅限输入数字"></el-input>
			</el-form-item>
			<el-form-item label="是否推荐" prop="isRecommended">
				<el-switch v-model="podcast.isRecommended" active-color="#13ce66"> </el-switch>
			</el-form-item>
			<el-form-item style="display: flex;">
				<el-button type="success" @click="submit" size="medium">
					<text v-if="type == 'add'">
						新增播客
					</text>
					<text v-else>
						保存播客
					</text>
				</el-button>
				<el-button @click="cancel" size="medium">取消</el-button>
			</el-form-item>
		</el-form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				type: 'add',
				podcast: {
					logo: '',
					isRecommended: false
				},
				validateRules: {
					name: [{
						required: true,
						message: '请输入播客名称',
						trigger: 'blur'
					}],
					sort: [{
						type: 'number',
						message: '排序必须为数字，数字越大越靠前',
						trigger: 'blur'
					}],
					logo: [{
						required: true,
						message: '请上传logo'
					}],
					host: [{
						required: true,
						message: '请输入主持人'
					}],
					description: [{
						required: true,
						message: '请输入描述'
					}],
					rssLink: [{
						required: true,
						message: '请输入RSS链接'
					}],
				},
				categoryList: [],
				categoryIndex: 0
			}
		},
		onLoad(option) {
			uniCloud.callFunction({
				name: 'getCategoryList',
				data: {
					type: 'podcast'
				}
			}).then(res => {
				this.categoryList = res.result.data
			})

			this.id = option.id
			if (this.id == undefined) {
				this.type = 'add'
			} else {
				this.type = 'edit'
				uniCloud.callFunction({
					name: 'getPodcast',
					data: {
						id: this.id
					}
				}).then(res => {
					let info = res.result.data[0]
					this.podcast = {
						name: info.name,
						logo: info.logo,
						categoryID: info.categoryID,
						categoryName: info.categoryName,
						host: info.host,
						description: info.description,
						rssLink:info.rssLink,
						xiaoyuzhouLink:info.xiaoyuzhouLink,
						sort: info.sort,
						isRecommended: info.isRecommended
					}
				})
			}
		},
		methods: {
			cancel() {
				uni.navigateTo({
					url: 'list'
				})
			},
			submit() {
				if (this.podcast.sort == undefined) {
					this.podcast.sort = 0
				}

				this.podcast.categoryID = this.categoryList[this.categoryIndex]._id
				this.podcast.categoryName = this.categoryList[this.categoryIndex].name
				

				this.$refs.podcastForm.validate(result => {
					if (result) {
						
						if (this.type == 'add') {
							
							uniCloud.callFunction({
								name: 'addPodcast',
								data: {
									name: this.podcast.name,
									logo: this.podcast.logo,
									categoryID: this.podcast.categoryID,
									categoryName: this.podcast.categoryName,
									host: this.podcast.host,
									description: this.podcast.description,
									rssLink:this.podcast.rssLink,
									xiaoyuzhouLink:this.podcast.xiaoyuzhouLink,
									sort: this.podcast.sort,
									isRecommended: this.podcast.isRecommended
								}
							}).then(result => {
								uni.navigateTo({
									url: 'list'
								})
							})
						} else {
							
							uniCloud.callFunction({
								name: 'updatePodcast',
								data: {
									id: this.id,
									name: this.podcast.name,
									logo: this.podcast.logo,
									categoryID: this.podcast.categoryID,
									categoryName: this.podcast.categoryName,
									host: this.podcast.host,
									description: this.podcast.description,
									rssLink:this.podcast.rssLink,
									xiaoyuzhouLink:this.podcast.xiaoyuzhouLink,
									sort: this.podcast.sort,
									isRecommended: this.podcast.isRecommended
								}
							}).then(result => {
								uni.navigateTo({
									url: 'list'
								})
							})
						}


					} else {
						this.$message.error('验证失败，请重新检查表单项 或 稍后尝试提交')
					}
				})
			},
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
								that2.podcast.logo = res.fileID
							},
							fail(err) {
								console.log(err)
							}
						})
					}
				})



			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		padding: 30px;
	}
</style>
