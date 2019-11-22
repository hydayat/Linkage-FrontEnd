<template>
	<div style="margin-top: 10px">
		<Button
		type="primary" 
		shape="circle" 
		icon="ios-arrow-back" 
		style="margin:10px;" 
		to="account">Back</Button>
		<h1 style="margin-top:10px;text-align: center;">Followers</h1>
		<Divider />
		<div style="display: flex;justify-content: space-around;">
			<div style='display: inline-block;'>
				<List v-for='friend in friends_1' :key='friend.id' style='margin-top: 10px;' border>
					<AddFriendItem 
						:username='friend.username' 
						:description='friend.description' 
						:iconUrl='friend.iconUrl' 
						:sex='friend.sex'></AddFriendItem>
				</List>
			</div>
			<div style='display: inline-block;'>
				<List v-for='friend in friends_2' :key='friend.id' style='margin-top: 10px;' border>
					<AddFriendItem 
						:username='friend.username' 
						:description='friend.description' 
						:iconUrl='friend.iconUrl' 
						:sex='friend.sex'></AddFriendItem>
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
	import AddFriendItem from '../../components/AddFriendItem.vue';
	//import data from '../../mock/followers.js';
	export default {
		created(){
			console.log('...................................Followers Page is created ...................................')
		},
		beforeDestroy(){
			
			console.log('...................................Followers Page is destroyed ...................................')
		},
		data() {
			return {
				pageSize:6,
				numTotal: 0,
				friends: [],//该页所有的followers
				friends_1:[],//该页第一栏followers
				friends_2:[],//该页第二栏followers
				currentPage:0,
			}
		},
		components: {
			AddFriendItem
		},
		mounted: function() {
			this.currentPage = this.$route.params.currentPage
			//console.log(this.currentPage)
			this.changePage(this.currentPage);
		},
		methods: {
			addFriend: function(){
				this.$Message.info('Have send the invitation.');
			},
			changePage:function(pageIndex){
				var url = '/user/globalAccount/me/followerList?currentPage=' + pageIndex + '&pageSize='+this.pageSize;
				this.$axios
					.get(url)
					.then(response => {
						this.currentPage = pageIndex
						console.log('After changing page, Followers.vue\'s currentPage is '+this.currentPage)
						this.numTotal = response.data.totalNumber;
						this.friends = response.data.followerList;
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
