import Vue from 'vue'
export default new Vue({
	created: function(){
		console.log('=============================create a Vue Object=============================')
	},
	destroyed:function(){
		console.log('=============================destroy a Vue Object=============================')
	}
})