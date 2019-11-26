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
		<Split v-model="split">
			<div slot="left" class="demo-split-pane">
				<Card title="Others send to me" icon="md-person" :padding="0" shadow>
					<List>
						<ListItem v-for="(request,index) in requests" :name="index" :key="index">
							<div style="display: flex;justify-content: space-between; width: 98%;">
								<div>
									<Cell :title='request.username' :label='request.selfIntro'></Cell>
								</div>
								<div style="margin-top: 10px;">
									<ButtonGroup shape='circle'>
									<Button type="success" @click="reply(request.id,true,request.username)">
										<Icon type="md-checkmark"></Icon>
										Accept
									</Button>
									<Button type="error" @click="reply(request.id,false,request.username)">
										Refuse
										<Icon type="md-close"></Icon>
									</Button>
								</ButtonGroup>
								</div>
								
								<!-- <Button class="button" @click="reply(request.id,true,request.username)">Accept</Button>
								<Button class="button" @click="reply(request.id,false,request.username)">Refuse</Button> -->
							</div>
						</ListItem>
					</List>
				</Card>
			</div>
			<div slot="right" class="demo-split-pane">
				<Card title="I send to others" icon="md-person" :padding="0" shadow>
					<List>
						<ListItem v-for="(request,index) in myRequests" :name="index" :key="index">
							<div style="display: flex;justify-content: space-between; width: 98%;">
								<div>
									<h3 style="margin-left: 20px;">{{request.targetName}}</h3>
								</div>
								<div style="display: flex;justify-content: space-between;">
									<a style="margin-top: 5px;">"result:"</a>
									<Icon style="margin-top:8px;margin-left:5px;" type="md-paper-plane" v-show="!request.receive" />
									<Icon style="margin-top:8px;margin-left:5px;" type="md-checkmark-circle-outline" v-show="request.receive&&request.acceptStatus" />
									<Icon style="margin-top:8px;margin-left:5px;" type="md-close" v-show="request.receive&&!request.acceptStatus" />
								</div>
							</div>
							
						</ListItem>
					</List>
				</Card>
			</div>
		</Split>
	</div>
</template>
<script>
	import SockJS from "sockjs-client"
	import Stomp from "stompjs"
	import invitationData from "./invitationData.js";
	export default {
		created() {
			this.$emit('clearInvitationBadge')
		},
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
			reply(id, acceptStatus, username) { //发回应
				// this.stompClient.send(
				// 	"/app/friend/check", {},
				// 	JSON.stringify({
				// 		id: id,
				// 		acceptStatus: acceptStatus
				// 	})
				// );
				this.$emit('submitReply', {
					id: id,
					acceptStatus: acceptStatus,
				})
				console.log(username)
				for (var i = 0; i < this.requests.length; i++) {
					if (this.requests[i].username == username) {
						this.requests.splice(i, 1)
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
