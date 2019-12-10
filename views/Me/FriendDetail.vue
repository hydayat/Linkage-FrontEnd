<template>
	<div>
		<Button 
		type="primary" 
		shape="circle" 
		icon="ios-arrow-back" 
		style="margin:10px;" 
		:to="{
			path:'friends',
			name:'friends',
			params:{
				currentPage:currentPage
			}
		}">Back</Button>
		<h1 style="margin-top:10px;text-align: center;">Friend Detail</h1>
		<Divider />
		<div style="width: 500px;margin: 0 auto;">
			<Card title="Private" icon="md-person" :padding="0" shadow >
				<CellGroup>
					<Cell>
						<div style="display: flex;justify-content: space-around;">
							<div class="horizontal">
								<Avatar shape="square" icon="ios-person" size=100 :src="iconURL" />
							</div>
							<div class="horizontal">
								<h1 style="margin-top: 10px;">
									{{username}}
									<Icon :type="gender" />
								</h1>
							</div>
						</div>
					</Cell>
					<Cell title="Descrption" :label="description" />
					<Cell title="Address" :label="address" />
					<Cell 
					title="His/Her Moments" 
					:to="{
						path:'hisMoments',
						name:'hisMoments',
						params:{
							friendName:username,
							currentPage:currentPage
						}
					}"/>
					<Cell title="Shielding">
						<i-switch v-model="ShieldingValue" slot="extra" />
					</Cell>
				</CellGroup>
			</Card>
		</div>
		
	</div>
</template>

<script>
	import data from '../../mock/friendDetail.js'
	export default {
		data() {
			return {
				username: '',
				address:'',
				description:'',
				gender:'',
				iconURL:'',
				ShieldingValue:false,//是否屏蔽该好友
				currentPage:0,//该好友在好友列表中的第几页
			}
		},
		mounted() {
			this.username = this.$route.params.friendName
			this.currentPage = this.$route.params.currentPage
			
			var url = '/user/myFriend/info?friendName=' + this.username
			this.$axios
				.get(url)
				.then(response=>{
					console.log(response)
					var temp = response.data.info
					this.username = temp.username
					this.iconURL = temp.iconUrl
					this.description = temp.description
					temp.sex == 1? this.gender = 'md-man' : this.gender = 'md-woman',
					this.address = temp.address
				})
				.catch(error=>{
					console.log(error)
				})
		},
		methods: {
			
		},
	}
</script>

<style>
</style>
