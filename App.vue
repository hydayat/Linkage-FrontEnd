<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-logo {
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav {
  width: 500px;
  margin: 0 auto;
  margin-right: 20px;
}
.routerStyle {
  font-weight: bold;
  color: #ffffff;
}
.routerStyle.router-link-exact-active {
  color: #f0ad4e;
}
.routerStyle2 {
  font-weight: bold;
  color: #000000;
}
.routerStyle2.router-link-exact-active {
  color: #f0ad4e;
}
.backwhite {
  background-color: #ffffff;
}
</style>
<template>
  <div class="layout">
    <Layout>
      <Header>
        <div>
          <font color="#FFFFFF" size="5">Linkage</font>
		  <!-- <Button type='primary' v-if='isAdmin'>Admin</Button> -->
        </div>
		<!-- <div>
			<Button type='primary' v-if='isAdmin'>Admin</Button>
		</div> -->
      </Header>
      <Layout>
        <Sider hide-trigger :style="{background: '#fff'}">
          <Menu
            ref="menu"
            :active-name="activeName"
            theme="light"
            width="auto"
            :open-names="['1','2','3','4']"
            v-if="islog"
            @on-select="select"
          >
            <Submenu name="1">
              <template slot="title">
                <Icon type="md-cafe"></Icon>Moments
              </template>
              <MenuItem name="1-1" @click.native="shareMoments()">Share Your Moment</MenuItem>
              <MenuItem name="1-2" @click.native="browseMoments()">Browse Others</MenuItem>
            </Submenu>
            <Submenu name="4">
              <template slot="title">
                <Icon type="logo-chrome"></Icon>Posts
              </template>
              <MenuItem name="4-1" @click.native="showPostArticle()">Post Article</MenuItem>
              <MenuItem name="4-3" @click.native="showOthersPost()">Browse Others</MenuItem>
              <MenuItem name="4-4" @click.native="showSearchPost()">Search Post</MenuItem>
            </Submenu>
            <Submenu name="2">
              <template slot="title">
                <Icon type="md-notifications"></Icon>Message
              </template>
              <MenuItem name="2-1" @click.native="invitation()">
                Invitation
                <Badge
                  text="new"
                  type="warning"
                  style="margin-left: 35px;margin-bottom: 5px;"
                  v-if="invitationBadge == 1? true : false"
                />
              </MenuItem>
              <MenuItem name="2-2" @click.native="chat()">
                Chat
                <Badge
                  text="new"
                  style="margin-left: 61px; margin-bottom: 5px;"
                  v-if="messageBadge == 1?true:false"
                />
              </MenuItem>
            </Submenu>
            <Submenu name="3">
              <template slot="title">
                <Icon type="md-contact"></Icon>Me
              </template>
              <MenuItem name="3-1" @click.native="showAccount()">Account</MenuItem>
              <MenuItem name="3-2" @click.native="showFriends()">Friends</MenuItem>
              <MenuItem name="3-3" @click.native="showSubscription()">Subscription</MenuItem>
            </Submenu>
          </Menu>
        </Sider>
        <Layout :style="{padding: '0 24px 24px'}">
          <!-- <keep-alive>
						<router-view @child-event='parentEvent'></router-view>
          </keep-alive>-->
            <transition name="slide">
          <router-view
            @child-event="parentEvent"
			@admin-log="showAdminButton"
            @changeActiveName="changeActiveName"
            @submitMessage="onMessageSubmit"
            @unreadMessage="readUnreadMessage"
            @unreadAddFriendRequest="readUnreadAddFriendRequest"
            @unreadAddFriendReply="readUnreadAddFriendReply"
            @submitInvitation="onSubmitInvitation"
            @submitReply="onSubmitReply"
            @connectWebSockect="connectWebSockect"
            @clearMessageBadge="clearMessageBadge"
            @clearInvitationBadge="clearInvitationBadge"
			@myName="initialMyName"
			:myName='myName'
          ></router-view>
           </transition>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>
<script>
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import chatData from "./views/Message/chatData.js";
import invitationData from "./views/Message/invitationData.js";
// import stompClient from "./stompClient.js";
import mapObject from "./map.js";
export default {
  data() {
    return {
      unreadMessageList: [],
      islog: true,
	  isAdmin: false,
      activeName: "3-1",
      messageBadge: 0,
      invitationBadge: 0,
	  myName:''
    };
  },
  created() {},
  beforeDestroy() {
    this.disconnect();
  },
  mounted() {},
  methods: {
	showAdminButton(){
		this.isAdmin = true
	},
	initialMyName(arg){
		this.myName = arg
	},
    connectWebSockect() {
      this.initWebSocket();
    },
    clearMessageBadge() {
      this.messageBadge = 0;
    },
    clearInvitationBadge() {
      this.invitationBadge = 0;
    },
    readUnreadMessage(unreadList) {
      //如果上线后有未读消息，显示badge
      if (unreadList.length != 0) this.messageBadge = 1;
      //将未读消息存入全局变量
      for (var i = 0, len = unreadList.length; i < len; i++) {
        this.showGreeting(unreadList[i]);
      }
    },
    select(name) {
      this.activeName = name;
    },
    changeActiveName(activeName) {
      console.log("App is accepting emit ...");
      this.activeName = activeName;
      console.log(this.activeName);
      this.$nextTick(() => {
        console.log("executin nextTick ...");
        this.$refs.menu.updateOpened();
        this.$refs.menu.updateActiveName();
      });
    },
    parentEvent(data) {
      if (data == "LogSuccess") this.islog = true;
    },
    shareMoments: function() {
      this.$router.push("shareMoments");
    },
    browseMoments: function() {
      this.$router.push("browseMoments");
    },
    showAccount: function() {
      this.$router.push("account");
    },
    showFriends: function() {
      this.$router.push({
        path: "friends",
        name: "friends",
        params: {
          currentPage: 1
        }
      });
    },
    showHome: function() {
      this.$router.push("home");
    },
    showPostArticle: function() {
      this.$router.push("postArticle");
    },
    showSearchPost: function() {
      this.$router.push("searchPost");
    },
    showMyPost: function() {
      this.$router.push("browseMyPost");
    },
    showOthersPost: function() {
      this.$router.push("browseOthersPost");
    },
    showMessage: function() {
      this.$router.push("message");
    },

    chat: function() {
      this.$router.push({
        path: "chat",
        name: "chat",
        params: {
          name: ""
        }
      });
    },
    invitation: function() {
      this.$router.push("invitation");
    },
    showSubscription: function() {
      this.$router.push({
        path: "subscription",
        name: "subscription",
        params: {
          currentPage: 1
        }
      });
    },

    disconnect() {
      //断开连接
      if (this.stompClient !== null) {
        this.stompClient.disconnect();
      }
    },
    initWebSocket() {
      //初始化连接接口
      console.log("initWebSocket");
      this.connect();
    },
    onMessageSubmit(message) {
      console.log("App.vue onMessageSubmit");
      //点击发送的回调函数
      console.log(chatData.currentMessage);
      chatData.currentMessage.push(message);
      if(chatData.isEmergency==false){
        this.stompClient.send(
        //发送到后端
        "/app/chat",
        {},
        JSON.stringify({
          to: chatData.current[0].name, // 发给谁
          content: message.content, // 内容是啥
          name: chatData.myself.name // 谁发的
        })
      );
      }
      else{
        this.$axios
            .post("/user/emergency", 
                {
                content:message.content,
                targetName:chatData.current[0].name
                }
            )
            .then(response=>{
              console.log()
              this.$Message.info('Sucessfully submit')
            })
            .catch(error=>{
              console.log(error)
            })
        chatData.isEmergency=false;
      }
      // timeout simulating the request
      setTimeout(() => {
        //发送延迟，2秒后显示发送成功
        message.uploaded = true;
      }, 2000);
    },
    connect() {
      //socket连接函数
      this.socket = new SockJS("/chat");
      this.stompClient = Stomp.over(this.socket);
      console.log("try to connect chat");
      this.stompClient.connect({}, frame => {
        //serConnected(true);
        // 第一个参数是地址，不要改
        // 第二个参数是回调函数，在有新消息传过来之后会自动被调用
        // 输入的参数是消息
        console.log("try to subscribe chat");
        this.stompClient.subscribe(
          "/user/queue/chat",
          greeting => {
            if (
              mapObject.chatMap.has(JSON.stringify(JSON.parse(greeting.body)))
            ) {
              if (
                mapObject.chatMap.get(
                  JSON.stringify(JSON.parse(greeting.body))
                ) == 3
              ) {
                mapObject.chatMap.delete(
                  JSON.stringify(JSON.parse(greeting.body))
                );
              } else {
                mapObject.chatMap.set(
                  JSON.stringify(JSON.parse(greeting.body)),
                  mapObject.chatMap.get(
                    JSON.stringify(JSON.parse(greeting.body))
                  ) + 1
                );
              }
            } else {
              mapObject.chatMap.set(
                JSON.stringify(JSON.parse(greeting.body)),
                1
              );
              this.showGreeting(JSON.parse(greeting.body));
              this.stompClient.send(
              "/app/chat/confirm",
              {},
              JSON.stringify(JSON.parse(greeting.body))
            );
            }
          },
          err => {
            // 连接发生错误时的处理函数
            console.log("/user/queue/chat Fail to connect");
            console.log(err);
          }
        );
        console.log("try to subscribe request");
        this.stompClient.subscribe(
          "/user/queue/friend.request",
          request => {
            if (
              mapObject.requestMap.has(JSON.stringify(JSON.parse(request.body)))
            ) {
              if (
                mapObject.requestMap.get(
                  JSON.stringify(JSON.parse(request.body))
                ) == 3
              ) {
                mapObject.requestMap.delete(
                  JSON.stringify(JSON.parse(request.body))
                );
              } else {
                mapObject.requestMap.set(
                  JSON.stringify(JSON.parse(request.body)),
                  mapObject.requestMap.get(
                    JSON.stringify(JSON.parse(request.body))
                  ) + 1
                );
              }
            } else {
              mapObject.requestMap.set(
                JSON.stringify(JSON.parse(request.body)),
                1
              );
              this.receiveRequest(JSON.parse(request.body));
              this.stompClient.send(
              "/app/friend/add/confirm",
              {},
              JSON.stringify(JSON.parse(request.body))
            );
            }
          },
          err => {
            // 连接发生错误时的处理函数
            console.log("/user/queue/friend/request Fail to connect");
            console.log(err);
          }
        );
        console.log("try to subscribe reply");
        this.stompClient.subscribe(
          "/user/queue/friend.reply",
          reply => {
            if (
              mapObject.replyMap.has(JSON.stringify(JSON.parse(reply.body)))
            ) {
              if (
                mapObject.replyMap.get(
                  JSON.stringify(JSON.parse(reply.body))
                ) == 3
              ) {
                mapObject.replyMap.delete(
                  JSON.stringify(JSON.parse(reply.body))
                );
              } else {
                mapObject.replyMap.set(
                  JSON.stringify(JSON.parse(reply.body)),
                  mapObject.replyMap.get(
                    JSON.stringify(JSON.parse(reply.body))
                  ) + 1
                );
              }
            } else {
              mapObject.replyMap.set(JSON.stringify(JSON.parse(reply.body)), 1);
              this.requestResult(JSON.parse(reply.body));
              this.stompClient.send(
              "/app/friend/check/confirm",
              {},
              JSON.stringify(JSON.parse(reply.body))
            );
            }
          },
          err => {
            // 连接发生错误时的处理函数
            console.log("/user/queue/friend/reply fail to connect");
            console.log(err);
          }
        );
      });
    },
    showGreeting(message) {
      //当前界面不是chat界面，显示MessageBadge
      if (this.$route.name != "chat") this.messageBadge = 1;
      //接受后端的信息并显示,聊天对象未加入chatList，新建对象插入chatList
      //更新unreadMessage
      console.log(message.timeStamp)
      var date = new Date(message.timeStamp);
      var Y = date.getFullYear()
      var M = date.getMonth()
      var D = date.getDate() 
      var h = date.getHours() 
      var m = date.getMinutes()
      var s = date.getSeconds()
      console.log("App.vue showGreeting");
      if (chatData.chatList.length == 0) {
        console.log("App.vue chatData.chatList is empty");
        chatData.chatList.push({
          name: message.name,
          id: 0,
          unreadMessageNum: 1
        });
        chatData.messageList.push([
          {
            content: message.content,
            myself: false,
            participantId: 0,
            timestamp: {
              year: Y,
              month: M,
              day: D,
              hour: h,
              minute: m,
              second: s,
              millisecond: 123
            },
            uploaded: true,
            viewed: true
          }
        ]);
        return;
      }
      for (var i = 0, len = chatData.chatList.length; i < len; i++) {
        if (chatData.chatList[i].name == message.name) {
          chatData.messageList[i].push({
            content: message.content,
            myself: false,
            participantId: i,
            timestamp: {
              year: Y,
              month: M,
              day: D,
              hour: h,
              minute: m,
              second: s,
              millisecond: 123
            },
            uploaded: true,
            viewed: true
          });
          if (chatData.current[0].name != message.name) {
            console.log("unreadMessageNum++");
            chatData.chatList[i].unreadMessageNum++;
          } else {
            console.log("unreadMessageNum=0");
            chatData.chatList[i].unreadMessageNum = 0;
          }
          break;
        }
        if (i == len - 1) {
          chatData.chatList.push({
            name: message.name,
            id: i + 1,
            unreadMessageNum: 1
          });
          chatData.messageList.push([
            {
              content: message.content,
              myself: false,
              participantId: i + 1,
              timestamp: {
                year: 2014,
                month: 3,
                day: 5,
                hour: 20,
                minute: 10,
                second: 3,
                millisecond: 123
              },
              uploaded: true,
              viewed: true
            }
          ]);
        }
      }
    },
    onSubmitInvitation(formItem) {
      //发好友申请
      console.log("This is App.vue's submitInvitation()");
      this.stompClient.send(
        "/app/friend/add",
        {},
        JSON.stringify({
          targetName: formItem.targetName,
          selfIntro: formItem.selfIntro
        })
      );
      this.$Message.success("Invitation is send!");
    },
    receiveRequest(request) {
      //收好友申请
      if (this.$route.name != "invitation") this.invitationBadge = 1;
      invitationData.requests.push({
        id: request.id,
        selfIntro: request.selfIntro,
        username: request.username
      });
    },
    onSubmitReply(reply) {
      //发回应
      this.stompClient.send(
        "/app/friend/check",
        {},
        JSON.stringify({
          id: reply.id,
          acceptStatus: reply.acceptStatus
        })
      );
    },
    requestResult(result) {
      //收回应
      if (this.$route.name != "invitation") this.invitationBadge = 1;
      if (invitationData.myRequests.length == 0) {
        invitationData.myRequests.push({
          targetName: result.targetName,
          receive: true,
          acceptStatus: result.acceptStatus
        });
        return;
      }
      for (var i = 0, len = invitationData.myRequests.length; i < len; i++) {
        if (invitationData.myRequests[i].targetName == result.targetName) {
          invitationData.myRequests[i].receive = true;
          invitationData.myRequests[i].acceptStatus = result.acceptStatus;
          break;
        }
        if (i == len - 1) {
          invitationData.myRequests.push({
            targetName: result.targetName,
            receive: true,
            acceptStatus: result.acceptStatus
          });
        }
      }
    },
    readUnreadAddFriendRequest(unreadList) {
      if (unreadList.length != 0) this.invitationBadge = 1;
      for (var i = 0, len = unreadList.length; i < len; i++) {
        this.receiveRequest(unreadList[i]);
      }
    },
    readUnreadAddFriendReply(unreadList) {
      if (unreadList.length != 0) this.invitationBadge = 1;
      for (var i = 0, len = unreadList.length; i < len; i++) {
        this.requestResult(unreadList[i]);
      }
    }
  }
};
</script>
