<template>
	<div>
		<Button type="primary" shape="circle" icon="md-arrow-back" style="margin:10px;" to="account">Back</Button>
		<h1 style="text-align: center;">My Moments</h1>
		<Divider/>
		<List v-for='moment in moments' :key='moment.id' >
			<MyMomentItem 
				:poster_icon='poster_icon'
				:username='moment.poster_name'
				:time='moment.time'
				:content='moment.text'
				:imgs='moment.img'
				:id='moment.id'
				@deleteMoment='deleteMoment'>
			</MyMomentItem>
		</List>
	</div>
</template>

<script>
	//import data from '../../mock/checkMoment.js'
	import MyMomentItem from '../../components/MyMomentItem.vue';
	export default{
		components:{
			MyMomentItem
		},
		data(){
			return{
				moments:[]
			}
		},
		methods:{
			deleteMoment(id){
				var i
				for(i = 0; i < this.moments.length; i++){
					if(this.moments[i].id == id){
						this.moments.splice(i, 1)
						break
					}
				}
			}
		},
		mounted(){
			//查看好友们的朋友圈
			//var url = 'https://www.saturnluo.cn/moment/check'
			var url = '/moment/home'
			this.$axios
				.get(url)
				.then(response=>{
					this.moments = response.data
				})
		}
	}
</script>

<style>
</style>
