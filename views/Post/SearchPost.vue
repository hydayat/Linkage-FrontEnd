<template>
	<div>
		<br>
		<h1 style="margin-top:10px;text-align: center;">Search Post</h1>
        <!-- <Button type="primary" shape="circle" icon="md-arrow-back" style="margin:10px;" to="friends">Back</Button> -->
		<center style="margin-top:10px;">
			<i-input placeholder="Search Post" style='width: 200px;' v-model='keyword'>
				<Button slot="append" icon="ios-search" v-on:click='searchByKeyword()'></Button>
			</i-input>
		</center>
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
                posts:[],
                keyword:'',
			}
		},
		props:{
			myName:String
		},
		mounted(){
			//查看好友们的朋友圈
        },
        methods:{
            searchByKeyword(){
                var url = '/post/search?Keyword='+this.keyword
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

<style>
</style>
