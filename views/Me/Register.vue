<template>
	<div style="margin:auto">
		<br>
		<h1 style="text-align: center;">Register</h1>
		<Divider/>
		<Form :model="formItem" :label-width="80" style="margin:auto">
			<FormItem label="Username">
				<Input v-model="formItem.username" placeholder="Enter username"></Input>
			</FormItem>
			<FormItem label="PassWord">
				<Input v-model="formItem.password1" type="password" password placeholder="Enter password" />
				<Input v-model="formItem.password2" type="password" password placeholder="Ensure password" />
			</FormItem>
			<FormItem label="Phone">
				<div>
					<Input v-model="formItem.phone" placeholder="Enter phone number" />
					<Input v-model='formItem.code' search enter-button="Get code" placeholder="Enter validation code" @on-search='getCode()' />
				</div>
			</FormItem>
			<FormItem label="E-mail">
				<Input v-model="formItem.email" placeholder="Enter E-mail address"></Input>
			</FormItem>
			<!-- <FormItem label="DatePicker">
				<Row>
					<Col span="11">
					<DatePicker type="date" placeholder="Select date" v-model="formItem.date"></DatePicker>
					</Col>
					<Col span="2" style="text-align: center">-</Col>
					<Col span="11">
					<TimePicker type="time" placeholder="Select time" v-model="formItem.time"></TimePicker>
					</Col>
				</Row>
			</FormItem>
			<FormItem label="Gender">
				<RadioGroup v-model="formItem.gender">
					<Radio label="male">Male</Radio>
					<Radio label="female">Female</Radio>
				</RadioGroup>
			</FormItem> -->
			<FormItem>
				<Button type="primary" v-on:click="submitForm">Submit</Button>
				<Button style="margin-left: 8px" v-on:click="cancelRegister()">Cancel</Button>
			</FormItem>
		</Form>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				formItem: {
					username: '',
					password1: '',
					password2: '',
					phone: '',
					code: '',
					email: ''
					// gender: 'male',
					// date: '',
					// time: '',
					// info: null,
				},

			}
		},
		methods: {
			getCode: function() {
				//向后端发请求以获取验证码
				//var url = 'http://localhost:8080/signup/code?phone=' + this.formItem.phone;
				//var url = 'https://www.saturnluo.cn/signup/code?phone=' + this.formItem.phone;
				var url = '/signup/code?phone=' + this.formItem.phone;
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
					//var url = 'http://localhost:8080/signup/user';
					//var url = 'https://www.saturnluo.cn/signup/user'
					var url = '/signup/user'
					let postData = this.$qs.stringify({
						phoneNumber: this.formItem.phone,
						userName: this.formItem.username,
						userPassword: this.formItem.password1,
						verificationCode: this.formItem.code,
						email: this.formItem.email
					});
					// this.$axios({
					// 		method: 'post',
					// 		url:url,
					// 		data:postData
					// 	})
					this.$axios
						.post(url,{
							phoneNumber: this.formItem.phone,
							userName: this.formItem.username,
							userPassword: this.formItem.password1,
							verificationCode: this.formItem.code,
							email: this.formItem.email
						})
						.then(response => {
							//注册成功
							this.$Message.success('Successfully Sign up');
							this.$router.push('log');
						})
						.catch(error => {
							//注册失败
							this.$Message.error('Unsuccessfully Sign up');
							console.log(error);
						});
				}
			},
			cancelRegister:function(){
				this.$router.push('log');
			}
		}
	}
</script>
