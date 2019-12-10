<template>
	<div>
		<Card :bordered="true" style="width:400px;display: inline-block;">
			<div>
				<div class="horizontal">
					<Avatar shape="circle" icon="ios-people" :src="iconUrl" size=100 />
				</div>
				<div class="horizontal">
					<h1>{{ username }}</h1>
					<p>{{ description }}</p>
				</div>
			</div>
		</Card>
		<ButtonGroup vertical style='display: inline-block;'>
			<Button icon="md-people" v-on:click='subscriptionDetail()'></Button>
			<Button icon="md-cut" v-on:click='deleteSubscription()'></Button>
		</ButtonGroup>
	</div>	
</template>

<script>
	import data from '../mock/deleteSubscription.js'
	export default{
		methods:{
			subscriptionDetail() {
				//跳转到订阅公众号的主页，并且将公众号的名字写在路由参数中
				console.log('Before going to SubscriptionDetail.vue, SubscriptionItem\'s currentPage is '+this.currentPage)
				this.$router.push({
					path: 'subscriptionDetail',
					name: 'subscriptionDetail',
					params: {
						subscriptionName:this.username,
						currentPage:this.currentPage,
					}
				})
				
			},
			deleteSubscription(){
				var url = '/user/follow?targetGlobalUserName='+this.username
				this.$axios
					.delete(url)
					.then(response=>{
						this.$emit('deleteSubscription',this.username)
						this.$Message.success('Success')
					})
					.catch(error=>{
						this.$Message.error('Fail')
						console.log(error)
					})
			}
		},
		props:{
			username: String,
			description: String,
			iconUrl: String,
			currentPage:Number,//该组件在订阅列表中的页数
		}
	}
</script>

<style>
	.horizontal{
		display: inline-block;
		margin: 10px;
	}
</style>
