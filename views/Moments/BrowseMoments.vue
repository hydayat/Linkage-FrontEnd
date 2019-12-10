<template>
	<div>
		<br>
		<h1 style="margin-top:10px;text-align: center;">Browse Moments</h1>
		<Divider />		
		<List v-for='moment in moments' :key='moment.id' >
			<MomentItem 
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
	import data from '../../mock/checkMoment.js'
	import MomentItem from '../../components/MomentItem.vue'
	export default{
		components:{
			MomentItem
		},
		data(){
			return{
				moments:[]
			}
		},
		props:{
			myName:String
		},
		mounted(){
			//查看好友们的朋友圈
			//var url = 'https://www.saturnluo.cn/moment/check'
			var url = '/moment/check'
			this.$axios
				.get(url)
				.then(response=>{
					this.moments = response.data
					console.log(this.moments)
				})
				.catch(error=>{
					this.$Message.error("Fail!")
				})
		}
	}
</script>

<style>
</style>
