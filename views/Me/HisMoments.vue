<template>
	<div>
		<Button 
		type="primary" 
		shape="circle" 
		icon="ios-arrow-back" 
		style="margin:10px;" 
		:to="{
			path:'friendDetail',
			name:'friendDetail',
			params:{
				friendName:username,
				currentPage:currentPage,
			}
		}">Back</Button>
		<h1 style="margin-top:10px;text-align: center;">{{username}}'s Moments</h1>
		<Divider />
	</div>
</template>

<script>
	export default{
		data(){
			return{
				username:'',
				currentPage:0,//该好友在好友列表中的第几页
			}
		},
		mounted() {
			this.username = this.$route.params.friendName
			this.currentPage = this.$route.params.currentPage
		},
		methods:{
			
		}
	}
</script>

<style>
</style>
