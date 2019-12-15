<template>
	<div class="home">
		<div>
			<br />
			<br />
			<br />
			<br />
			<h1 style="text-align: center;">Welcome to Linkage 1.2</h1>
			<Divider/>
		</div>
		<div style="margin:10px 5px 15px 270px">
			<Button v-on:click='func()'>
				JOIN US
				<Icon type="ios-arrow-forward" />
			</Button>
		</div>
		<br />
		<br />
		<br />
		<br />
	</div>
	
</template>

<script>
	export default{
		methods:{
			func:function(){
				//var url = 'http://localhost:8080/isLog';
				//var url = 'https://www.saturnluo.cn/isLog'
				var url = '/isLog';
				this.$axios
					.get(url)
					.then(response => {
						//已经登录，跳转到个人主页
						this.$router.push('account');
					})
					.catch(error => {
						//未登录，跳转到登录界面
						console.log(error);
						this.$router.push('log');						
					});
			}
		}
	}
</script>
<style>
	.home {
		margin: 0 auto;
		vertical-align: middle
	}
</style>
