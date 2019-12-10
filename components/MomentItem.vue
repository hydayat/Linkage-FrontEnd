<template>
	<div style="padding: 20px;">
		<Modal v-model="modal" width="360">
			<p slot="header" style="text-align: center;">
				<Icon type="ios-brush"></Icon>
				<span>Comment</span>
			</p>
			<Form style="margin:auto">
				<FormItem>
					<Input v-model="myCommentContent" show-word-limit type="textarea" placeholder="Enter something..." maxlength="300"
					 :autosize="{minRows: 3,maxRows: 5}"></Input>
				</FormItem>
			</Form>
			<div slot="footer">
				<Button type="primary" size="large" long @click="submit()">Submit</Button>
			</div>
		</Modal>
		<Card :bordered="false" style="width:700px; margin:0 auto;">
			<div slot="title" style="display: flex;justify-content: flex-start;">
				<div>
					<Avatar shape="square" icon="ios-person" size=50 :src='poster_icon' />
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
					<img :src="img" style="width:200px; height: 200px;margin:5px;" />
				</List>
			</div>
			<div style="display: flex;justify-content: flex-end;margin-top: 10px;">
				<Button shape="circle" style="border-color: #FFFFFF;" v-on:click="like">
					<Icon :type="self_like==true? 'md-heart' : 'md-heart-outline'" v-bind:style="{color: self_like==true? 'crimson':'#000000'}"
					 size="30" />
				</Button>
				<Button shape="circle" style="border-color: #FFFFFF;" v-on:click='writeComment'>
					<Icon type="ios-chatbubbles-outline" size="30" style="color: #000000;" />
				</Button>
				<Button shape="circle" style="border-color: #FFFFFF;">
					<Icon type="md-more" size="30" style="color: #000000;" />
				</Button>
			</div>
			<Divider v-if="likers_string == ''? false : true"/>
			<div style="display: flex;" v-if="likers_string == ''? false : true">
				<Icon type="md-heart" size="20" style="margin-top: 3px;" />
				<p style="margin-left: 20px;font-size: 15px;">{{likers_string}}</p>
			</div>
			<Divider v-if="comments.length == 0? false : true"/>
			<div v-if="comments.length == 0? false : true" style="display: flex;margin-top: 10px;">
				<Icon type="ios-chatbubbles" size="20" style="margin-top: 15px;" />
				<div>
					<List style="margin-left: 20px;">
						<ListItem v-for='comment in comments' :key='comment.id' style="display: flex;word-wrap: break-word;">
							<h3 style="color: cornflowerblue;">{{comment.commenter}}：</h3>
							<p style="margin-top:2.5px;">{{comment.content}}</p>
						</ListItem>
					</List>
				</div>
			</div>
		</Card>
	</div>
</template>

<script>
	//import data from '../mock/cancelLiking.js'
	//import data2 from '../mock/liking.js'
	//import data3 from '../mock/submitComment.js'
	export default {
		data() {
			return {
				modal:false,
				myCommentContent:'',
				likers_string: "",
				activeColor: '#272296',
				self_like: false,
			}
		},
		props: {
			myName: String,
			id: Number,
			username: String, //发布该朋友圈的用户的名字
			time: String,
			content: String,
			imgs: Array,
			poster_icon: String,
			likers_list: Array,
			comments: Array,
			self_like_temp: Boolean
		},
		mounted() {
			console.log("MomentItem.vue mounted.")
			//更新点赞者列表
			this.updateLiker_string()
			this.self_like = this.self_like_temp
		},
		methods: {
			submit(){
				var url = '/moment/comment/add'
				this.$axios
					.post(url,{
						MomentId: this.id,
						Comment: this.myCommentContent
					})
					.then(response=>{
						this.comments.push({
							id: this.id,
							commenter: this.myName,
							moment_id: 20,
							content: this.myCommentContent
						})
						this.modal = false
					})
					.catch(error=>{
						this.$Message.error("Fail to submit comment.")
					})
					
			},
			writeComment(){
				this.modal = true
			},
			like() {
				if (this.self_like == true) {
					//取消点赞

					var url = '/moment/like?MomentId=' + this.id + "&Action=cancel"
					this.$axios
						.post(url)
						.then(response => {
							//更改点赞图标样式
							this.self_like = false
							//删除点赞人列表中的自己
							var i = 0
							for (i = 0; i < this.likers_list.length; i++) {
								if (this.likers_list[i].liker == this.myName) {
									this.likers_list.splice(i, 1)
									break
								}
							}
							this.updateLiker_string()
						})
						.catch(e => {
							this.$Message.error("Fail to cancel liking.")
						})
				} else {
					//点赞
					url = '/moment/like?MomentId=' + this.id + "&Action=like"
					this.$axios
						.post(url)
						.then(response => {
							//更改点赞图标样式
							this.self_like = true
							//在点赞列表中新增自己
							this.likers_list.push({
								"liker": this.myName,
								"moment_id": this.id,
							})
							this.updateLiker_string()
						})
						.catch(e => {
							this.$Message.error("Fail to like.")
						})
				}
			},
			updateLiker_string() {
				if (this.likers_list.length > 0) { //如果有点赞者
					this.likers_string = ""
					var i
					for (i = 0; i < this.likers_list.length; i++) {
						if (i == 0) {
							this.likers_string += this.likers_list[i].liker
						} else {
							this.likers_string += '、' + this.likers_list[i].liker
						}
					}
				} else //没有点赞者
					this.likers_string = ''
			}
		}
	}
</script>

<style>
	.horizontal {
		display: inline-block;
		margin: 10px;
	}

	.icon {
		margin-left: 10px;
		margin-right: 10px;
	}
</style>
