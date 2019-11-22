<template>
	<div style="margin-top: 10px">
		<Button type="primary" shape="circle" icon="md-add" style="margin:10px;" to="addFriend">Add</Button>
		<h1 style="margin-top:10px;text-align: center;">Friends List</h1>
		<Divider />
		<div style="display: flex;justify-content: space-around;">
			<div style='display: inline-block;'>
				<List v-for='friend in friends_1' :key='friend.id' style='margin-top: 10px;' border>
					<FriendItem 
						:username='friend.username' 
						:description='friend.description' 
						:iconUrl='friend.iconUrl' 
						:sex='friend.sex'
						:currentPage='currentPage'
						@deleteFriend='deleteFriend1'
						@changeActiveName='changeActiveName'></FriendItem>
				</List>
			</div>
			<div style='display: inline-block;'>
				<List v-for='friend in friends_2' :key='friend.id' style='margin-top: 10px;' border>
					<FriendItem 
						:username='friend.username' 
						:description='friend.description' 
						:iconUrl='friend.iconUrl' 
						:sex='friend.sex'
						:currentPage='currentPage'
						@deleteFriend='deleteFriend2'
						@changeActiveName='changeActiveName'></FriendItem>
				</List>
			</div>
		</div>
		<br>
		<div style="display: flex;justify-content: center;">
			<Page :total="numTotal" :page-size='pageSize' @on-change="changePage" :current='currentPage'/>
		</div>
	</div>
</template>

<script>
	import FriendItem from '../../components/FriendItem.vue';
	//import data from '../../mock/friends.js';
	export default {
		created(){
			console.log('...................................Friends Page is created ...................................')
		},
		beforeDestroy(){
			
			console.log('...................................Friends Page is destroyed ...................................')
		},
		data() {
			return {
				pageSize:6,
				numTotal: 0,
				friends: [],//该页所有的好友
				friends_1:[],//该页第一栏好友
				friends_2:[],//该页第二栏好友
				isSearch: false,
				searchUsername:'',
				currentPage:0,
			}
		},
		components: {
			FriendItem
		},
		mounted: function() {
			this.currentPage = this.$route.params.currentPage
			this.changePage(this.currentPage);
		},
		methods: {
			changeActiveName(){
				console.log('Friends is emitting ...')
				this.$emit('changeActiveName','2-2')
			},
			deleteFriend1(username){
				var i
				for(i = 0; i < this.friends_1.length; i++){
					if(this.friends_1[i].username == username){
						this.friends_1.splice(i, 1)
						break
					}
				}
				this.numTotal--
			},
			deleteFriend2(username){
				var i
				for(i = 0; i < this.friends_2.length; i++){
					if(this.friends_2[i].username == username){
						this.friends_2.splice(i, 1)
						break
					}
				}
			},
			addFriend: function(){
				this.$Message.info('Have send the invitation.');
			},
			closeSearchResult: function(){
				this.isSearch = false;
			},
			changePage:function(pageIndex){
				//var url = 'https://www.saturnluo.cn/user/myFriend?currentPage=' + pageIndex + '&pageSize='+this.pageSize;
				var url = '/user/myFriend?currentPage=' + pageIndex + '&pageSize='+this.pageSize;
				this.$axios
					.get(url)
					.then(response => {
						this.currentPage = pageIndex
						console.log('After changing page, Friends.vue\'s currentPage is '+this.currentPage)
						this.numTotal = response.data.totalNumber;
						this.friends = response.data.friendList;
						var numFriends = this.friends.length;
						this.friends_1 = this.friends.slice(0,(numFriends+1)/2);
						this.friends_2 = this.friends.slice((numFriends+1)/2 , numFriends);
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
