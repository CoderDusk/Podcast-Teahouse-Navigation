<template>
	<view>
		<el-form ref="linkForm" label-width="80px" :rules="validateRules" :model="link">
			<el-form-item label="链接名称" prop="name">
				<el-input v-model="link.name" placeholder="请输入链接名称"></el-input>
			</el-form-item>
			<el-form-item label="logo" prop="logo">
				<view v-if="link.logo !== ''">
					<image style="width: 100px;" mode="widthFix" :src="link.logo"></image>
					<br>
				</view>
				<el-button type="success" @click="uploadLogo" size="medium">上传logo</el-button>
			</el-form-item>
			<el-form-item label="链接分类" prop="category">
				<el-select v-model="categoryIndex" placeholder="请选择分类">
					<el-option v-for="item,index in categoryList" :key="index" :label="item.name" :value="index">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="简介" prop="description">
				<el-input v-model="link.description" placeholder="请输入简介"></el-input>
			</el-form-item>
			<el-form-item label="链接" prop="link">
				<el-input v-model="link.link" placeholder="请输入链接"></el-input>
			</el-form-item>
			<el-form-item label="分类排序" prop="sort">
				<el-input v-model.number="link.sort" placeholder="请输入分类排序,数字越大越靠前,仅限输入数字"></el-input>
			</el-form-item>
			<el-form-item style="display: flex;">
				<el-button type="success" @click="submit" size="medium">
					<text v-if="type == 'add'">
						新增链接
					</text>
					<text v-else>
						保存链接
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
				link: {
					logo:''
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
					description: [{
						required: true,
						message: '请输入描述'
					}],
					link: [{
						required: true,
						message: '请输入链接'
					}],
				},
				categoryList: [],
				categoryIndex:0
			}
		},
		onLoad(option) {
			uniCloud.callFunction({
				name: 'getCategoryList',
				data: {
					type: 'link'
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
					name: 'getLink',
					data: {
						id: this.id
					}
				}).then(res => {
					let info = res.result.data[0]
					this.link = {
						name:info.name,
						logo:info.logo,
						categoryID:info.categoryID,
						categoryName:info.categoryName,
						description:info.description,
						link:info.link,
						sort:info.sort
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
				if (this.link.sort == undefined) {
					this.link.sort = 0
				}
				
				this.link.categoryID = this.categoryList[this.categoryIndex]._id
				this.link.categoryName = this.categoryList[this.categoryIndex].name

				this.$refs.linkForm.validate(result => {
					if (result) {
						if (this.type == 'add') {
							uniCloud.callFunction({
								name: 'addlink',
								data: {
									name: this.link.name,
									logo: this.link.logo,
									categoryID: this.link.categoryID,
									categoryName: this.link.categoryName,
									description: this.link.description,
									link: this.link.link,
									sort: this.link.sort
								}
							}).then(result => {
								uni.navigateTo({
									url:'list'
								})
							})
						} else {
							uniCloud.callFunction({
								name: 'updateLink',
								data: {
									id:this.id,
									name:this.link.name,
									logo:this.link.logo,
									categoryID:this.link.categoryID,
									categoryName:this.link.categoryName,
									description:this.link.description,
									link:this.link.link,
									sort:this.link.sort
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
								that2.link.logo = res.fileID
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
