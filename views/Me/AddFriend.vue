<template>
	<div style="margin-top: 10px">
		<Button type="primary" shape="circle" icon="md-arrow-back" style="margin:10px;" to="friends">Back</Button>
		<h1 style="margin-top:10px;text-align: center;">Add Friends</h1>
		<center style="margin-top:10px;">
			<i-input placeholder="Search New Friend" style='width: 200px;' v-model='searchUsername'>
				<Button slot="append" icon="ios-search" v-on:click='searchFriend()'></Button>
			</i-input>
		</center>
		<Divider />
		<div style="display: flex;justify-content: space-around;">
			<div style='display: inline-block;'>
				<List v-for='friend in friends_1' :key='friend.id' style='margin-top: 10px;' border>
					<AddFriendItem 
						:username='friend.username' 
						:description='friend.description'
						:iconUrl='friend.iconUrl'
						:sex='friend.sex'
						@submitInvitation='submitInvitation'>
					</AddFriendItem>
				</List>
			</div>
			<div style='display: inline-block;'>
				<List v-for='friend in friends_2' :key='friend.id' style='margin-top: 10px;' border>
					<AddFriendItem 
						:username='friend.username' 
						:description='friend.description'
						:iconUrl='friend.iconUrl'
						:sex='friend.sex'
						@submitInvitation='submitInvitation'>
					</AddFriendItem>
				</List>
			</div>
		</div>
		<br>
		<div style="display: flex;justify-content: center;">
			<Page :total="numTotal" :page-size='pageSize' @on-change="changePage" />
		</div>
	</div>
</template>

<script>
	import AddFriendItem from '../../components/AddFriendItem.vue';
	import data from '../../mock/searchUser.js';
	export default {
		data() {
			return {
				
				pageSize: 6,
				numTotal: 0, //所有匹配的用户
				friends: [], //该页所有的用户
				friends_1: [], //该页第一栏用户
				friends_2: [], //该页第二栏用户
				searchUsername: '',
			}
		},
		components: {
			AddFriendItem
		},
		methods: {
			submitInvitation(temp){
				console.log("This is AddFriend.vue's submitInvitation()")
				this.$emit('submitInvitation',temp)
			},
			searchFriend: function() {
				//更新搜索结果
				this.changePage(1);
			},
			changePage: function(pageIndex) {
				// var url = 'http://localhost:8080/user/newFriend?currentPage=' + pageIndex + '&pageSize=' + this.pageSize +
				// 	'&username=' + this.searchUsername;
				var url = '/user/newFriend?currentPage=' + pageIndex + '&pageSize=' + this.pageSize +
					'&username=' + this.searchUsername;
				this.$axios
					.get(url)
					.then(response => {
						this.numTotal = response.data.totalNumber;
						this.friends = response.data.friendList;
						var numFriends = this.friends.length;
						this.friends_1 = this.friends.slice(0, (numFriends + 1) / 2);
						this.friends_2 = this.friends.slice((numFriends + 1) / 2, numFriends);
					})
					.catch(function(error) {
						console.log(error);
					});
			}
		}
	}
</script>

<style>

</style>
