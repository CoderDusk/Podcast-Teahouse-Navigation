<template>
	<view>
		<el-form ref="categoryForm" label-width="80px" :rules="validateRules" :model="categoryForm">
			<el-form-item label="分类名称" prop="name">
				<el-input v-model="categoryForm.name" placeholder="请输入分类名称"></el-input>
			</el-form-item>
			<el-form-item label="分类排序" prop="sort">
				<el-input v-model.number="categoryForm.sort" placeholder="请输入分类排序,仅限输入数字"></el-input>
			</el-form-item>
			<el-form-item label="分类类型" prop="type">
				<el-radio v-model="categoryForm.type" label="podcast">播客</el-radio>
				<el-radio v-model="categoryForm.type" label="link">链接</el-radio>
			</el-form-item>
			<el-form-item style="display: flex;">
				<el-button type="success" @click="submit" size="medium">
					<text v-if="type == 'add'">
						新增分类
					</text>
					<text v-else>
						保存分类
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
				name: '',
				sort: '',
				ctype: '',
				categoryForm:{},
				validateRules: {
					name: [{
						required: true,
						message: '请输入分类名称',
						trigger: 'blur'
					}],
					sort: [{
						type: 'number',
						message: '请输入分类排序',
						trigger: 'blur'
					}],
					type: [{
						required: true,
						message: '请选择分类类型'
					}]
				}
			}
		},
		onLoad(option) {
			this.id = option.id
			if (this.id == undefined) {
				this.type = 'add'
			} else {
				this.type = 'edit'
				uniCloud.callFunction({
					name: 'getCategory',
					data: {
						id: this.id
					}
				}).then(res => {
					let info = res.result.data[0]
					// this.name = info.name
					// this.sort = info.sort
					// this.ctype = info.type
					this.categoryForm = {
						name:info.name,
						sort:info.sort,
						type:info.type
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
			submit(){
				if(this.categoryForm.sort == undefined){
					this.categoryForm.sort = 0
				}
				
				this.$refs.categoryForm.validate(result=>{
					if(result){
						if(this.type == 'add'){
							uniCloud.callFunction({
								name:'addCategory',
								data:{
									name:this.categoryForm.name,
									sort:this.categoryForm.sort,
									type:this.categoryForm.type
								}
							}).then(result=>{
								uni.navigateTo({
									url:'list'
								})
							})
						}else{
							uniCloud.callFunction({
								name:'updateCategory',
								data:{
									id:this.id,
									name:this.categoryForm.name,
									sort:this.categoryForm.sort,
									type:this.categoryForm.type
								}
							}).then(result=>{
								uni.navigateTo({
									url:'list'
								})
							})
						}
					}else{
						this.$message.error('验证失败，请重新检查表单项 或 稍后尝试提交')
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
	
	.form-row {
		// background-color: pink;
		display: flex;
		align-items: center;
	
		.form-name {}
	
		.form-value {
			padding-left: 30px;
		}
	}
</style>