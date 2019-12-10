<template>
	<div>
		<h1 style="margin-top:10px; text-align:center;">BrowseOthers</h1>
		<Divider/>
		<Menu mode="horizontal" :theme="theme1" active-name="1">
			<MenuItem name="1" v-on:click.native="showTrending">
				<Icon type="ios-paper" />
				Trending 
			</MenuItem>
			<MenuItem name="2" v-on:click.native="showMySubscription">
				<Icon type="ios-people"/>
				My Supscription 
			</MenuItem>
		</Menu>
		<List v-for='post in posts' :key='post.id' >
			<PostItem 
				:id ='post.id'
				:poster_name='post.poster_name'
				:time='post.time'
				:poster_icon='post.poster_icon'
				:postAbstract='post.postAbstract'
				:likerList='post.like'
				:comment='post.comment'
				:myName='myName'
				:self_like_temp='post.self_like'>
			</PostItem>
		</List>
	</div>
</template>
<script>
	import PostItem from '../../components/PostItem.vue'
	export default {
		components: {
			PostItem
		},
		data() {
			return {
				theme1: 'light',
				posts: [],
			}
		},
		props: {
			myName: String
		},
		mounted() {
			//查看好友们的朋友圈
			var url = '/post/check'
			this.$axios
				.get(url)
				.then(response => {
					console.log(response)
					this.posts = response.data
					console.log(this.posts)
				})
				.catch(error => {
					this.$Message.error("Fail!")
				})
		},
		methods: {
			showTrending() {
				var url = '/post/check'
				this.$axios
					.get(url)
					.then(response => {
						console.log(response)
						this.posts = response.data
						console.log(this.posts)
					})
					.catch(error => {
						this.$Message.error("Fail!")
					})
			},
			showMySubscription() {
				var url = '/post/check'
				this.$axios
					.get(url)
					.then(response => {
						console.log(response)
						this.posts = response.data
						console.log(this.posts)
					})
					.catch(error => {
						this.$Message.error("Fail!")
					})
			}
		}
	}
</script>