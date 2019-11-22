<template>
	<div style="margin-top: 10px">
		<Button type="primary" shape="circle" icon="md-arrow-back" style="margin:10px;" to="subscription">Back</Button>
		<h1 style="margin-top:10px;text-align: center;">Add Subscription</h1>
		<center style="margin-top:10px;">
			<i-input placeholder="Search Global Account" style='width: 200px;' v-model='searchUsername'>
				<Button slot="append" icon="ios-search" v-on:click='searchFriend()'></Button>
			</i-input>
		</center>
		<Divider />
		<div style="display: flex;justify-content: space-around;">
			<div style='display: inline-block;'>
				<List v-for='friend in friends_1' :key='friend.id' style='margin-top: 10px;' border>
					<AddSubscriptionItem :username='friend.username' :description='friend.description' :iconUrl='friend.iconUrl'></AddSubscriptionItem>
				</List>
			</div>
			<div style='display: inline-block;'>
				<List v-for='friend in friends_2' :key='friend.id' style='margin-top: 10px;' border>
					<AddSubscriptionItem :username='friend.username' :description='friend.description' :iconUrl='friend.iconUrl'></AddSubscriptionItem>
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
	import AddSubscriptionItem from '../../components/AddSubscriptionItem.vue';
	//import data from '../../mock/searchGlobalAccount.js';
	export default {
		data() {
			return {
				
				pageSize: 6,
				numTotal: 0, //所有匹配的公众号
				friends: [], //该页所有的公众号
				friends_1: [], //该页第一栏公众号
				friends_2: [], //该页第二栏公众号
				searchUsername: '',
			}
		},
		components: {
			AddSubscriptionItem
		},
		methods: {
			searchFriend: function() {
				//更新搜索结果
				this.changePage(1);
			},
			changePage: function(pageIndex) {
				// var url = 'http://localhost:8080/user/globalAccount/all?'
				// 		+ 'globalName=' + this.searchUsername
				// 		+ '&currentPage=' + pageIndex
				// 		+ '&pageSize=' + this.pageSize
				var url = '/user/globalAccount/all?'
						+ 'globalName=' + this.searchUsername
						+ '&currentPage=' + pageIndex
						+ '&pageSize=' + this.pageSize
				this.$axios
					.get(url)
					.then(response => {
						this.numTotal = response.data.totalNumber;
						this.friends = response.data.globalUserList;
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
