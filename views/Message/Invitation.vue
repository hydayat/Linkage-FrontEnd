<template>
	<div>
		<br />
		<h1 style="margin-top:10px;text-align: center;">Invitation</h1>
		<Divider />
		<!-- <Form :model="formItem" :label-width="80">
			<FormItem label="Input">
				<Input v-model="formItem.targetName" placeholder="Enter something..."></Input>
			</FormItem>
			<FormItem label="Text">
				<Input v-model="formItem.selfIntro" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
			</FormItem>
			<FormItem>
				<Button type="primary" v-on:click='submit'>Submit</Button>
				<Button style="margin-left: 8px">Cancel</Button>
			</FormItem>
		</Form> -->
		<List header="Who wants to make friend with me" border size="large">
			<ListItem v-for="(request,index) in requests" :name="index" :key="index">
				{{"selfIntro:\t"+request.selfIntro}}
				{{"\t\t\t\tname:\t"+request.username}}
				<Button class="button" style="margin-left:70%" @click="reply(request.id,true,request.username)">Accept</Button>
				<Button class="button" @click="reply(request.id,false,request.username)">Refuse</Button>
			</ListItem>
		</List>
		</br>
		</br>
		</br>
		<List header="Whom I want to make friend with" border size="large">
			<ListItem v-for="(request,index) in myRequests" :name="index" :key="index">
				{{"who:\t\t\t"+request.targetName}}
				<a style="margin-left:70%">{{"result:"}}</a>
				<Icon type="md-paper-plane" v-show="!request.receive"  />
				<Icon type="md-checkmark-circle-outline" v-show="request.receive&&request.acceptStatus" />
				<Icon type="md-close" v-show="request.receive&&!request.acceptStatus" />
			</ListItem>
		</List>
	</div>
</template>
<script>
	import SockJS from "sockjs-client"
	import Stomp from "stompjs"
	import invitationData from "./invitationData.js";
	export default {
		mounted: function() {
			// this.initWebSocket();
		},
		beforeDestroy() {
			// 页面离开时断开连接,清除定时器
			// console.log("beforeDestroy");
			// this.disconnect();
			// clearInterval(this.timer);
		},
		data() {
			return invitationData;
		},
		methods: {
			// connect() {
			// 	this.socket = new SockJS("/chat");
			// 	this.stompClient = Stomp.over(this.socket);
			// 	this.stompClient.connect({}, (frame) => {
			// 		this.stompClient.subscribe(
			// 			"/user/queue/friend/requests",
			// 			//一个数组
			// 			(requests) => {
			// 				this.receiveRequest(JSON.parse(requests.body));
			// 			},
			// 			err => {
			// 				// 连接发生错误时的处理函数
			// 				console.log(err);
			// 			}
			// 		);
			// 	});
			// 	this.stompClient.connect({}, (frame) => {
			// 		this.stompClient.subscribe(
			// 			"/user/queue/friend/reply",
			// 			(reply) => {
			// 				this.requestResult(JSON.parse(reply.body));
			// 			},
			// 			err => {
			// 				// 连接发生错误时的处理函数
			// 				console.log(err);
			// 			}
			// 		);
			// 	});
			// },
			// initWebSocket() {
			// 	this.connect();
			// },
			// submit() { //发好友申请
			// 	this.stompClient.send(
			// 		"/app/friend/add", {},
			// 		JSON.stringify({
			// 			targetName: this.formItem.targetName,
			// 			selfIntro: this.formItem.selfIntro
			// 		})
			// 	);
			// },
			// submit(){
			// 	this.$emit('submitInvitation', this.formItem)
			// },
			// receiveRequest(requests) { //收好友申请 
			// 	//展示id不太对吧
			// 	for (var i = 0, len = this.requests.length; i < len; i++) {
			// 		this.requests.push({
			// 			id: requests[i].id,
			// 			selfIntro: requests[i].selfIntro
			// 		})
			// 	}
			// },
			// disconnect:function() {
			// 	console.log("=========================================")
			// 	if (this.stompClient !== null) {
			// 		this.stompClient.disconnect();
			// 	}
			// 	// serConnected(false);
			// },
			reply(id, acceptStatus,username) { //发回应
				// this.stompClient.send(
				// 	"/app/friend/check", {},
				// 	JSON.stringify({
				// 		id: id,
				// 		acceptStatus: acceptStatus
				// 	})
				// );
				this.$emit('submitReply',{
					id:id,
					acceptStatus:acceptStatus,
				})
				console.log(username)
				for(var i=0;i<this.requests.length;i++){
					if(this.requests[i].username==username){
						this.requests.splice(i,1)
						break
					}
				}
			},
			// requestResult(result) { //收回应
			// 	for (var i = 0, len = this.myRequests.length; i < len; i++) {
			// 		if (this.myRequests[i].targetName == result.targetName) {
			// 			this.myRequests[i].receive = true;
			// 			this.myRequests[i].acceptStatus = result.acceptStatus;
			// 		}
			// 	}
			// }
		}
	};
</script>
<style>
	.button {
		float: left;
	}
</style>
