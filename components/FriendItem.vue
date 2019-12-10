<template>
  <div>
    <Card :bordered="true" style="width:400px;display:nline-block;">
      <div>
        <div class="horizontal">
          <Avatar shape="square" icon="ios-person" :src="iconUrl" size="100" />
        </div>
        <div class="horizontal">
          <h1>
            {{ username }}
            <Icon :type="sex==1?'md-man':'md-woman'" />
          </h1>
          <p>{{ description }}</p>
        </div>
      </div>
    </Card>
    <ButtonGroup vertical style="display: inline-block;">
      <Button icon="md-send" v-on:click="chat()"></Button>
      <Button icon="md-person" v-on:click="friendDetail()"></Button>
      <Button icon="md-cut" v-on:click="deleteFriend()"></Button>
    </ButtonGroup>
  </div>
</template>

<script>
//import data from "../mock/deleteFriend.js";
import eventBus from "../eventBus/friendsBus";
export default {
  beforeDestroy() {
    //eventBus.$destroy()
  },
  props: {
    username: String,
    description: String,
    iconUrl: String,
    sex: Number,
    currentPage: Number //该组件在好友列表中的页数
  },
  methods: {
    friendDetail() {
      //跳转到朋友主页，并且将朋友的名字写在路由参数中
      console.log(
        "Before going to FriendDetail.vue, FriendItem's currentPage is " +
          this.currentPage
      );
      this.$router.push({
        path: "friendDetail",
        name: "friendDetail",
        params: {
          friendName: this.username,
          currentPage: this.currentPage
        }
      });
    },
    chat() {
      //切换路由及菜单栏
      console.log("FriendItem is emitting changeActiveName...");
      this.$emit("changeActiveName");
      console.log("FriendItem is changing router...");
      this.$router.push({
        name: "chat",
        params: {
          name: this.username
        }
      });

      //以下内容待修改
      //console.log('FriendItem is emitting wantToChat...')
      //eventBus.$emit('wantToChat', this.username)
    },
    deleteFriend: function() {
      var url = "/user/myFriend?friendName=" + this.username;
      this.$axios
        .delete(url)
        .then(response => {
          this.$emit("deleteFriend", this.username);
          this.$Message.success("Success");
        })
        .catch(error => {
          this.$Message.error("Fail");
          console.log(error);
        });
    }
  }
};
</script>

<style>
.horizontal {
  display: inline-block;
  margin: 10px;
}
</style>
