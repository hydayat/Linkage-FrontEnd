<template>
	<div>
		<Button 
		type="primary" 
		shape="circle" 
		icon="ios-arrow-back" 
		style="margin:10px;" 
		:to="{
			path:'subscriptionDetail',
			name:'subscriptionDetail',
			params:{
				subscriptionName:this.username,
				currentPage:currentPage,
			}
		}">Back</Button>
		<h1 style="margin-top:10px;text-align: center;">{{username}}'s Posts</h1>
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
import PostItem from '../../components/PostItem.vue'
	export default{
		components:{
			PostItem
		},
		data(){
			return{
				username:'',
				currentPage:0,//该订阅在订阅列表中的第几页
				posts:[]
			}
		},
		props:{
			myName:String
		},
		mounted() {
			this.username = this.$route.params.subscriptionName
			this.currentPage = this.$route.params.currentPage
			var url = '/post/?username='+this.username
			//var url = '/moment/check'
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
		},
		methods:{
			
		}
	}
</script>

<style>
</style>
