<template>
	<view>
		<navigator url="edit">
			<el-button type="success" size="mini">新增分类</el-button>
		</navigator>
		<el-table :data="categoryList">
			<el-table-column prop="name" label="分类名称"></el-table-column>
			<el-table-column prop="sort" label="分类排序"></el-table-column>
			<el-table-column prop="type" label="分类类型"></el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button @click="editCategory(scope.row._id)" type="success" size="small">编辑</el-button>
					<el-button @click="deleteCategory(scope.row._id)" type="danger" size="small">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				categoryList: null,
			}
		},
		methods: {
			editCategory(id){
				uni.navigateTo({
					url:'edit?id='+id
				})
			},
			deleteCategory(id){
				this.$confirm('此操作将永久删除, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					uniCloud.callFunction({
						name:"deleteCategory",
						data:{
							id:id
						}
					}).then(result=>{
						this.getCategoryList()
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				})
				
				
			},
			getCategoryList(){
				uniCloud.callFunction({
					name: "getCategoryList",
					data:{
						type:'all'
					}
				}).then(res => {
					this.categoryList = res.result.data
				})
			}
		},
		onLoad() {
			this.getCategoryList()
		}
	}
</script>

<style lang="scss" scoped>
	page {
		padding: 30px;
	}
</style>
