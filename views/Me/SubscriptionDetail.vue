<template>
	<div>
		<Button 
		type="primary" 
		shape="circle" 
		icon="ios-arrow-back" 
		style="margin:10px;" 
		:to="{
			path:'subscription',
			name:'subscription',
			params:{
				currentPage:currentPage
			}
		}">Back</Button>
		<h1 style="margin-top:10px;text-align: center;">Subscription Detail</h1>
		<Divider />
		<div style="width: 500px;margin: 0 auto;">
			<Card title="Global" icon="md-people" :padding="0" shadow >
				<!--大号界面主体-->
				<CellGroup>
					<Cell>
						<div style="display: flex;justify-content: space-around;">
							<div class="horizontal">
								<Avatar shape="circle" :src="iconURL" icon="ios-people" size=100 />
							</div>
							<div class="horizontal">
								<h1 style="margin-top: 10px;">
									{{username}}
								</h1>
								<ButtonGroup size="large" shape="circle" style="margin-top: 15px;">
									<Button>Subscription: {{ subscription }}</Button>
									<Button>Follower: {{ follower }}</Button>
								</ButtonGroup>
							</div>
						</div>
					</Cell>
					<Cell title="Descrption" :label="description" />
					<Cell 
					title="Its Posts" 
					:to="{
						path:'itsPosts',
						name:'itsPosts',
						params:{
							subscriptionName:username,
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
	//import data from '../../mock/subscriptionDetail.js'
	export default {
		data() {
			return {
				username: '',
				description:'',
				subscription:0,
				follower:0,
				iconURL:'',
				ShieldingValue:false,//是否屏蔽该公众号
				currentPage:0,//该订阅在订阅列表中的第几页
			}
		},
		mounted() {
			this.username = this.$route.params.subscriptionName
			this.currentPage = this.$route.params.currentPage
			
			var url = '/user/globalAccount/info?globalUserName=' + this.username
			this.$axios
				.get(url)
				.then(response=>{
					var temp = response.data.globalUserInfo
					this.username = temp.username
					this.iconURL = temp.iconUrl
					this.description = temp.description
					this.follower = temp.followerNumber
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
