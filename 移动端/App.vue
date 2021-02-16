<script>
	export default {
		onLaunch: function(res) {
			if (res.path == undefined) {
				uni.switchTab({
					url:'pages/index/index'
				})
				
			}
		},
		onShow: function() {

		},
		onHide: function() {

		}
	}
</script>

<style lang="scss">
	// 引入uView基础样式
	@import "uview-ui/index.scss";
	/*每个页面公共css */
</style>
