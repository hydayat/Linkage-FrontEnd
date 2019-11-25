<template>
  <div>
    <br />
    <h1 style="margin-top:10px;text-align: center;">Chat</h1>
    <Divider />
    <Layout>
      <Sider hide-trigger>
        <Menu ref="menu" :active-name="current[0].id " :open-names="['4']" style="width:auto">
          <Submenu name="4">
            <template slot="title">
              <Icon type="md-body" />ChatList
            </template>
            <MenuItem
              v-for="(persion,index) in chatList"
              :name="index"
              :key="persion.name"
              @click.native="change(index)"
            >{{persion.name}}</MenuItem>
          </Submenu>
        </Menu>
      </Sider>
      <Layout>
        <Content>
          <div class="content">
            <div class="chat-container">
              <Chat
                v-if="visible"
                :participants="current"
                :myself="myself"
                :messages="currentMessage"
                :onType="onType"
                :onMessageSubmit="onMessageSubmit"
                :chatTitle="chatTitle"
                :placeholder="placeholder"
                :colors="colors"
                :borderStyle="borderStyle"
                :onClose="onClose"
                :hideCloseButton="hideCloseButton"
                :closeButtonIconSize="closeButtonIconSize"
                :submitIconSize="submitIconSize"
                :asyncMode="asyncMode"
              >
                <template v-slot:header>
                  <div class="header-slot">
                    <a
                      v-for="(participant, index) in current"
                      :key="index"
                      class="custom-title"
                    >{{`${participant.name} `}}</a>
                  </div>
                </template>
              </Chat>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>
<script>
import val from "./chatData.js";
import { Chat } from "vue-quick-chat";
import moment from "moment";
// import SockJS from "sockjs-client";
// import Stomp from "stompjs";
export default {
  name: "app",
  components: {
    Chat
  },
  created() {
    console.log("Chat.vue is created");
	//清掉MessageBadge
	this.$emit('clearMessageBadge')
  },
  mounted() {
    // this.initWebSocket(); //建立连接
    this.change(0); //选中列表中第0个
    // console.log('......................................................................')
    // console.log('......................................................................'+this.$route.params.name)
    // console.log('......................................................................')
    this.fun1(this.$route.params.name);
    console.log("Chat.vue is mounted");
  },
  beforeDestroy: function() {
    // 页面离开时断开连接,清除定时器
    console.log("Chat.Vue is beforeDestroy");
    // this.disconnect();
    // clearInterval(this.timer);
  },
  data() {
    return val;
  },
  methods: {
    change(index) {
      if (this.chatList.length == 0) {
        return;
      }
      //切换聊天对象
      this.current[0].name = this.chatList[index].name;
      this.current[0].id = this.chatList[index].id;
      this.currentMessage = this.messageList[index];
      this.$refs.menu.updateActiveName();
    },
    onType: function(e) {
      //输入时的回调函数，暂未使用
      console.log("typing");
    },
    onMessageSubmit(message) {
      this.$emit("submitMessage", message);
    },
    // onMessageSubmit(message) {
    // 	//点击发送的回调函数
    // 	console.log(this.currentMessage);
    // 	this.currentMessage.push(message);
    // 	this.stompClient.send(
    // 		//发送到后端
    // 		"/app/chat", {},
    // 		JSON.stringify({
    // 			to: this.current[0].name, // 发给谁
    // 			content: message.content, // 内容是啥
    // 			name: this.myself.name // 谁发的
    // 		})
    // 	);
    // 	// timeout simulating the request
    // 	setTimeout(() => {
    // 		//发送延迟，2秒后显示发送成功
    // 		message.uploaded = true;
    // 	}, 2000);
    // },
    onClose() {
      //关闭按钮的回调函数暂未使用
      this.visible = false;
    },
    // connect() {
    // 	//socket连接函数
    // 	this.socket = new SockJS("/chat");
    // 	this.stompClient = Stomp.over(this.socket);
    // 	this.stompClient.connect({}, frame => {
    // 		//serConnected(true);
    // 		// 第一个参数是地址，不要改
    // 		// 第二个参数是回调函数，在有新消息传过来之后会自动被调用
    // 		// 输入的参数是消息
    // 		this.stompClient.subscribe(
    // 			"/user/queue/chat",
    // 			greeting => {
    // 				this.showGreeting(JSON.parse(greeting.body));
    // 			},
    // 			err => {
    // 				// 连接发生错误时的处理函数
    // 				console.log(err);
    // 			}
    // 		);
    // 	});
    // },
    // initWebSocket() {
    // 	//初始化连接接口
    // 	this.connect();
    // },
    removeTab(targetName) {
      //删除标签回调函数（暂未使用）
      console.log(targetName);
    },
    // showGreeting(message) {
    // 	//接受后端的信息并显示,聊天对象未加入chatList，新建对象插入chatList
    // 	console.log("showGreeting");
    // 	for (var i = 0, len = this.chatList.length; i < len; i++) {
    // 		if (this.chatList[i].name == message.name) {
    // 			this.messageList[i].push({
    // 				content: message.content,
    // 				myself: false,
    // 				participantId: i,
    // 				timestamp: {
    // 					year: 2014,
    // 					month: 3,
    // 					day: 5,
    // 					hour: 20,
    // 					minute: 10,
    // 					second: 3,
    // 					millisecond: 123
    // 				},
    // 				uploaded: true,
    // 				viewed: true
    // 			});
    // 			break;
    // 		}
    // 		if (i == len - 1) {
    // 			this.chatList.push({
    // 				name: message.name,
    // 				id: i
    // 			});
    // 			this.messageList.push([{
    // 				content: message.content,
    // 				myself: false,
    // 				participantId: i,
    // 				timestamp: {
    // 					year: 2014,
    // 					month: 3,
    // 					day: 5,
    // 					hour: 20,
    // 					minute: 10,
    // 					second: 3,
    // 					millisecond: 123
    // 				},
    // 				uploaded: true,
    // 				viewed: true
    // 			}]);
    // 		}
    // 	}
    // },
    // disconnect() {
    // 	//断开连接
    // 	if (this.stompClient !== null) {
    // 		this.stompClient.disconnect();
    // 	}
    // },
    fun1(val) {
      if (val == "") return;
      if (this.chatList.length == 0) {
        this.messageList.push([]);
        this.chatList.push({
          name: val,
          id: this.chatList.length
        });
        this.change(0);
        return;
      }
      for (var i = 0, len = this.chatList.length; i < len; i++) {
        if (this.chatList[i].name == val) {
          this.change(i);
          break;
        }
        if (i == len - 1) {
          this.messageList.push([]);
          this.chatList.push({
            name: val,
            id: i + 1
          });
          this.change(i + 1);
        }
      }
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.content {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
}

.chat-container {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(247, 243, 243);
  padding: 10px 0 10px 0;
  height: 700px;
  width: 800px;
}

.external-controller {
  background: #2c3e50;
  height: 300px;
  width: 600px;
  display: flex;
  color: #eee;
}

.controller-btn-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  flex-wrap: wrap;
}

.btn-message {
  cursor: pointer;
  background: #eee;
  border: none;
  height: 40px;
  color: #2c3e50;
  border-radius: 5px;
  outline: none;
  transition: 0.3s;
}

.btn-participant {
  cursor: pointer;
  background: #eee;
  border: none;
  height: 40px;
  color: #2c3e50;
  border-radius: 5px;
  outline: none;
  transition: 0.3s;
}

.btn-message:hover {
  background: rgb(255, 255, 255);
}

.custom-title {
  color: #eee;
}

.header-slot {
  max-height: 100%;
}
</style>
