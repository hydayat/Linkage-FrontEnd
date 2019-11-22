<template>
	<div>
		<Card :bordered="true" style="width:400px;display: inline-block;">
			<div>
				<div class="horizontal">
					<Avatar shape="circle" icon="ios-person" size=100 :src='iconUrl'/>
				</div>
				<div class="horizontal">
					<h1>{{ username }}</h1>
					<p>{{ description }}</p>
				</div>
			</div>
		</Card>
		<ButtonGroup vertical style='display: inline-block;'>
			<Button icon="md-add" v-on:click="addSubscription()"></Button>
		</ButtonGroup>
	</div>	
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		props:{
			username: String,
			description: String,
			iconUrl: String,
		},
		methods:{
			addSubscription: function(){
				var url = "/user/follow?globalUserName=" + this.username
				this.$axios
					.post(url)
					.then(response=>{
						this.$Message.success('Successfully adding to your subscription!');
					})
					.catch(error=>{
						console.log(error)
					})
				
			},
			sendInvitation:function(){
				this.modal=false;
				this.$Message.success('Invitation is send!');
			}
		}
	}
</script>

<style>
	.horizontal{
		display: inline-block;
		margin: 10px;
	}
</style>
