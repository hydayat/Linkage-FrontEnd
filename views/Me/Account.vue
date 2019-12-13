<template>
	<div style="margin-top: 10px">
		<!-- modal1用于修改小号信息 -->
		<Modal v-model="modal1" width="360">
			<p slot="header" style="text-align: center;">
				<Icon type="ios-brush"></Icon>
				<span>Change Appearance</span>
			</p>
			<!-- <div style="text-align:center">
				<Input show-word-limit type="textarea" placeholder="Enter something..." maxlength="100" :autosize="{minRows: 3,maxRows: 3}"></Input>
      </div>-->
			<Form :model="formItem1" style="margin:auto">
				<FormItem label="Gender">
					<RadioGroup v-model="formItem1.gender">
						<Radio label="male">Male</Radio>
						<Radio label="female">Female</Radio>
					</RadioGroup>
				</FormItem>
				<FormItem label="description">
					<Input v-model="formItem1.description" show-word-limit type="textarea" placeholder="Enter something..." maxlength="100"
					 :autosize="{minRows: 2,maxRows: 2}"></Input>
				</FormItem>
				<FormItem label="address">
					<Input v-model="formItem1.address" show-word-limit type="textarea" placeholder="Enter something..." maxlength="100"
					 :autosize="{minRows: 2,maxRows: 2}"></Input>
				</FormItem>
			</Form>
			<div slot="footer">
				<Button type="primary" size="large" long @click="submit()">Submit</Button>
			</div>
		</Modal>
		<!-- modal2用于修改大号信息 -->
		<Modal v-model="modal2" width="360">
			<p slot="header" style="text-align: center;">
				<Icon type="ios-brush"></Icon>
				<span>Change Appearance</span>
			</p>
			<Form :model="formItem2" style="margin:auto">
				<FormItem label="description">
					<Input v-model="formItem2.description" show-word-limit type="textarea" placeholder="Enter something..." maxlength="100"
					 :autosize="{minRows: 2,maxRows: 2}"></Input>
				</FormItem>
			</Form>
			<div slot="footer">
				<Button type="primary" size="large" long @click="submit2()">Submit</Button>
			</div>
		</Modal>
		<!-- modal3用于注册大号 -->
		<Modal v-model="modal3" width="360">
			<p slot="header" style="text-align: center;">
				<span>Create Global Account</span>
			</p>
			<Form :model="formItem3" style="margin:auto">
				<FormItem label="Name">
					<Input v-model="formItem3.name" show-word-limit type="textarea" placeholder="Enter something..." maxlength="20"
					 :autosize="{minRows: 1,maxRows: 1}"></Input>
				</FormItem>
				<FormItem label="Description">
					<Input v-model="formItem3.description" show-word-limit type="textarea" placeholder="Enter something..." maxlength="100"
					 :autosize="{minRows: 2,maxRows: 2}"></Input>
				</FormItem>
			</Form>
			<div slot="footer">
				<Button type="primary" size="large" long @click="submit3()">Submit</Button>
			</div>
		</Modal>
		<!-- 以下是主界面 -->
		<Button type="warning" shape="circle" icon="ios-construct" style="margin:10px;float: right;" v-if="isAdmin" to="admin">Admin</Button>
		<br />
		<h1 style="text-align: center;">Account</h1>
		<br />
		<div class="demo-split">
			<Split v-model="split1">
				<!--以下是小号界面-->
				<div slot="left" class="demo-split-pane">
					<Card title="Private" icon="md-person" :padding="0" shadow>
						<CellGroup>
							<Cell>
								<div style="display: flex;justify-content: space-around;">
									<div class="horizontal">
										<Avatar shape="square" icon="ios-person" size="100" :src="iconURL" />
										<!--上传小号头像-->
										<Upload action="/icon" name="Icon" :show-upload-list="false" :on-success="handleChangeAvatorSuccess"
										 :on-error="handleChangeAvatorError" :before-upload="handleBeforeChangeAvator">
											<Button icon="ios-cloud-upload-outline" style="margin-top: 5px;">Change</Button>
										</Upload>
									</div>
									<div class="horizontal">
										<h1 style="margin-top: 10px;">
											{{username1}}
											<Icon :type="gender" />
										</h1>
										<p style="margin-top: 10px;">phone: {{phone}}</p>
									</div>
								</div>
							</Cell>
							<Cell title="Descrption" :label="description1" />
							<Cell title="Address" :label="address" />
							<Cell title="My Moments" to="myMoments" />
							<!-- <Cell title="Disabled" disabled />
							  <Cell title="Selected" selected />-->
											<!-- <Cell title="Message" to="/components/badge">
								<Badge :count="10" slot="extra" /> -->
							</Cell>
							<Cell title="Hiding">
								<i-switch v-model="switchValue" slot="extra" />
							</Cell>
							<!-- <Cell style="text-align: center;">
								<Divider/>
								<Button type="error" style="margin:auto">Log out</Button>
							</Cell> -->
							<Divider/>
							<div>
								<center>
									<Button type="error" style="margin:auto;width: 200px;" v-on:click="logOut">Log out</Button>
								</center>
								<br/>
							</div>
						</CellGroup>
						<!--修改小号信息按钮-->
						<div slot="extra">
							<Button shape="circle" icon="ios-brush" style="margin-bottom: 5px;" @click="changeInfo()"></Button>
						</div>
					</Card>
				</div>
				<!--以下是大号界面-->
				<div slot="right" class="demo-split-pane">
					<Card title="Global" icon="md-people" :padding="0" shadow>
						<!--大号界面主体-->
						<CellGroup v-if="HasBigAccount">
							<Cell>
								<div style="display: flex;justify-content: space-around;">
									<div class="horizontal">
										<Avatar shape="circle" :src="iconURL2" icon="ios-people" size="100" />
										<!--上传大号头像-->
										<Upload :action="uploadBigAvatarUrl" name="Icon" :show-upload-list="false" :on-success="handleChangeAvatorSuccess2"
										 :on-error="handleChangeAvatorError2" :before-upload="handleBeforeChangeAvator2">
											<Button icon="ios-cloud-upload-outline" style="margin-top: 5px;">Change</Button>
										</Upload>
									</div>
									<div class="horizontal">
										<h1 style="margin-top: 10px;">{{username2}}</h1>
										<ButtonGroup size="large" shape="circle" style="margin-top: 15px;">
											<Button>Subscription: {{ subscription }}</Button>
											<Button :to="{path:'followers',name:'followers',params:{currentPage:1}}">Follower: {{ follower }}</Button>
										</ButtonGroup>
									</div>
								</div>
							</Cell>
							<Cell title="Descrption" :label="description2" />
							<Cell title="My Posts" to="myPosts" />
							<!-- <Cell title="Message" to="/components/badge">
                <Badge :count="10" slot="extra" /> -->
							<Cell title="Option">
								<i-switch v-model="switchValue2" slot="extra" />
							</Cell>
						</CellGroup>
						<!--修改大号信息按钮-->
						<div slot="extra">
							<Button v-if="HasBigAccount" shape="circle" icon="ios-brush" style="margin-bottom: 5px;" @click="modal2=true"></Button>
						</div>
						<!--创建大号界面-->
						<div v-if="!HasBigAccount">
							<br />
							<h3 style="text-align: center;">You don't have a global account!</h3>
							<br />
							<center>
								<Button type="primary" @click="modal3=true">Create</Button>
							</center>
							<br />
						</div>
					</Card>
				</div>
			</Split>
		</div>

	</div>
</template>

<script>
	//import data from "../../mock/selfInfo.js"
	//import data2 from "../../mock/changeSelfInfo.js"
	//import data3 from "../../mock/createBigAccont.js"
	//import data4 from "../../mock/hasBigAccount.js"
	//import data5 from "../../mock/changeBigAccountInfo.js"
	export default {
		data() {
			return {
				//要动态绑定本地图片src，必须加require
				//iconURL2:require("C:/Users/stone/Documents/HBuilderProjects/createbyvue_ui/static/linkage.png"),
				//两个面板的比例
				split1: 0.5,

				//私人账号个人信息
				modal1: false,
				isAdmin: false,
				username1: "",
				iconURL: "",
				phone: "",
				gender: "",
				description1: "",
				address: "",
				switchValue: true,
				formItem1: {
					gender: "male",
					description: "",
					address: ""
				},

				//公众号信息
				uploadBigAvatarUrl: '',
				HasBigAccount: false,
				modal2: false,
				username2: "Super-H",
				iconURL2: "",
				subscription: 0,
				follower: 0,
				description2: "This is used to praise Mr. Zha",
				formItem2: {
					description: ""
				},
				switchValue2: false,

				//注册大号
				modal3: false,
				formItem3: {
					name: "",
					description: ""
				},
				formItem3name: ""
			};
		},
		mounted() {
			//var url="http://localhost:8080/user/selfInfo"
			//var url="https://www.saturnluo.cn/user/selfInfo"
			var url = "/user/selfInfo";
			//渲染小号信息
			this.$axios
				.get(url)
				.then(response => {
					this.username1 = response.data.info.username;
					this.$emit('myName',this.username1)
					this.iconURL = response.data.info.iconUrl;
					this.phone = response.data.info.phoneNumber;
					response.data.info.sex == 1 ?
						(this.gender = "md-man") :
						(this.gender = "md-woman");
					this.description1 = response.data.info.description;
					this.address = response.data.info.address;
					//显示管理员按钮
					this.isAdmin = response.data.info.admin
				})
				.catch(error => {
					console.log(error);
				});
			//渲染大号信息
			//url = "http://localhost:8080/user/globalAccount/me"
			url = "/user/globalAccount/me";
			this.$axios
				.get(url)
				.then(response => {
					//关闭注册界面，打开大号界面
					this.HasBigAccount = true;

					var temp = response.data.globalUser;
					this.username2 = temp.username;
					this.iconURL2 = temp.iconUrl;
					this.description2 = temp.description;
					this.follower = temp.followerNumber;
				})
				.catch(error => {
					this.HasBigAccount = false;
					console.log(error);
				});
		},
		methods: {
			logOut:function(){
				this.$axios
					.get('/logout')
					.then(response=>{
						this.$Message.success('Successfully log out!')
						this.$router.push('log')
					})
					.catch(error=>{
						this.$Message.error('Fail')
					})
			},
			handleChangeAvatorSuccess: function(res, file) {
				console.log(res);
				this.iconURL = res;
			},
			handleChangeAvatorSuccess2: function(res, file) {
				console.log(res);
				this.iconURL2 = res;
			},
			handleChangeAvatorError: function(error) {
				console.log(error);
			},
			handleChangeAvatorError2: function(error) {
				console.log(error);
			},
			handleBeforeChangeAvator: function(file) {
				return true;
			},
			handleBeforeChangeAvator2: function(file) {
				this.uploadBigAvatarUrl = '/global_icon?GlobalName=' + this.username2
				return true;
			},
			changeInfo: function() {
				this.modal1 = true;
			},
			submit: function() {
				//提交修改的小号信息
				var gender = this.formItem1.gender == "male" ? 1 : 0;
				// var url='http://localhost:8080/user/selfInfo?sex=' + gender
				// 		+'&address=' + this.formItem1.address
				// 		+'&description=' + this.formItem1.description
				var url =
					"/user/selfInfo?sex=" +
					gender +
					"&address=" +
					this.formItem1.address +
					"&description=" +
					this.formItem1.description;
				this.$axios
					.put(url)
					.then(response => {
						this.modal1 = false; //关闭提交界面
						//在界面上更新个人信息
						gender == 1 ? (this.gender = "md-man") : (this.gender = "md-woman"),
							console.log(this.gender);
						//this.gender = this.formItem1.gender
						this.description1 = this.formItem1.description;
						this.address = this.formItem1.address;

						this.$Message.success("Info has been change!");
					})
					.catch(error => {
						console.log(error);
						this.$Message.error("Fail");
					});
			},
			submit2: function() {
				//提交修改的大号信息
				var url =
					"/user/globalAccount/description?description=" +
					this.formItem2.description;
				this.$axios
					.put(url)
					.then(response => {
						this.modal2 = false; //关闭提交界面
						//在界面上更新个人信息
						this.description2 = this.formItem2.description;

						this.$Message.success("Info has been change!");
					})
					.catch(error => {
						console.log(error);
						this.$Message.error("Fail");
					});
			},
			submit3: function() {
				//提交注册大号的信息
				//var url='http://localhost:8080/user/globalAccount/me'
				var url = "/user/globalAccount/me";
				console.log(
					"----------------------------------------------" + this.formItem3.name
				);
				this.$axios
					.post(url, {
						username: this.formItem3.name,
						description: this.formItem3.description,
						iconUrl: ""
					})
					.then(response => {
						this.modal3 = false; //关闭提交界面
						//在界面上更新个人信息
						this.description2 = this.formItem3.description;
						this.username2 = this.formItem3.name;
						this.HasBigAccount = true;

						this.$Message.success("Success");
					})
					.catch(error => {
						console.log(error);
						this.$Message.error("Fail");
					});
			}
		}
	};
</script>

<style>
	.demo-split {
		border: 1px solid #dcdee2;
	}

	.demo-split-pane {
		padding: 10px;
	}

	.horizontal {
		display: inline-block;
		margin: 10px;
	}
</style>
