<template>
	<div class='divStyle'>
		<br>
		<h1 style="text-align: center;">Log in</h1>
		<Divider/>
		<div>
			<Input v-model="username" prefix="ios-contact" placeholder="Enter userame" class="divStyle" />
		</div>
		<div style="margin-top: 10px">
			<Input v-model="password" prefix="ios-lock-outline" password placeholder="Enter password" class="divStyle" type="password"/>
			<div>
				<div style="float:left">
					<Button class="whiteBorder" v-on:click='register()'>sign up</Button>
				</div>
				<div align="right">
					<Button class="whiteBorder" v-on:click='forgetPassword()'>forget password</Button>
				</div>
			</div>
		</div>
		<br>
		<Button v-on:click="submit" style="background-color:cornflowerblue; color: #FFFFFF" long>sign in</Button>
	</div>
</template>

<script>
	import data from '../../mock/log.js';
	import chatData from '../Message/chatData.js'
	export default {
		data() {
			return {
				username: '',
				password: ''
			}
		},
		methods: {
			submit: function() {
				//var url = 'http://localhost:8080/login?username=' + this.username + '&passwd=' + this.password;
				//var url = 'https://www.saturnluo.cn/login?username=' + this.username + '&passwd=' + this.password;
				var url = '/login?username=' + this.username + '&passwd=' + this.password;
				this.$axios
					.post(url)
					.then(response => {
						//登录成功提示
						this.$Message.success('Sign in successfully!');
						//显示侧栏
						//this.$emit('child-event','LogSuccess');
						//显示管理员按钮
						if(response.data.msg.admin == true){
							this.$emit('admin-log')
						}
						//初始化全局变量
						chatData.myself.name = this.username
						this.$emit('unreadMessage',response.data.msg.unreadMessage.unreadList)
						this.$emit('unreadAddFriendRequest',response.data.msg.unreadAddFriendRequest.unreadList)
						this.$emit('unreadAddFriendReply',response.data.msg.unreadAddFriendReply.unreadList)
						//开始连接websocket
						console.log("登录后开始建立socket连接")
						this.$emit('connectWebSockect')
						//跳转到个人主页
						this.$router.push('account');
						console.log("11/24 23 43")
					})
					.catch(error => {
						//登录失败提示
						this.$Message.error('Sign in unsuccessfully!');
						console.log(error);
						//清空输入框的内容
						this.username = '';
						this.password = '';
					});
			},
			register:function(){
				this.$router.push('register');
			},
			forgetPassword:function(){
				this.$router.push('forgetPassword');
			}
		}
	}
</script>

<style>
	.whiteBorder {
		border: #FFFFFF;
		background:transparent;
	}

	.divStyle {
		margin: auto;
		width: 270px;
	}

	#nav {
		padding: 30px;
	}

	#nav a {
		font-weight: bold;
		color: #2c3e50;
	}

	#nav a.router-link-exact-active {
		color: #42b983;
	}
</style>
