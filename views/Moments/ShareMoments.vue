<template>
	<div>
		<br>
		<h1 style="margin-top:10px;text-align: center;">Share Moments</h1>
		<Divider />
		<div style="padding: 20px;">
			<Card :bordered="false" style="width:700px; margin:0 auto;">
				<div slot="title" style="display: flex;justify-content: flex-start;">
					<div>
						<Avatar shape="square" icon="ios-person" size=50 :src="iconURL"/>
					</div>
					<div style="margin-left: 15px;">
						<h2 style="margin-bottom: 8px;">{{ username }}</h2>
						<Time :time="time" type="date" :interval="1" />
					</div>
				</div>
				<UploadPictureByHand></UploadPictureByHand>
			</Card>
		</div>
	</div>
</template>

<script>
	import data from"../../mock/selfInfo.js"
	import UploadPictureByHand from '../../components/UploadPictureByHand.vue';
	export default {
		components:{
			UploadPictureByHand
		},
		data() {
			return {
				username: "",
				iconURL:'',
				time: new Date(),
				imgName: '',
			}
		},
		mounted() {
			//var url="http://localhost:8080/user/selfInfo"
			var url="/user/selfInfo"
			this.$axios
				.get(url)
				.then(response=>{
					//渲染个人信息
					this.username = response.data.info.username
					this.iconURL = response.data.info.iconUrl
				})
				.catch(error=>{
					console.log(error)
				})
		},
		methods: {
			
		}
	}
</script>

<style>
	
</style>
