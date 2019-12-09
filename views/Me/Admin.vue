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
			<!-- 底部自定义操作 -->
			<center>
				<div>
					<Button type="info" style="width: 200px;" v-on:click="submit">Submit</Button>
				</div>
			</center>
		</Transfer>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				data: [],
				targetKeys: [],
				listStyle: {
					width: '45%',
					height: '500px'
				}
			}
		},
		mounted() {
			//初始化所有待处理的post
			for (let i = 1; i <= 20; i++) {
				this.data.push({
					key: i.toString(),
					label: 'Content ' + i,
					description: 'The desc of content  ' + i,
					//disabled: Math.random() * 3 < 1
				});
			}
			//初始化当前的热搜
			for(let j = 0; j <= 9; j++){
				this.targetKeys.push(this.data[j].key)
			}
		},
		methods: {
			handleChange(newTargetKeys) {
				this.targetKeys = newTargetKeys;
			},
			render(item) {
				return item.label + ' - ' + item.description;
			},
			submit(){
				
			}
		}
	}
</script>

<style>
</style>
