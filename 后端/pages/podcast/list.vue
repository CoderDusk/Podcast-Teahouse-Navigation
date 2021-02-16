<template>
	<view>
		<navigator url="edit">
			<el-button type="success" size="medium">新增播客</el-button>
		</navigator>
		<el-table :data="podcastList.slice((currentPage-1)*pageSize,currentPage*pageSize)">
			<el-table-column prop="name" label="播客名称"></el-table-column>
			<el-table-column prop="categoryName" label="播客分类" :filters="categoryFilter" :filter-method="categoryFilterHandler"></el-table-column>
			<el-table-column prop="sort" label="排序" sortable></el-table-column>
			<el-table-column prop="isRecommended" label="是否推荐" :formatter="formatter" :filters="[{text:'推荐',value:true},{text:'未推荐',value:false}]" :filter-method="filterRecommend"></el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button @click="editPodcast(scope.row._id)" type="success" size="small">编辑</el-button>
					<el-button @click="deletePodcast(scope.row._id)" type="danger" size="small">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

			<el-pagination layout="pager" :total="podcastList.length" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" background class="pagination" hide-on-single-page>
			</el-pagination>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				podcastList: [],
				categoryFilter: [],
				categoryList: null,
				currentPage: 1,
				pageSize:10
			}
		},
		methods: {
			editPodcast(id) {
				uni.navigateTo({
					url: 'edit?id=' + id
				})
			},
			deletePodcast(id) {
				this.$confirm('此操作将永久删除, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					uniCloud.callFunction({
						name: "deletePodcast",
						data: {
							id: id
						}
					}).then(result => {
						this.getPodcastList()
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				})
				
			},
			getPodcastList() {
				uniCloud.callFunction({
					name: "getPodcastList"
				}).then(res => {
					this.podcastList = res.result.data
					console.log(this.podcastList)
				})
			},
			categoryFilterHandler(value, row) {
				return row.categoryName === value;
			},
			handleCurrentChange(currentPage) {
				this.currentPage = currentPage;
				console.log(this.currentPage)
			},
			formatter(row,index){
				if(row.isRecommended){
					row.recommendStatus = "推荐"
				}else{
					row.recommendStatus = "未推荐"
				}
				
				return row.recommendStatus
			},
			filterRecommend(value,row){
				return row.isRecommended == value
			}

		},
		onLoad() {
			this.getPodcastList()
			
			uniCloud.callFunction({
				name: 'getCategoryList',
				data: {
					type: 'podcast'
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
	
	.pagination{
		margin-top: 30px;
	}
</style>
