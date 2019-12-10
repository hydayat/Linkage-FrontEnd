<template>
	<div style="padding: 20px;">
		<Card :bordered="false" style="width:700px; margin:0 auto;">
			<div slot="title" style="display: flex;justify-content: flex-start;">
				<div>
					<Avatar shape="square" icon="ios-person" size=50 :src='poster_icon'/>
				</div>
				<div style="margin-left: 15px;">
					<h2>{{ username }}</h2>
					<p style="margin-top: 5px;font-size: 12px;">{{ time }}</p>
				</div>
			</div>
			<div style="margin-bottom: 15px;">
				{{content}}
			</div>
			<div style="display: flex;justify-content: flex-start;">
				<List v-for='img in imgs' :key='img.id'>
					<img :src="img" style="width:200px; height: 200px;margin:5px;"/>
				</List>
			</div>
			<Divider/>
			<div style="display: flex;justify-content: flex-end;">
				<Button shape="circle" style="border-color: #FFFFFF;">
					<Icon type="md-heart-outline" size="30" />
				</Button>
				<Button shape="circle" style="border-color: #FFFFFF;">
					<Icon type="ios-chatbubbles" size="30"/>
				</Button>
				<Button shape="circle" style="border-color: #FFFFFF;" v-on:click='deleteMoment()'>
					<Icon type="ios-trash-outline" size="30"/>
				</Button>
				<Button shape="circle" style="border-color: #FFFFFF;">
					<Icon type="md-more" size="30"/>
				</Button>
			</div>			
		</Card>
	</div>
</template>

<script>
	import data from '../mock/deleteMoments.js'
	export default {
		data() {
			return {
				
			}
		},
		methods:{
			deleteMoment(){
				var url = '/moment/delete?id='+this.id
				this.$axios
					.post(url)
					.then(response=>{
						this.$emit('deleteMoment',this.id)
						this.$Message.success('Success')
					})
					.catch(error=>{
						this.$Message.error('Fail')
					})
			}
		},
		props:{
			id:Number,
			username:String,
			time:String,
			content:String,
			imgs:[],
			poster_icon:String,
		}
	}
</script>

<style>
	.horizontal {
		display: inline-block;
		margin: 10px;
	}
	.icon{
		margin-left: 10px;
		margin-right: 10px;
	}
</style>
