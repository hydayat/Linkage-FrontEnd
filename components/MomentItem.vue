<template>
	<div style="padding: 20px;">
		<Card :bordered="false" style="width:700px; margin:0 auto;">
			<div slot="title" style="display: flex;justify-content: flex-start;">
				<div>
					<Avatar shape="square" icon="ios-person" size=50 />
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
				<Button shape="circle" style="border-color: #FFFFFF;">
					<Icon type="md-more" size="30"/>
				</Button>
			</div>			
		</Card>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				// username: "Gay Luo",
				// time: "2019/11/9",
				// content: "姐姐，今夜我在德令哈，夜色笼罩\n姐姐，我今夜只有戈壁\n草原尽头我两手空空\n悲痛时握不住一颗泪滴\n姐姐，今夜我在德令哈\n这是雨水中一座荒凉的城\n除了那些路过的和居住的\n德令哈......今夜\n这是唯一的，最后的，抒情。\n这是唯一的，最后的，草原。\n我把石头还给石头\n让胜利的胜利\n今夜青稞只属于他自己\n一切都在生长\n今夜我只有美丽的戈壁 空空\n姐姐，今夜我不关心人类，我只想你。"
			}
		},
		props:{
			username:String,
			time:String,
			content:String,
			imgs:[],
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
