<template>
	<div style="margin:auto">
		<br>
		<h1 style="text-align: center;">Forget Password</h1>
		<Divider/>
		<Form :model="formItem" :label-width="80" style="margin:auto">
			<FormItem label="Phone">
				<div>
					<Input v-model="formItem.phone" placeholder="Enter phone number" />
					<Input v-model='formItem.code' search enter-button="Get code" placeholder="Enter validation code" @on-search='getCode()' />
				</div>
			</FormItem>
			<FormItem label="PassWord">
				<Input v-model="formItem.password1" type="password" password placeholder="Enter password" />
				<Input v-model="formItem.password2" type="password" password placeholder="Ensure password" />
			</FormItem>
			<FormItem>
				<Button type="primary" v-on:click="submitForm">Submit</Button>
				<Button style="margin-left: 8px" v-on:click="cancel()">Cancel</Button>
			</FormItem>
		</Form>
	</div>
</template>

<script>
	export default{
		data() {
			return {
				formItem: {
					password1: '',
					password2: '',
					phone: '',
					code: ''
				},
		
			}
		},
		methods:{
			getCode: function() {
				//向后端发请求以获取验证码
				//var url = 'http://localhost:8080/forget/code?phone=' + this.formItem.phone;
				var url = '/forget/code?phone=' + this.formItem.phone;
				this.$axios
					.get(url)
					.then(response => {
						//验证码发送成功提示
						this.$Message.success('The code is sent to your phone!');
					})
					.catch(error => {
						//验证码发送失败提示
						this.$Message.error('There is some errors.');
					})
			},
			submitForm: function() {
				//检查两次输入的密码是否匹配
				if (this.formItem.password1 != this.formItem.password2) {
					//重新输入密码
					this.formItem.password1 = '';
					this.formItem.password2 = '';
					this.$Message.error('The passwords you entered aren\'t matched.');
				} 
				else {
					//将所有注册信息发给后端
					var url = '/forget/user';
					this.$axios
						.post(url,{
							phoneNumber: this.formItem.phone,
							userPassword: this.formItem.password1,
							verificationCode: this.formItem.code
						})
						.then(response => {
							//注册成功
							this.$Message.success('Successfully change password');
							this.$router.push('log');
						})
						.catch(error => {
							//注册失败	
							this.$Message.error('Unsuccessfully change password');
							console.log(error);
						});
				}
			},
			cancel:function(){
				this.$router.push('log');
			}
		}
	}
</script>

<style>
</style>
