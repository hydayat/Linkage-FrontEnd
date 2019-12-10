<template>
	<div>
		<Button type="primary" shape="circle" icon="md-arrow-back" style="margin:10px;" to="account">Back</Button>
		<h1 style="text-align: center;">Manage Trend</h1>
		<Divider />
		<Transfer 
		:data="data" 
		:target-keys="targetKeys" 
		:list-style="listStyle" 
		:render-format="render" 
		:operations="['To left','To right']"
		:titles="['Candidate', 'Trend']"
		not-found-text="No content"
		filterable 
		filter-placeholder="Enter post name to search"
		@on-change="handleChange">
		</Transfer>
		<Divider />
		<center>
			<div>
				<Button type="info" style="width: 200px;" v-on:click="submit">Submit</Button>
			</div>
		</center>
	</div>
</template>

<script>
	import data from "../../mock/admin.js"
	export default {
		data() {
			return {
				data: [],
				targetKeys: [],
				listStyle: {
					width: '44%',
					height: '480px'
				}
			}
		},
		mounted() {
			var url = '/admin/post/trend?interval=3600'
			this.$axios
				.get(url)
				.then(response => {
					var list = response.data
					for(let i =0; i < list.length; i++){
						this.data.push({
							key: list[i].id,
							label: list[i].title,
							visitTimes: list[i].visitTimes,
							author: list[i].author
						})
						if(list[i].isTrend == true){
							this.targetKeys.push(list[i].id)
						}
					}
				})
				.catch(error => {
					this.$Message.error('Fail to load trend!')
				})
		},
		methods: {
			handleChange(newTargetKeys) {
				this.targetKeys = newTargetKeys;
			},
			render(item) {
				return "\"" + item.label + "\" -- " + item.visitTimes + " -- \"" + item.author + "\"";
			},
			submit(){
				var url = '/admin/post/trend'
				console.log(this.targetKeys)
				this.$axios
					.post(url, this.targetKeys)
					.then(response => {
						this.$Message.success("Successfully setting the trend!")
						this.$router.push('account')
					})
					.catch(error => {
						this.$Message.error("Fail to set the trend!")
					})
			}
		}
	}
</script>

<style>
</style>
