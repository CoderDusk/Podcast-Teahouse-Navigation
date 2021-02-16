<template>
	<view>
		<navigator url="edit">
			<el-button type="success" size="medium">新增播客</el-button>
		</navigator>
		<el-table :data="linkList.slice((currentPage-1)*pageSize,currentPage*pageSize)">
			<el-table-column prop="name" label="链接名称"></el-table-column>
			<el-table-column prop="categoryName" label="链接分类" :filters="categoryFilter" :filter-method="categoryFilterHandler"></el-table-column>
			<el-table-column prop="sort" label="排序" sortable></el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button @click="editLink(scope.row._id)" type="success" size="small">编辑</el-button>
					<el-button @click="deleteLink(scope.row._id)" type="danger" size="small">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<el-pagination layout="pager" :total="linkList.length" @current-change="handleCurrentChange" :current-page="currentPage"
		 :page-size="pageSize" background class="pagination">
		</el-pagination>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				linkList: [],
				categoryFilter: [],
				categoryList: null,
				currentPage: 1,
				pageSize: 10
			}
		},
		methods: {
			editLink(id) {
				uni.navigateTo({
					url: 'edit?id=' + id
				})
			},
			deleteLink(id) {
				this.$confirm('此操作将永久删除, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					uniCloud.callFunction({
						name: "deleteLink",
						data: {
							id: id
						}
					}).then(result => {
						this.getLinkList()
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				})


			},
			getLinkList() {
				uniCloud.callFunction({
					name: "getLinkList"
				}).then(res => {
					this.linkList = res.result.data
				})
			},
			categoryFilterHandler(value, row) {
				return row.categoryName === value;
			},
			handleCurrentChange(currentPage) {
				this.currentPage = currentPage;
			},

		},
		onLoad() {
			this.getLinkList()
			uniCloud.callFunction({
				name: 'getCategoryList',
				data: {
					type: 'link'
				}
			}).then(res => {
				this.categoryList = res.result.data
				this.categoryList.forEach(item => {
					this.categoryFilter.push({
						text: item.name,
						value: item.name
					})
				})
			})
		}
	}
</script>

<style lang="scss" scoped>
	page {
		padding: 30px;
	}

	.pagination {
		margin-top: 30px;
	}
</style>
