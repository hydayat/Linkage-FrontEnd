<template>
	<div>
		<Button 
		type="primary" 
		shape="circle" 
		icon="ios-arrow-back" 
		style="margin:10px;" 
		:to="{
			path:'friendDetail',
			name:'friendDetail',
			params:{
				friendName:username,
				currentPage:currentPage,
			}
		}">Back</Button>
		<h1 style="margin-top:10px;text-align: center;">{{username}}'s Moments</h1>
		<Divider />
		<List v-for='moment in moments' :key='moment.id' >
			<MomentItem
				:isMyPost="false"
				:self_like_temp='moment.self_like'
				:id='moment.id'
				:username='moment.poster_name'
				:time='moment.time'
				:content='moment.text'
				:imgs='moment.img'
				:poster_icon='moment.poster_icon'
				:likers_list='moment.like'
				:comments='moment.comment'
				:myName='myName'>
			</MomentItem>
		</List>
	</div>
</template>

<script>
	import MomentItem from '../../components/MomentItem.vue';
	export default{
		components:{
			MomentItem
		},
		data(){
			return{
				username:'',
				currentPage:0,//该好友在好友列表中的第几页
				moments:[]
			}
		},
		props:{
			myName:String
		},
		mounted() {
			this.username = this.$route.params.friendName
			this.currentPage = this.$route.params.currentPage
			
			//初始化朋友圈
			var url = '/moment/home?username=' + this.username
			this.$axios
				.get(url)
				.then(response=>{
					this.moments = response.data
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
