<template>
	<div>
		<br>
		<h1 style="margin-top:10px;text-align: center;">My Post</h1>
		<Divider />		
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
	//import data from '../../mock/checkMoment.js'
	import PostItem from '../../components/PostItem.vue'
	export default{
		components:{
			PostItem
		},
		data(){
			return{
				posts:[]
			}
		},
		props:{
			myName:String
		},
		mounted(){
			//查看好友们的朋友圈
			var url = '/post/check'
			this.$axios
				.get(url)
				.then(response=>{
					console.log(response)
					this.posts = response.data
					console.log(this.posts)
				})
				.catch(error=>{
					this.$Message.error("Fail!")
				})
		}
	}
</script>

<style>
</style>
