<template>
	<div>
		<Modal v-model="modal" width="360">
			<p slot="header" style="text-align: center;">
				<Icon type="md-mail"></Icon>
				<span> Validation Info</span>
			</p>
			<div style="text-align:center">
				<Input show-word-limit type="textarea" placeholder="Enter something..." maxlength="100" :autosize="{minRows: 3,maxRows: 3}" v-model="validation"></Input>
			</div>
			<div slot="footer">
				<Button type="primary" size="large" long @click="sendInvitation()">Send</Button>
			</div>
		</Modal>
		<Card :bordered="true" style="width:400px;display: inline-block;">
			<div>
				<div class="horizontal">
					<Avatar shape="square" icon="ios-person" size=100 :src='iconUrl'/>
				</div>
				<div class="horizontal">
					<h1>
						{{ username }}
						<Icon :type="sex==1?'md-man':'md-woman'"/>
					</h1>
					<p>{{ description }}</p>
				</div>
			</div>
		</Card>
		<ButtonGroup vertical style='display: inline-block;'>
			<Button icon="md-add" v-on:click="addFriend()"></Button>
		</ButtonGroup>
	</div>	
</template>

<script>
	import invitationData from'../views/Message/invitationData.js'
	export default{
		data(){
			return{
				modal:false,//默认情况下不显示对话框
				validation:'',//发好友请求时填写的验证信息
				invitationData:invitationData,
			}
		},
		props:{
			username: String,
			description: String,
			sex:Number,
			iconUrl:String,
		},
		methods:{
			addFriend: function(){
				this.modal=true;
			},
			sendInvitation:function(){
				this.modal=false;
				this.$Message.success('Invitation is send!');
				this.invitationData.formItem.targetName=this.username;
				this.invitationData.formItem.selfIntro=this.validation;
				this.$emit('submitInvitation', this.invitationData.formItem);
				this.invitationData.myRequests.push({
					targetName:this.invitationData.formItem.targetName,
					// selfIntro:this.invitationData.formItem.selfIntro,
					receive:false,
					acceptStatus:true,
				})
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
