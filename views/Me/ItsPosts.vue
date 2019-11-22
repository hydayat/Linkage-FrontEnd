<template>
	<div>
		<Button 
		type="primary" 
		shape="circle" 
		icon="ios-arrow-back" 
		style="margin:10px;" 
		:to="{
			path:'subscriptionDetail',
			name:'subscriptionDetail',
			params:{
				subscriptionName:this.username,
				currentPage:currentPage,
			}
		}">Back</Button>
		<h1 style="margin-top:10px;text-align: center;">{{username}}'s Posts</h1>
		<Divider />
	</div>
</template>

<script>
	export default{
		data(){
			return{
				username:'',
				currentPage:0,//该订阅在订阅列表中的第几页
			}
		},
		mounted() {
			this.username = this.$route.params.subscriptionName
			this.currentPage = this.$route.params.currentPage
		},
		methods:{
			
		}
	}
</script>

<style>
</style>
