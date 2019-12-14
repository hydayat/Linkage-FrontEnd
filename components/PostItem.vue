<template>
	<div style="padding: 20px;">
		<Modal v-model="modal" width="360">
			<p slot="header" style="text-align: center;">
				<Icon type="ios-brush"></Icon>
				<span>Comment</span>
			</p>
			<Form style="margin:auto">
				<FormItem>
					<Input v-model="myPostContent" show-word-limit type="textarea" placeholder="Enter something..." maxlength="300"
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
					<h2>{{ poster_name }}</h2>
					<p style="margin-top: 5px;font-size: 12px;">{{ time }}</p>
				</div>
			</div>
			<div>
				<Collapse simple>
					<Panel name="1"  @click.native="showHTML">
						<font size="5">Title:{{postAbstract}}</font>
						<p slot="content" v-html="html">
						</p>
					</Panel>
				</Collapse>
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
			<Divider v-if="comment.length == 0? false : true"/>
			<div style="display: flex;margin-top: 10px;" v-if="comment.length == 0? false : true">
				<Icon type="ios-chatbubbles" size="20" style="margin-top: 15px;" />
				<div>
					<List style="margin-left: 20px;">
						<ListItem v-for='comment in comment' :key='comment.id' style="display: flex;word-wrap: break-word;">
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
				myPostContent:'',
				likers_string: "",
				activeColor: '#272296',
				self_like: false,
				html:""
			}
		},
		props: {
			myName:String,
            id: Number,
            poster_name: String,
            time: String,
            poster_icon: String,
            postAbstract: String,
            likerList: Array,
            comment: Array,
            self_like_temp: Boolean
		},
		mounted() {
			console.log("PostItem.vue mounted.")
			//更新点赞者列表
			this.updateLiker_string()
			this.self_like = this.self_like_temp
			if(this.comment==null){
				this.comment=[]
			}
			if(this.likerList==null){
				this.likerList=[]
			}
		},
		methods: {
			submit(){
				var url = '/post/comment/add'
				this.$axios
					.post(url,{
						PostId: this.id,
						Comment: this.myPostContent
					})
					.then(response=>{
						this.comment.push({
							id: this.id,
							commenter: this.myName,
							post_id: 20,
							content: this.myPostContent
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
					var url = '/post/like?PostId=' + this.id + "&Action=cancel"
					this.$axios
						.post(url)
						.then(response => {
							//更改点赞图标样式
							this.self_like = false
							//删除点赞人列表中的自己
							var i = 0
							for (i = 0; i < this.likerList.length; i++) {
								if (this.likerList[i].liker == this.myName) {
									this.likerList.splice(i, 1)
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
					url = '/post/like?PostId=' + this.id + "&Action=like"
					this.$axios
						.post(url)
						.then(response => {
							//更改点赞图标样式
							this.self_like = true
							//在点赞列表中新增自己
							this.likerList.push({
								"liker": this.myName,
								"_id": this.id,
							})
							this.updateLiker_string()
						})
						.catch(e => {
							this.$Message.error("Fail to like.")
						})
				}
			},
			updateLiker_string() {
				if (this.likerList.length > 0) { //如果有点赞者
					this.likers_string = ""
					var i
					for (i = 0; i < this.likerList.length; i++) {
						if (i == 0) {
							this.likers_string += this.likerList[i].liker
						} else {
							this.likers_string += '、' + this.likerList[i].liker
						}
					}
				} else //没有点赞者
					this.likers_string = ''
			},
			showHTML(){
				var url = '/post/article/' + this.id + ".html";
				this.$axios
					.get(url)
					.then(response => {
						console.log(response.data)
						this.html=response.data
					})
					.catch(e => {
						this.$Message.error("Fail to showHTML.")
					})
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
